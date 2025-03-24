import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EnrollUserDto } from 'dtos/enroll-user.dto';
import { Model, Types } from 'mongoose';
import { Course } from 'schemas/course.schema';
import { User } from 'schemas/user.schema';

@Injectable()
export class EnrollmentService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
  @InjectModel(Course.name) private courseModel: Model<Course>) { }
  

  async enrolluser(userid: string, enrollDTO: EnrollUserDto): Promise<User>{
    const {courseId} = enrollDTO;
    const user = await this.userModel.findById(userid);//finds from the users collection
    if(!user) throw new NotFoundException("User not found in the DB");

    const course =  await this.courseModel.findById(courseId);
    if(!course) throw new NotFoundException("Course not found in the DB");
 
    const courseObjectId = new Types.ObjectId(courseId);

if (!user.EnrolledCourses.includes(courseId as any)) {
        user.EnrolledCourses.push(courseObjectId as any);
        await user.save();
    }
    return user;
  }

  async getUserEnrollment(userId: string): Promise<Types.ObjectId[] | null> {
    const user = await this.userModel.findById(userId);
    if(!user) throw new NotFoundException("User not found on DB!");
    return user.EnrolledCourses

}
}
