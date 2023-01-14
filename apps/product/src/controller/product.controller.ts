import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('getAllName')
  async getAllName() {
    return await this.productService.getAllProductName();
  }

  @Get('getAll')
  async getAll() {
    return await this.productService.getProductInfo();
  }
}
