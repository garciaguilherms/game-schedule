import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

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
}
