import {IsEnum, IsNotEmpty, IsString} from 'class-validator'

export class CreateUserData {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' }) 
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' }) 
  username: string;
  
  @IsString()
  @IsNotEmpty({ message: 'Password is required' }) 
  password: string;

  @IsEnum(["Admin","Instructor","Student"])
  role: "Admin" | "Instructor" | "Student";

}