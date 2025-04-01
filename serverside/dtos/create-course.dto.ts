import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseData {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  courseName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  courseDescription: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tutorName: string;
}
