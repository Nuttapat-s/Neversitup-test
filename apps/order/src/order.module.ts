import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'apps/product/src/entity/product.entity';
import { User } from 'apps/user/src/entity/user.entity';
import { OrderController } from './controller/order.controller';
import { OrderDetail } from './entity/order.detail.entity';
import { Order } from './entity/order.entity';
import { OrderService } from './service/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product,User,Order,OrderDetail])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
