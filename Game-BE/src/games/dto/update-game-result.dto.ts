import { IsInt, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateGameResultDto {
  @IsEnum(['finalizado', 'empate'])
  @IsNotEmpty()
  game_status: 'finalizado' | 'empate';

  @IsInt()
  @IsOptional()
  homePoints?: number;

  @IsInt()
  @IsOptional()
  awayPoints?: number;

  @IsInt()
  @IsOptional()
  winningTeamId?: number | null;
}
