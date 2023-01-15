import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'apps/product/src/entity/product.entity';
import { User } from 'apps/user/src/entity/user.entity';
import { Repository } from 'typeorm';
import { OrderDetail } from '../entity/order.detail.entity';
import { Order } from '../entity/order.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly OrderDetailRepository: Repository<OrderDetail>,
  ) { }

  async doOrder(userId: number, productId: number, productNum: number) {
    try {
      const orderData: Order = new Order;
      const orderDetailData: OrderDetail = new OrderDetail

      const now = Date.now();
      const today = new Date(now);

      const trackUuid = uuidv4();

      orderDetailData.product_id = productId;
      orderDetailData.product_num = productNum;
      orderDetailData.order_time = today.toISOString();
      orderDetailData.track_uuid = trackUuid;

      await this.OrderDetailRepository.save(orderDetailData)


      orderData.user_id = userId;
      orderData.order_track = []
      orderData.order_track.push(trackUuid);

      await this.orderRepository.save(orderData);

      return {
        track: trackUuid
      }

    } catch (error) {
      throw error;
    }

  }

  async cancleOrder(orderId: number, track: string) {
    try {
      const orderData = await this.orderRepository.findOneBy({ id: orderId });

      if(!orderData){
        throw new Error('orderId not found')
      }

      const index = orderData.order_track.indexOf(track);
      orderData.order_track = orderData.order_track.splice(index, index >= 0 ? 1 : 0)

      await this.orderRepository.update({id:orderId},orderData)

      await this.OrderDetailRepository.delete({track_uuid:track})




    } catch (error) {
      throw error;
    }

  }

  async viewOrderDetail(track: string) {
    try {
      return await this.OrderDetailRepository.findOneBy({track_uuid:track})

    } catch (error) {
      throw error;
    }

  }



}
