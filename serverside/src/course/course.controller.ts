import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseData } from 'dtos/create-course.dto';
import { UpdateCourseDetails } from 'dtos/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async createCourse(@Body() courseDetails: CreateCourseData) {
    return this.courseService.create(courseDetails);
  }
  @Get()
  async findall() {
    return this.courseService.findall();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourse: UpdateCourseDetails,
  ) {
    return this.courseService.update(id, updateCourse);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
