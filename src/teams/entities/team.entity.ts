import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Define o nome como único
  name: string;

  @Column({ default: 11 }) // Define a quantidade de jogadores como 11
  players: number;
}
