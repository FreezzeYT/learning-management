import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CourseDocument = Course & Document;

@Schema()
export class Course{
  @Prop({required:true})
  courseName : string;

  @Prop({required:true})
  courseDescription : string;

  @Prop({required:true})
  tutorName: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);