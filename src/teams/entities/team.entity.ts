import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Game } from '../../games/entities/game.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Define o nome como único
  name: string;

  @Column({ default: 11 }) // Define a quantidade de jogadores como 11
  players: number;

  @OneToMany(() => Game, (game) => game.homeTeam)
  homeGames: Game[];

  @OneToMany(() => Game, (game) => game.awayTeam)
  awayGames: Game[];
}
