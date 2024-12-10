import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, Not, Repository } from 'typeorm';
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
    const { homeTeamId, awayTeamId, dateTime } = createGameDto;
  
    const formattedDateTime = new Date(dateTime);
    const utcDateTime = new Date(formattedDateTime.toISOString());
    const startTime = new Date(utcDateTime.getTime() - 90 * 60 * 1000);
    const endTime = new Date(utcDateTime.getTime() + 90 * 60 * 1000);
  
    try {
      const existingGame = await this.gamesRepository.findOne({
        where: [{homeTeamId, awayTeamId, dateTime: Between(startTime, endTime), }, 
          { homeTeamId: awayTeamId, awayTeamId: homeTeamId, dateTime: Between(startTime, endTime), },],
      });
  
      if (existingGame) {
        throw new ConflictException(
          'Já existe um jogo marcado com os mesmos times em um intervalo de 90 minutos.',
        );
      }
  
      const game = this.gamesRepository.create({
        ...createGameDto,
        dateTime: utcDateTime,
      });
  
      return await this.gamesRepository.save(game);
    } catch (error) {
      console.error('Erro inesperado:', error);
      throw error;
    }
  }  
  

  async findFilteredGames(
    teamName?: string,
    date?: string,
    gameStatus?: string,    homeTeamId?: number,
    awayTeamId?: number,
    gameLocationId?: number,

  ): Promise<Game[]> {
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
      queryBuilder.andWhere('game.game_status LIKE :gameStatus', {
        gameStatus,
      });
    }

    if (homeTeamId && awayTeamId) {
      queryBuilder.andWhere(
        '(game.homeTeamId = :homeTeamId AND game.awayTeamId = :awayTeamId)',
        { homeTeamId, awayTeamId },
      );
    }

    if (gameLocationId) {
      queryBuilder.andWhere(
        '(game.gameLocationId = :gameLocationId)',
        { gameLocationId },
      );
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
