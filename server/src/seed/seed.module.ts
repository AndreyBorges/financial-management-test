import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../modules/category/entities';
import { Transaction } from '../modules/transaction/entities';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Category])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
