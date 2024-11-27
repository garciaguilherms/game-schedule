import { IsInt, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class GameResultDto {
  @IsInt()
  @IsNotEmpty()
  gameId: number;

  @IsString()
  @IsNotEmpty()
  result: string;

  @IsInt()
  @IsNotEmpty()
  homeTeamId: number;

  @IsInt()
  @IsNotEmpty()
  awayTeamId: number;

  @IsInt()
  @IsOptional()
  winningTeamId: number | null;
}
