import { IsInt, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class GameResultDto {
  @IsInt()
  gameId: number;

  @IsString()
  @IsNotEmpty()
  result: string;

  @IsInt()
  homeTeamId: number;

  @IsInt()
  awayTeamId: number;

  @IsInt()
  @IsOptional()
  winningTeamId: number | null; // O time vencedor pode ser nulo no caso de empate
}
