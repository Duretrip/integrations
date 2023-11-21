// src/airports/airports.controller.ts
import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { Airports } from './entities/airport.entity';

@Controller('airports')
export class AirportsController {
  constructor(
    private readonly airportsService: AirportsService,
    private readonly rabbitMQService: RabbitMQService
    ) {}
    async onModuleInit() {
      await this.rabbitMQService.connectToRabbitMQ();
      try {
        this.rabbitMQService.consumeMessages('integration-queue', async (message) => {
          // Find All Jets
          if (message.action === 'find_airports') {
            const payload = message.payload;
            const {search, limit} = payload;
            const response = await this.airportsService.findAll(search, limit);
            this.rabbitMQService.publishMessage('api-gateway-queue', {
              correlationId: message?.correlationId,
              action: 'airports_filtered',
              response,
            });
          }
        })
      } catch (err) {
  
      }
    }
  @Post()
  create(@Body() createAirportDto: CreateAirportDto) {
    return this.airportsService.create(createAirportDto);
  }

  @Get()
  findAll(@Query('search') search: string, @Query('limit') limit: number): Promise<Airports[]> {
    return this.airportsService.findAll(search, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.airportsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAirportDto: UpdateAirportDto) {
    return this.airportsService.update(+id, updateAirportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.airportsService.remove(+id);
  }
}
