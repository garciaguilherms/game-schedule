import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';

@Entity()
export class Statistics {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Team)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column()
  teamId: number;

  @Column({ default: 0 })
  wins: number;

  @Column({ default: 0 })
  losses: number;

  @Column({ default: 0 })
  draws: number;
}



