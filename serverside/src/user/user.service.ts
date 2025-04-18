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
    try {
      const hashedPwd = await bcrypt.hash(userData.password, 10);
      const newUser = new this.userModel({
        name: userData.name,
        username: userData.username,
        role: userData.role,
        password: hashedPwd,
      });
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username is already taken');
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findbyusername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
