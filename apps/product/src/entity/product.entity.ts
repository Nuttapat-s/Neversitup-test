import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  product_name: string;

  @Column()
  price: number;

  @Column("int", { array: true })
  user_order_id: string[];

  @Column({ length: 255 })
  detail: string;

}