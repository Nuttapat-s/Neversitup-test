import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  product_num: number;

  @Column()
  order_time : string;

  @Column({ unique: true })
  track_uuid: string


}
