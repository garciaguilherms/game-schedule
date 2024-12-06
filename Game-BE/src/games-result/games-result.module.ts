import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameResultService } from './games-result.service';
import { GameResultController } from './games-result.controller';
import { GameResult } from './entities/game-result.entity';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [TypeOrmModule.forFeature([GameResult]), GamesModule],
  controllers: [GameResultController],
  providers: [GameResultService],
})
export class GamesResultModule {}
