import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
import { Statistics } from './entities/statistics-entitiy';
  
  @Injectable()
  export class StatisticsService {
    constructor(
      @InjectRepository(Statistics)
      private statisticsRepository: Repository<Statistics>,
    ) {}
    async findAll(): Promise<Statistics[]> {
      return await this.statisticsRepository.find({
        relations: ['team'],
      });
    }
  }
  