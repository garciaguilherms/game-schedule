import { Game } from 'src/games/entities/game.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
  } from 'typeorm';

  @Entity()
  export class GameLocation {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @OneToMany(() => Game, (game) => game.gameLocation)
    games: Game[];
}
  