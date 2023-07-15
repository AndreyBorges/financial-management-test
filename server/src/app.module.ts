import { Module } from '@nestjs/common';
import { TransactionModule, CategoryModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TransactionModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
    CategoryModule,
  ],
})
export class AppModule {}
