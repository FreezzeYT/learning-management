import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema({ timestamps: true })
export class Department {
  @Prop({ required: true })
  deptName: string;

  @Prop({ required: true })
  deptDescription: string;

  @Prop({ required: true, unique: true })
  deptCode: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
