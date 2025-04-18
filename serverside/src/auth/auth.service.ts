import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserData } from 'dtos/create-user.dto';
import { LoginUsrDto } from 'dtos/user-login.dto';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';

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
}

//const payload = {username: user.username, sub: user._id};
