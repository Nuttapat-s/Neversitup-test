import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { array: true })
  order_track: string[];

  @Column("int")
  user_id: number;


}
