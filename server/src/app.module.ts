import { Module } from '@nestjs/common';
import { TransactionModule, CategoryModule, ReportsModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
    TransactionModule,
    CategoryModule,
    ReportsModule,
  ],
})
export class AppModule {}
