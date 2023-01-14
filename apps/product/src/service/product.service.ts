import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }
  
  async getAllProductName(){
    const product =  await this.productRepository.find();
    let arr = []
    for(let data of product){
      arr.push(data.product_name)
    }
    return arr;
  }

  async getProductInfo(){
    return await this.productRepository.find();
  }
}
