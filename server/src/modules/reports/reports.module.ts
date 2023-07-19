import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { CategoryModule } from '../category/category.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [CategoryModule, TransactionModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
