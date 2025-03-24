import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseData{
  @IsString()
  @IsNotEmpty()
  courseName: string;
  
  @IsString()
  @IsNotEmpty()
  courseDescription: string;
  @IsString()
  @IsNotEmpty()
  tutorName: string;


}