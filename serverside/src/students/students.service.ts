import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dtos/create-student.dto';
import { User, UserDocument } from 'schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      const student = new this.studentModel(createStudentDto);
      const savedStudent = await student.save();
      const { email, fullName } = createStudentDto;
      const password = 'Password@123';
      const hashedPwd = await bcrypt.hash(password, 10);
      const user = new this.userModel({
        email: email,
        name: fullName,
        password: hashedPwd,
        role: 'Student',
      });
      console.log('====================================');
      console.log('going to save the user !');
      console.log('====================================');
      const savedUser = await user.save();

      return {
        message: 'Student created successfully',
        success: true,
        student: savedStudent,
      };
    } catch (error) {
      console.error('❌ Error creating student:', error); // <-- Add this line

      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        throw new HttpException(
          `${duplicateField} already exists.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'An error occurred while creating the student.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return await this.studentModel.find().exec();
  }

  async findOne(id: string) {
    const student = await this.studentModel.findById(id).exec();
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async update(id: string, updatedData: Partial<CreateStudentDto>) {
    const updated = await this.studentModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Student not found!');
    return updated;
  }

  async remove(id: string) {
    const result = this.studentModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Student not found !');
  }
}
