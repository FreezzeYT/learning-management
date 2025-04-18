import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserData } from 'dtos/create-user.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from 'schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: CreateUserData): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: userData.email })
      .exec();
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    try {
      const hashedPwd = await bcrypt.hash(userData.password, 10);
      const newUser = new this.userModel({
        name: userData.name,
        email: userData.email.toLowerCase().trim(),
        role: userData.role,
        password: hashedPwd,
      });
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email is already registered');
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findbyemail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
