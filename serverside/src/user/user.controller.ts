import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserData } from 'dtos/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Succesfully posted to the server !',
  })
  async createUser(@Body() createUserDto: CreateUserData) {
    return this.userService.create(createUserDto);
  }
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all user information from the server !',
  })
  async findall() {
    return this.userService.findAll();
  }
}
