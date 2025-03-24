import { IsNotEmpty, IsString } from "class-validator";

export class LoginUsrDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}