import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameResult } from './entities/game-result.entity';
import { GameResultDto } from './dto/game-result.dto';
import { Game } from '../games/entities/game.entity';

@Injectable()
export class GameResultService {
  constructor(
    @InjectRepository(GameResult)
    private gameResultRepository: Repository<GameResult>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(gameResultDto: GameResultDto): Promise<GameResult> {
    const { gameId, result, winningTeamId } = gameResultDto;

    const existingGameResult = await this.gameResultRepository.findOne({
      where: { game: { id: gameId } },
    });
    if (existingGameResult) {
      throw new BadRequestException('Este jogo já possui um resultado.');
    }

    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: ['homeTeam', 'awayTeam'],
    });

    if (!game) {
      throw new BadRequestException('Jogo não encontrado.');
    }

    const gameResult = this.gameResultRepository.create({
      game,
      result,
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      homeTeamId: game.homeTeamId,
      awayTeamId: game.awayTeamId,
      winningTeamId: result === 'win' ? winningTeamId : null, 
    });

    return await this.gameResultRepository.save(gameResult);
  }
}
