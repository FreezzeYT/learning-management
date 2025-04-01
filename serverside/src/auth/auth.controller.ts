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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserData } from 'dtos/create-user.dto';
import { LoginUsrDto } from 'dtos/user-login.dto';
import { JwtAuthGuard } from './jwt-auth-guard';
import { UserService } from 'src/user/user.service';
import { RolesGuard } from './roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userservice: UserService,
  ) {}

  @Post('register')
  @ApiResponse({ status: 200, description: 'User successfully registered !' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() UserDto: CreateUserData) {
    if (!UserDto.name || !UserDto.username || !UserDto.password) {
      throw new BadRequestException('All fields are required');
    }
    return this.authService.register(UserDto);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged in succesfully !' })
  async login(@Body() loginDTO: LoginUsrDto) {
    const user = await this.userservice.findbyusername(loginDTO.username);

    return this.authService.login(loginDTO);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Instructor', 'Student')
  @Get('profile')
  @ApiResponse({ status: 20, description: 'request granted !' })
  getProfile(@Request() req) {
    return {
      username: req.user.username,
      name: req.user.name || 'Name missing',
      _id: req.user._id,
      role: req.user.role || 'Role missing',
    };
  }
}
