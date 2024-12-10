import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from './games/games.module';
import { Team } from './teams/entities/team.entity';
import { Game } from './games/entities/game.entity';
import { StatisticsModule } from './statistics/statistics.module';
import { Statistics } from './statistics/entities/statistics-entitiy';
import { GameLocation } from './location/entities/location-entity';
import { GameLocationModule } from './location/location.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '2458',
      database: 'trabalho',
      entities: [Team, Game, Statistics, GameLocation],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TeamsModule,
    GamesModule,
    StatisticsModule,
    GameLocationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
