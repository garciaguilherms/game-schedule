import {
    Controller,
    Get,
  } from '@nestjs/common';
import { Statistics } from './entities/statistics-entitiy';
import { StatisticsService } from './statistics.service';
  
  @Controller('statistics')
  export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}
    @Get()
    getAll(): Promise<Statistics[]> {
      return this.statisticsService.findAll();
    }
  }
  