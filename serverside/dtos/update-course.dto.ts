import { IsOptional, IsString } from "class-validator";

export class UpdateCourseDetails {
  @IsString()
  @IsOptional()
  courseName?: string;

  @IsString()
  @IsOptional()
  courseDescription?: string;

  @IsString()
  @IsOptional()
  tutorName?: string;

}

