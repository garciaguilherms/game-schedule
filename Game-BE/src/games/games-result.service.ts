import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameResult } from './entities/game-result.entity';
import { GameResultDto } from './dto/game-result.dto';

@Injectable()
export class GameResultService {
  constructor(
    @InjectRepository(GameResult)
    private gameResultRepository: Repository<GameResult>,
  ) {}

  async create(gameResultDto: GameResultDto): Promise<GameResult> {
    const gameResult = this.gameResultRepository.create(gameResultDto);
    return this.gameResultRepository.save(gameResult);
  }
}
