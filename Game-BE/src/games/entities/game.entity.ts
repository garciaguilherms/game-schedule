import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { GameResult } from '../../games-result/entities/game-result.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  dateTime: Date;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'homeTeamId' })
  homeTeam: Team;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'awayTeamId' })
  awayTeam: Team;

  @Column()
  homeTeamId: number;

  @Column()
  awayTeamId: number;

  @OneToOne(() => GameResult, (gameResult) => gameResult.game)
  @JoinColumn()
  result: GameResult;
}
