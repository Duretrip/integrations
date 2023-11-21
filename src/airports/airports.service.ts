// src/airports/airports.service.ts
import { Injectable } from '@nestjs/common';
import { Airports } from './entities/airport.entity';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(Airports)
    private readonly airportsRepository: Repository<Airports>,
  ) {}

  create(createAirportDto: CreateAirportDto) {
    const airport = this.airportsRepository.create(createAirportDto);
    return this.airportsRepository.save(airport);
  }

  async findAll(search: string, limit: number = 10): Promise<Airports[]> {
    const queryBuilder = this.airportsRepository.createQueryBuilder('airport');

    // if (search) {
      queryBuilder.where('airport.iataCode ILIKE :search OR airport.city ILIKE :search  OR airport.name ILIKE :search OR airport.country ILIKE :search', { search: `%${search}%` });
    // }
  
    // Apply pagination to limit the number of results
    queryBuilder.take(limit);
  
    return await queryBuilder.getMany();
  }

  findOne(id: number) {
    return this.airportsRepository.findOne({
      where:{
        id
      }
    });
  }

  update(id: number, updateAirportDto: UpdateAirportDto) {
    return this.airportsRepository.update(id, updateAirportDto);
  }

  remove(id: number) {
    return this.airportsRepository.delete(id);
  }
}
