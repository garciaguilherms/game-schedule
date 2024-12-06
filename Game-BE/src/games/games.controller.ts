import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { UpdateGameResultDto } from './dto/update-game-result.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  getAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Game> {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.gamesService.remove(+id);
  }

  @Patch(':id/result')
  async updateResult(
    @Param('id') id: number,
    @Body() updateGameResultDto: UpdateGameResultDto,
  ): Promise<Game> {
    const { homePoints, awayPoints, game_status, winningTeamId } =
      updateGameResultDto;

    if (!homePoints || !awayPoints) {
      throw new BadRequestException(
        'Os pontos de ambos os times devem ser fornecidos.',
      );
    }

    if (game_status === 'finalizado') {
      if (homePoints > awayPoints) {
        updateGameResultDto.winningTeamId = winningTeamId || id;
      } else if (awayPoints > homePoints) {
        updateGameResultDto.winningTeamId = winningTeamId || id;
      } else {
        updateGameResultDto.winningTeamId = null;
      }
    }

    return this.gamesService.updateResult(id, updateGameResultDto);
  }
}
