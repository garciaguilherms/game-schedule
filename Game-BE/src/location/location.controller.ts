import { Controller, Get } from '@nestjs/common';
import { GameLocation } from './entities/location-entity';
import { GameLocationService } from './location.service';

@Controller('game-location')
export class GameLocationController {
  constructor(private readonly gameLocationService: GameLocationService) {}
  @Get()
  getAll(): Promise<GameLocation[]> {
    return this.gameLocationService.findAll();
  }
}
