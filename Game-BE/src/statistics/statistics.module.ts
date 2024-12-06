import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistics } from './entities/statistics-entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Statistics])],
  exports: [TypeOrmModule.forFeature([Statistics])],
})
export class StatisticsModule {}
