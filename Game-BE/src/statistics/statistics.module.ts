import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistics } from './entities/statistics-entitiy';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Statistics])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [TypeOrmModule.forFeature([Statistics])],
})
export class StatisticsModule {}
