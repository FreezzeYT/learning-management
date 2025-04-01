import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class EnrollUserDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  courseId: string;
}
