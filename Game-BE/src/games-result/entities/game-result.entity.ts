import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Game } from '../../games/entities/game.entity';
import { Team } from '../../teams/entities/team.entity';

@Entity()
export class GameResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game)
  @JoinColumn({ name: 'gameId' })
  game: Game;

  @Column()
  result: string; // "Vitória da Casa", "Vitória do Visitante", "Empate"

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

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'winningTeamId' })
  winningTeam: Team; // Armazena o time vencedor (se houver)

  @Column({ nullable: true })
  winningTeamId: number | null; // Id do time vencedor, pode ser nulo no caso de empate
}
