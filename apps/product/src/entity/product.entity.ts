import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  product_name: string;

  @Column()
  price: number;

  @Column("text")
  user_id_list: string;

  @Column({ length: 255 })
  detail: string;

}