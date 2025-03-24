import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as MongooseSchema } from "mongoose";
import { Course } from "./course.schema";

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  
  @Prop({required:true})
  name: string;

  @Prop({required:true, unique:true})
  username: string;

  @Prop({required:true})
  password: string;

  @Prop({required:true, enum:["Admin","Instructor", "Student"], default:"Student"})
  role: string;
  

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Course' }], default: [] })
  EnrolledCourses: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);











// import mongoose from "mongoose";

// export const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   role: { type: String, enum: ["Student", "Teacher"]}
// })