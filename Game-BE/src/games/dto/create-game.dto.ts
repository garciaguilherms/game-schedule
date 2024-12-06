import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

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
