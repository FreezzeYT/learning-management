import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserData } from 'dtos/create-user.dto';
import { LoginUsrDto } from 'dtos/user-login.dto';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userDTO: CreateUserData) {
    return this.userService.create(userDTO);
  }

  async login(loginDTO: LoginUsrDto) {
    const user = await this.userService.findbyemail(loginDTO.email);
    // console.log("User gave pwd: ", loginDTO.password);
    // console.log("DB gave pwd: ", user?.password);
    if (!user || !(await bcrypt.compare(loginDTO.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      name: user.name,
      _id: user._id,
      role: user.role,
    };
    console.log(payload);
    return { access_token: this.jwtService.sign(payload) };
  }

  async sendForgotPasswordOtp(email: string) {
    const user = await this.userService.findbyemail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetOtp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // nodemailer setup
    console.log('check');
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for password reset',
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    });

    return { message: 'OTP sent to your email.' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.userService.findbyemail(email);

    if (
      !user ||
      user.resetOtp !== otp ||
      !user.otpExpiry ||
      new Date() > new Date(user.otpExpiry)
    ) {
      throw new HttpException('Invalid or expired OTP', HttpStatus.BAD_REQUEST);
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const payload = { email: user.email };
    const tempToken = this.jwtService.sign(payload, { expiresIn: '10m' }); // expires in 10 mins

    return {
      message: 'OTP verified. You may now reset your password.',
      tempToken,
    };
  }
  async resetPassword(email: string, newPassword: string) {
    const user = await this.userService.findbyemail(email); // find by ID from JWT/session

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!user.isOtpVerified) {
      throw new HttpException('OTP not verified', HttpStatus.FORBIDDEN);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.isOtpVerified = false;
    user.resetOtp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return { message: 'Password has been reset successfully' };
  }
}

//const payload = {username: user.username, sub: user._id};
