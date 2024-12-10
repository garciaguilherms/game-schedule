import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { GameLocation } from 'src/location/entities/location-entity';

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

  @ManyToOne(() => GameLocation)
  @JoinColumn({ name: 'gameLocationId' })
  gameLocation: GameLocation;

  @Column()
  homeTeamId: number;

  @Column()
  awayTeamId: number;

  @Column({ type: 'int', nullable: true })
  homePoints: number;

  @Column({ type: 'int', nullable: true })
  awayPoints: number;

  @Column({ nullable: true })
  game_status: string;

  @Column({ type: 'int', nullable: true })
  winningTeamId: number | null;

  @Column({ type: 'int', nullable: true })
  gameLocationId: number | null;
}
