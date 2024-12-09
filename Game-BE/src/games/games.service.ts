import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { UpdateGameResultDto } from './dto/update-game-result.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const { dateTime } = createGameDto;

    const formattedDateTime = new Date(dateTime);
    const utcDateTime = new Date(formattedDateTime.toISOString());

    try {
      const game = this.gamesRepository.create(createGameDto);
      return await this.gamesRepository.save(game);
    } catch (error) {
      if (error.code === 'ER_SIGNAL_EXCEPTION' && error.sqlState === '45000') {
        throw new ConflictException(
          'Já existe um jogo marcado com os mesmos times neste horário.',
        );
      }
      console.error('Erro inesperado:', error);
      throw error;
    }
  }

  async findFilteredGames(teamName?: string, date?: string, gameStatus?: string): Promise<Game[]> {
    const queryBuilder = this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.homeTeam', 'homeTeam')
      .leftJoinAndSelect('game.awayTeam', 'awayTeam');

    if (teamName) {
      queryBuilder.andWhere(
        '(homeTeam.name LIKE :teamName OR awayTeam.name LIKE :teamName)',
        { teamName: `%${teamName}%` },
      );
    }

    if (date) {
      queryBuilder.andWhere('DATE(game.dateTime) = :date', { date });
    }

    if (gameStatus) {
      queryBuilder.andWhere('LOWER(game.game_status) = LOWER(:gameStatus)', { gameStatus });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Game> {
    const game = this.gamesRepository.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException(
        `Não foi encontrado nenhum jogo com id: ${id}`,
      );
    }
    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.gamesRepository.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException(
        `Não foi encontrado nenhum jogo com id: ${id}`,
      );
    }

    Object.assign(game, updateGameDto);
    return await this.gamesRepository.save(game);
  }

  async remove(id: number): Promise<void> {
    const game = await this.findOne(id);
    await this.gamesRepository.remove(game);
  }

  async updateResult(
    id: number,
    updateGameResultDto: UpdateGameResultDto,
  ): Promise<Game> {
    const game = await this.gamesRepository.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException(
        `Não foi encontrado nenhum jogo com id: ${id}`,
      );
    }
    console.log(updateGameResultDto);

    game.game_status = updateGameResultDto.game_status;
    game.homePoints = updateGameResultDto.homePoints;
    game.awayPoints = updateGameResultDto.awayPoints;
    game.winningTeamId = updateGameResultDto.winningTeamId;

    console.log(game);
    await this.gamesRepository.save(game);
    return game;
  }

  async gameResult(): Promise<Game[]> {
    return this.gamesRepository.find({
      where: {
        game_status: Not(IsNull()),
      },
      relations: ['homeTeam', 'awayTeam'],
    });
  }
}
