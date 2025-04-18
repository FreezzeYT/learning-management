import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsDateString,
  IsInt,
  Min,
  Max,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export class CreateStudentDto {
  // Personal Information

  @ApiProperty({ example: 'John Wick' })
  @IsString()
  @IsNotEmpty({ message: 'Full Name is required' })
  fullName: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender, { message: "Gender can't be empty" })
  gender: Gender;

  @ApiProperty({ example: '2003-08-15' })
  @IsDateString({}, { message: 'DOB must be a valid date' })
  dob: string;

  @ApiProperty({ example: '123412341234' })
  @IsString()
  @IsNotEmpty({ message: 'Aadhaar number is required' })
  aadharNumber: string;

  @ApiProperty({ example: 'Indian' })
  @IsString()
  @IsNotEmpty({ message: 'Nationality is required' })
  nationality: string;

  @ApiProperty({ example: 'O+' })
  @IsString()
  @IsNotEmpty({ message: 'Blood Group is required' })
  bloodGroup: string;

  @ApiProperty({ example: 'Hindu' })
  @IsString()
  @IsNotEmpty({ message: 'Religion is required' })
  religion: string;

  // Contact Info

  @ApiProperty({ example: 'johnwick2@example.com' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({ example: '9876543210' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[6-9]\d{9}$/, {
    message: 'Mobile number must be a valid 10-digit number starting with 6-9',
  })
  mobileNumber: string;

  @ApiProperty({ example: '123 Main Street, Chennai, Tamil Nadu' })
  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @ApiProperty({ example: 'Mr. Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Father name is required' })
  fatherName: string;

  @ApiProperty({ example: 'Mrs. Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Mother name is required' })
  motherName: string;

  // Academic Details

  @ApiProperty({ example: 'B.Tech' })
  @IsString()
  @IsNotEmpty({ message: 'Degree is required' })
  degree: string;

  @ApiProperty({ example: 'Computer Science' })
  @IsString()
  @IsNotEmpty({ message: 'Department is required' })
  department: string;

  @ApiProperty({ example: 2023 })
  @IsInt()
  @Min(2000)
  enrollmentYear: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  @Max(4)
  year: number;

  @ApiProperty({ example: '22CS123' })
  @IsString()
  @IsNotEmpty({ message: 'Roll number is required' })
  rollNo: string;

  @ApiProperty({ example: 'A' })
  @IsString()
  @IsNotEmpty({ message: 'Class is required' })
  class: string;
}
