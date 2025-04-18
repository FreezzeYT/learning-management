import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, enum: ['Male', 'Female', 'Other'] })
  gender: string;

  @Prop({ required: true })
  dob: string;

  @Prop({ required: true, unique: true })
  aadharNumber: string;

  @Prop({ required: true })
  nationality: string;

  @Prop({ required: true })
  bloodGroup: string;

  @Prop({ required: true })
  religion: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  mobileNumber: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  fatherName: string;

  @Prop({ required: true })
  motherName: string;

  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  enrollmentYear: number;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true, unique: true })
  rollNo: string;

  @Prop({ required: true })
  class: string;
}
export const StudentSchema = SchemaFactory.createForClass(Student);
