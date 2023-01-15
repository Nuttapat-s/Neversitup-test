import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CancleOrderEntity, DoOrderEntity, orderHistoryEntity, TrackEntity } from '../entity/do.order.entity';
import { OrderService } from '../service/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('doOrder')
  async doOrder(@Body() body:DoOrderEntity){
    return await this.orderService.doOrder(body.userId,body.productId,body.productNum);
  }

  @Put('cancleOrder')
  async cancleOrder(@Body() body:CancleOrderEntity){
    return await this.orderService.cancleOrder(body.userId,body.track);
  }

  @Post('getOrderDetail')
  async getOrderDetail(@Body() body:TrackEntity){
    return await this.orderService.viewOrderDetail(body.track);
  }

  @Post('getOrderHistory')
  async getOrderHistory(@Body() body:orderHistoryEntity){
    return await this.orderService.findOrderHistory(body.userId);
  }
}
