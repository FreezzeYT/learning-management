import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserData } from 'dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserData) {
    return this.userService.create(createUserDto);
}
  @Get()
  async findall(){
    return this.userService.findAll();
  }
}
