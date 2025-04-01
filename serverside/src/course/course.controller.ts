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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Courses APIs')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Course Posted Succesfully !' })
  async createCourse(@Body() courseDetails: CreateCourseData) {
    return this.courseService.create(courseDetails);
  }
  @Get()
  @ApiResponse({ status: 200, description: 'gets all the courses' })
  async findall() {
    return this.courseService.findall();
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'user has been edited !' })
  async update(
    @Param('id') id: string,
    @Body() updateCourse: UpdateCourseDetails,
  ) {
    return this.courseService.update(id, updateCourse);
  }
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User has been removed' })
  async delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
