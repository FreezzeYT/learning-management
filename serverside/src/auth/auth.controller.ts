import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserData } from 'dtos/create-user.dto';
import { LoginUsrDto } from 'dtos/user-login.dto';
import { JwtAuthGuard } from './jwt-auth-guard';
import { UserService } from 'src/user/user.service';
import { RolesGuard } from './roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from 'dtos/forgot-password.dto';
import { VerifyOtpDto } from 'dtos/verify-otp.dto';
import { ResetPasswordDto } from 'dtos/reset-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userservice: UserService,
  ) {}

  @Post('register')
  @ApiResponse({ status: 200, description: 'User successfully registered!' })
  async register(@Body() userDto: CreateUserData) {
    const existingUser = await this.userservice.findbyemail(userDto.email);
    if (existingUser) {
      console.log('Email already exists: ', userDto.email);
      throw new BadRequestException('Email is already registered');
    }

    if (!userDto.name || !userDto.email || !userDto.password) {
      console.log('Missing required fields');
      throw new BadRequestException('All fields are required');
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(userDto.password)) {
      console.log('Invalid password format');
      throw new BadRequestException(
        'Password must be at least 6 characters long, include at least one number and one special character',
      );
    }

    // Step 3: After email check and manual password validation, proceed to register
    console.log(
      'Email and password validation passed, proceeding to register user',
    );
    return this.authService.register(userDto);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged in succesfully !' })
  async login(@Body() loginDTO: LoginUsrDto) {
    const user = await this.userservice.findbyemail(loginDTO.email);

    return this.authService.login(loginDTO);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Instructor', 'Student')
  @Get('profile')
  @ApiResponse({ status: 200, description: 'request granted !' })
  getProfile(@Request() req) {
    return {
      email: req.user.email,
      name: req.user.name || 'Name missing',
      _id: req.user._id,
      role: req.user.role || 'Role missing',
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Instructor', 'Student')
  @Get('student-profile')
  @ApiResponse({ status: 200, description: 'request granted !' })
  getStudentProfile(@Request() req) {
    return {
      email: req.user.email,
      name: req.user.name || 'Name missing',
      _id: req.user._id,
      role: req.user.role || 'Role missing',
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.sendForgotPasswordOtp(body.email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body.email, body.otp);
  }

  @Post('reset-password')
  @UseGuards(JwtAuthGuard)
  async resetPassword(@Req() req, @Body() body: ResetPasswordDto) {
    const email = req.user.email;
    return this.authService.resetPassword(email, body.newPassword);
  }
}
