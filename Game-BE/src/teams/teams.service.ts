import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
import { UpdateTeamDto } from './dto/update-team.dto';
import { GamesService } from 'src/games/games.service';
import { Game } from 'src/games/entities/game.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const existingTeam = await this.teamsRepository.findOne({
      where: { name: createTeamDto.name },
    });

    if (existingTeam) {
      throw new ConflictException(`Um time com o nome "${createTeamDto.name}" já existe.`);
    }

    const team = this.teamsRepository.create(createTeamDto);
    return this.teamsRepository.save(team);
  }

  async findAll(): Promise<Team[]> {
    return await this.teamsRepository.find();
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamsRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(
        `Não foi encontrado o time com esse id: ${id}`,
      );
    }
    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.teamsRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(
        `Não foi encontrado o time com esse id: ${id}`,
      );
    }

    Object.assign(team, updateTeamDto);
    return await this.teamsRepository.save(team);
  }

  async remove(id: number): Promise<void> {
    const gamesCount = await this.gamesRepository.count({
      where: [{ homeTeamId: id }, { awayTeamId: id }],
    });
  
    if (gamesCount > 0) {
      throw new BadRequestException(`Não é possível excluir o time, pois ele está associado a ${gamesCount} jogos.`);
    }
  
    const team = await this.teamsRepository.findOneBy({ id });
    if (!team) {
      throw new NotFoundException(`Time com ID ${id} não encontrado`);
    }
    await this.teamsRepository.remove(team);
  }
}
