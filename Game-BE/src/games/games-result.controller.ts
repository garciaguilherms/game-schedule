import { Controller, Post, Body } from '@nestjs/common';
import { GameResultService } from './games-result.service';
import { GameResultDto } from './dto/game-result.dto';

@Controller('game-result')
export class GameResultController {
  constructor(private readonly gameResultService: GameResultService) {}

  @Post()
  async createGameResult(@Body() gameResultDto: GameResultDto) {
    return this.gameResultService.create(gameResultDto);
  }
}
