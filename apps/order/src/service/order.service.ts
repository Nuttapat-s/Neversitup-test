import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'apps/product/src/entity/product.entity';
import { User } from 'apps/user/src/entity/user.entity';
import { In, Raw, Repository } from 'typeorm';
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
      orderData.order_track = trackUuid


      await this.orderRepository.save(orderData);


      let userData = await this.userRepository.findOneBy({ id: userId })

      userData.order_history_track += trackUuid + '|'

      await this.userRepository.update({ id: userId }, userData)


      let productData = await this.productRepository.findOneBy({ id: productId })

      if (productData.user_id_list.length !== 0) {
        let arrList = productData.user_id_list.split('|');
        let ind = arrList.indexOf(userId.toString());
        if (ind < 0) {
          productData.user_id_list = userId + '|'
          await this.productRepository.update({ id: productId }, productData)
        }
      } else {
        productData.user_id_list = userId + '|'
        await this.productRepository.update({ id: productId }, productData)
      }

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

      if (!orderData) {
        throw new Error('orderId not found')
      }

      if (orderData.order_track.length !== 0) {
        let arr = orderData.order_track.split('|')
        const index = arr.indexOf(track);
        arr.splice(index, index >= 0 ? 1 : 0)
        orderData.order_track = '';
        for(let data of arr){
          orderData.order_track += data+'|'
        }
      }else{
        throw new Error('no data to cancle')
      }



      await this.orderRepository.update({ id: orderId }, orderData)

      await this.OrderDetailRepository.delete({ track_uuid: track })




    } catch (error) {
      throw error;
    }

  }

  async viewOrderDetail(track: string) {
    try {
      return await this.OrderDetailRepository.findOneBy({ track_uuid: track })

    } catch (error) {
      throw error;
    }

  }

  async findOrderHistory(userId: number) {
    try {
      let data = await this.userRepository.findOneBy({ id: userId })
      let trackList = data.order_history_track
      if (trackList.length === 0) {
        throw new Error('NO history');
      }

      let arr = trackList.split('|')
      console.log(arr)
      // return await this.orderRepository.findBy({
      //   order_track: Raw((alias) => `${alias} IN (:...order_track)`, {
      //     order_track: arr,
      //   }),
      // })
      return await this.orderRepository.createQueryBuilder('order')
      .where("order.order_track IN (:...arr)", { arr:arr})
      .getMany();


    } catch (error) {
      throw error;
    }

  }



}
