import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/user/src/entity/user.entity';
import { UserModule } from 'apps/user/src/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: './app.sqlite',
    entities: [User],
    synchronize: process.env.NODE_ENV != 'production',
  }),
  UserModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
