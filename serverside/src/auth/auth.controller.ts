import { Body, Controller, Post, UseGuards, Get, Request, UsePipes, ValidationPipe, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserData } from "dtos/create-user.dto";
import { LoginUsrDto } from "dtos/user-login.dto";
import { JwtAuthGuard } from "./jwt-auth-guard";
import { UserService } from "src/user/user.service";


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userservice: UserService) { }


  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() UserDto: CreateUserData) {
    if (!UserDto.name || !UserDto.username || !UserDto.password) {
      throw new BadRequestException('All fields are required');
    }
    return this.authService.register(UserDto);
  }  



  @Post('login')
  async login(@Body() loginDTO: LoginUsrDto){
    const user = await this.userservice.findbyusername(loginDTO.username)
    
    return this.authService.login(loginDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    
    
     return { 
      username: req.user.username, 
      name: req.user.name || "Name missing", 
      _id: req.user._id ,
      role:req.user.role || "Role missing"
  };
  }
}