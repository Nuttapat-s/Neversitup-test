import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtTokenService: JwtService
  ) { }

  async register(body: User) {
    try {
      if (body.username && body.password && body.name && body.surname) {
        const userInDB = await this.userRepository.findOneBy({ username: body.username });
        if (userInDB) {
          throw new Error('username is already be used')
        }

        if (body.password.length > 8) {
          throw new Error('password maximum length is 8')
        }

        body.order_history_id = [];
        await this.userRepository.save(body);

        return 'register complete';

      } else {
        throw new Error('please insert all fill')
      }
    } catch (error) {
      throw error;
    }

  }

  async login(username: string, password: string) {
    try {
      const user = await this.userRepository.findOneBy({ username });

      if (!user) {
        throw new Error('Username not found')
      }

      if (password !== user.password) {
        throw new Error('Password is wrong')
      }

      let payload = {'username':user.username,'password':user.password}
      

      return {
        access_token: this.jwtTokenService.sign(payload),
      };
      
    } catch (error) {
      throw error;
    }

  }

  async getUserInfo(token:string){
    const existUser = await this.jwtTokenService.verify(token);
    const user = await this.userRepository.findOneBy({ username:existUser.username });

    delete user.password
    return user

  }
}
