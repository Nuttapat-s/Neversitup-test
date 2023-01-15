import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 30 })
  surname: string;

  @Column("text")
  order_history_track: string;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 8 })
  password: string;
}