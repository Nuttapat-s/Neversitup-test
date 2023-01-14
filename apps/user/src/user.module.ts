import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { UserService } from './service/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './service/local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    PassportModule,
  JwtModule.register({
    secret: 'SecretKey',
    signOptions: { expiresIn: '1d' }
  })],
  controllers: [UserController],
  providers: [UserService,LocalStrategy],
  exports: [UserService]
})
export class UserModule { }
