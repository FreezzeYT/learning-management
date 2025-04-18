import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Student } from './schemas/student.schema';
import { CreateStudentDto } from './dtos/create-student.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('students')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('create')
  @Roles('Admin')
  @ApiOperation({ summary: 'Create a new student !' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({
    status: 201,
    description: 'The student has been successfully created.',
    type: Student,
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @Roles('Admin')
  @ApiOperation({ summary: 'Get all students !' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all students.',
    type: [Student],
  })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the student.',
    type: Student,
  })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a student by ID' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the student.',
    type: Student,
  })
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateStudentDto>,
  ) {
    return this.studentsService.update(id, updateData);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete a student by ID' })
  @ApiResponse({
    status: 200,
    description: 'The student has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
