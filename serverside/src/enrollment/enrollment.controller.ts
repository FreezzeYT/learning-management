import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollUserDto } from 'dtos/enroll-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}
//user id is taken from the token 
  @Post()
  async enrollUser(@Request() req, @Body() enrollDto: EnrollUserDto) {
    return this.enrollmentService.enrolluser(req.user._id, enrollDto); 
  }


  @Get()
  async getUserEnrollments(@Request() req) {
    return this.enrollmentService.getUserEnrollment(req.user._id); 
  }


}


// export class EnrollmentController {
//   constructor(private readonly enrollmentService: EnrollmentService) {}

//   // Enroll user in a course
//   @Post(":userId")
//   async enrollUser(@Param("userId") userId: string, @Body() enrollDto: EnrollUserDto) {
//     return this.enrollmentService.enrollUser(userId, enrollDto);
//   }

//   // Get user's enrolled courses
//   @Get(":userId")
//   async getUserEnrollments(@Param("userId") userId: string) {
//     return this.enrollmentService.getUserEnrollments(userId);
//   }
// }