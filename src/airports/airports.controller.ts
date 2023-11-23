// src/airports/airports.controller.ts
import { Controller, Get, Param, Post, Body, Put, Delete, Query, OnModuleInit } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { Airports } from './entities/airport.entity';
const amqplib = require('amqplib/callback_api');

@Controller('airports')
export class AirportsController {
  constructor(
    private readonly airportsService: AirportsService,
    private readonly rabbitMQService: RabbitMQService
  ) { }
  // async onModuleInit() {
  //   try {
  //     amqplib.connect(process.env.RABBITMQ_CONECTION_URL, (error0, connection) => {
  //       if (error0) {
  //         throw error0;
  //       }

  //       connection.createChannel((error1, channel) => {
  //         if (error1) {
  //           throw error1;
  //         }
  //         var queue = 'find_airports';

  //         channel.assertQueue(queue, {
  //           durable: false
  //         });
  //         channel.prefetch(1);
  //         console.log(' [x] Awaiting RPC requests');
  //         channel.consume(queue, async (msg) => {
  //           // Convert buffer to a string
  //           const jsonString = msg.content.toString();

  //           const originalObject = JSON.parse(jsonString);

  //           const { search, limit } = originalObject.payload

  //           const response = await this.airportsService.findAll(search, limit);

  //           await channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
  //             correlationId: msg.properties.correlationId
  //           })

  //           channel.ack(msg);
  //         });
  //       });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  @Post()
  create(@Body() createAirportDto: CreateAirportDto) {
    return this.airportsService.create(createAirportDto);
  }

  @Get()
  async findAll(@Query('search') search: string, @Query('limit') limit: number): Promise<Airports[]> {
    return await this.airportsService.findAll(search, limit);
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
