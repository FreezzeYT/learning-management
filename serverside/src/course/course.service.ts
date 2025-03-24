import { Injectable, NotFoundException } from '@nestjs/common';
import { Course, CourseDocument } from 'schemas/course.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCourseData } from 'dtos/create-course.dto';
import { UpdateCourseDetails } from 'dtos/update-course.dto';

@Injectable()
export class CourseService {
constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>){}

async create(courseData: CreateCourseData): Promise<Course> {
  const newCourse = new this.courseModel(courseData);

  // console.log(newCourse);
  
  return newCourse.save();

}

async findall(): Promise<Course[]> {
  return this.courseModel.find().exec();
}

async delete(id: string): Promise<{message: string}>{
  const deletedCourse = await this.courseModel.findByIdAndDelete(id);

  if(!deletedCourse){
    throw new NotFoundException(`Course with ID ${id} not found`);
  }
  return {message: `Course with ID ${id} deleted`};
}

async update(id: string, updatecourse: UpdateCourseDetails): Promise<Course>{
  const updatedCourse = await this.courseModel.findByIdAndUpdate(id, updatecourse, 
    {new: true,
    runValidators: true}

  );
  if(!updatedCourse) {
    throw new NotFoundException(`Course with ID ${id} not found`);
  }

  return updatedCourse;
}

}
