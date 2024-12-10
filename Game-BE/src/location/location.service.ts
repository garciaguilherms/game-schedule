import {
    Injectable,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
import { GameLocation } from './entities/location-entity';
  
  @Injectable()
  export class GameLocationService {
    constructor(
      @InjectRepository(GameLocation)
      private gameLocationRepository: Repository<GameLocation>,
    ) {}
    async findAll(): Promise<GameLocation[]> {
      return await this.gameLocationRepository.find({
        relations: ['games'],
      });
    }
  }
  