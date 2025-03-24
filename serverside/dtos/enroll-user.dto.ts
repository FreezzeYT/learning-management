import { IsMongoId, IsNotEmpty } from "class-validator";

export class EnrollUserDto{
  @IsNotEmpty()
  @IsMongoId()
  courseId: string
}