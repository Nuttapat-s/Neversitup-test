import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Token } from '../entity/token.entity';
import { UserAuth } from '../entity/user.auth.entity';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body:User) {
    return await this.userService.register(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body:UserAuth) {
    return await this.userService.login(body.username,body.password);
  }

  @Post('getInfo')
  async getInfo(@Body() body:Token) {
    return await this.userService.getUserInfo(body.token);
  }
}
