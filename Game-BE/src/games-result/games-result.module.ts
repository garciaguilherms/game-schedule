import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameResultService } from './games-result.service';
import { GameResultController } from './games-result.controller';
import { GameResult } from './entities/game-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameResult])],
  controllers: [GameResultController],
  providers: [GameResultService],
})
export class GamesModule {}
