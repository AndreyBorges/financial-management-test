import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CategoryModule } from '../category/category.module';
@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), CategoryModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
