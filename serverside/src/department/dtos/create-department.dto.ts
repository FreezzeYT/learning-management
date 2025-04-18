import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DepartmentData {
  @ApiProperty({
    example: 'Computer Science',
    description: 'Name of the department',
  })
  @IsString()
  @IsNotEmpty()
  deptName: string;

  @ApiProperty({
    example: 'Department focused on computer applications',
    description: 'Description of the department',
  })
  @IsString()
  @IsNotEmpty()
  deptDescription: string;

  @ApiProperty({ example: 'CS101', description: 'Unique department code' })
  @IsString()
  @IsNotEmpty()
  deptCode: string;
}
