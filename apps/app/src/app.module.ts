import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/user/src/entity/user.entity';
import { UserModule } from 'apps/user/src/user.module';
import { Product } from 'apps/product/src/entity/product.entity';
import { ProductModule } from 'apps/product/src/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: './app.sqlite',
    entities: [User,Product],
    synchronize: process.env.NODE_ENV != 'production',
  }),
  UserModule,
  ProductModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
