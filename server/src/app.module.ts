import { Module } from '@nestjs/common';
import { TransactionModule, CategoryModule, ReportsModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';

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
    SeedModule,
  ],
})
export class AppModule {
  constructor(private readonly seedService: SeedService) {
    // this.seedService.save();
  }
}
