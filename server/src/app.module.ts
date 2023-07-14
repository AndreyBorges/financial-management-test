import { Module } from '@nestjs/common';
import { TransactionModule } from './modules';
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
  ],
})
export class AppModule {}
