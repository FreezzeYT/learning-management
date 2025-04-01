import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseDetails {
  @IsString()
  @IsOptional()
  @ApiProperty()
  courseName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  courseDescription?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  tutorName?: string;
}
