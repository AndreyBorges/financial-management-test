import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Transaction } from '../../transaction/entities';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  @JoinColumn()
  transactions: Transaction[];

  @Column({ default: 0 })
  quantity: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
