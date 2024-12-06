import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

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

    const existingGame = await this.gamesRepository.findOne({
      where: { dateTime: utcDateTime },
    });

    if (existingGame) {
      throw new ConflictException(
        'Já existe um jogo marcado para o mesmo dia e horário.',
      );
    }

    const game = this.gamesRepository.create(createGameDto);
    return this.gamesRepository.save(game);
  }

  async findAll(): Promise<Game[]> {
    return await this.gamesRepository.find();
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
}
