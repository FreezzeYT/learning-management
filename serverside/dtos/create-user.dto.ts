import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
} from 'class-validator';

export class CreateUserData {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty()
  email: string;

  @ApiProperty({
    example: 'password@123',
    description:
      'Password must be at least 6 characters long, with a number and a special character',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  // @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, {
  //   message:
  //     'Password must be at least 6 characters long, include at least one number and one special character',
  // })
  password: string;

  @IsEnum(['Admin', 'Instructor', 'Student'])
  @ApiProperty()
  role: 'Admin' | 'Instructor' | 'Student';
}
