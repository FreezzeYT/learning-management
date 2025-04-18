import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Department,
  DepartmentDocument,
} from '../department/schema/deparment.schema';
import { DepartmentData } from '../department/dtos/create-department.dto';
@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private deptModel: Model<DepartmentDocument>,
  ) {}

  async create(deptDto: DepartmentData): Promise<Department> {
    try {
      const newDept = new this.deptModel(deptDto);
      return await newDept.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Department code already exists');
      }
      throw err;
    }
  }

  async findAll(): Promise<Department[]> {
    return this.deptModel.find().exec();
  }

  async findById(id: string): Promise<Department> {
    const dept = await this.deptModel.findById(id).exec();
    if (!dept) throw new NotFoundException('Department not found');
    return dept;
  }

  async update(
    id: string,
    updateData: Partial<DepartmentData>,
  ): Promise<Department> {
    const updated = await this.deptModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Department not found');
    return updated;
  }

  async delete(id: string): Promise<Department> {
    const deleted = await this.deptModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Department not found');
    return deleted;
  }
}
