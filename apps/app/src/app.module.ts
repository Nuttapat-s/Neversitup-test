import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/user/src/entity/user.entity';
import { UserModule } from 'apps/user/src/user.module';
import { Product } from 'apps/product/src/entity/product.entity';
import { ProductModule } from 'apps/product/src/product.module';
import { OrderModule } from 'apps/order/src/order.module';
import { Order } from 'apps/order/src/entity/order.entity';
import { OrderDetail } from 'apps/order/src/entity/order.detail.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: './app.sqlite',
    entities: [User,Product,Order,OrderDetail],
    synchronize: process.env.NODE_ENV != 'production',
  }),
  UserModule,
  ProductModule,
  OrderModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
