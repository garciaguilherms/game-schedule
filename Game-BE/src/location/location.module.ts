import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameLocation } from './entities/location-entity';
import { GameLocationController } from './location.controller';
import { GameLocationService } from './location.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameLocation])],
  controllers: [GameLocationController],
  providers: [GameLocationService],
  exports: [TypeOrmModule.forFeature([GameLocation])],
})
export class GameLocationModule {}
