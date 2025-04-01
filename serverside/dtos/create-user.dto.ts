import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserData {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty()
  password: string;

  @IsEnum(['Admin', 'Instructor', 'Student'])
  @ApiProperty()
  role: 'Admin' | 'Instructor' | 'Student';
}
