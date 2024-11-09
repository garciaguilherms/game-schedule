import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGameDto {
  @IsDate()
  @IsNotEmpty()
  dateTime: Date;

  @IsNumber()
  @IsNotEmpty()
  homeTeamId: number;

  @IsNumber()
  @IsNotEmpty()
  awayTeamId: number;
}
