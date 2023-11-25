import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightRequestDTO } from './dto/flight-request.dto';
import { FlightResponseDTO } from './dto/flight-response.dto';
import { ApiBody } from '@nestjs/swagger';
import { FlightOffersPricingRequestDTO } from './dto/flight-price-request.dto';
import BookingRequestDto from './dto/create-booking.dto';
const amqplib = require('amqplib/callback_api');

@Controller('flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
  ) { }

  async onModuleInit() {
    // try {
    //   amqplib.connect(process.env.RABBITMQ_CONECTION_URL, (error0, connection) => {
    //     if (error0) {
    //       throw error0;
    //     }

    //     connection.createChannel((error1, channel) => {
    //       if (error1) {
    //         throw error1;
    //       }
    //       var queue = 'find_flights';

    //       channel.assertQueue(queue, {
    //         durable: false
    //       });
    //       channel.prefetch(1);
    //       console.log(' [x] Awaiting RPC requests');
    //       channel.consume(queue, async (msg) => {
    //         // Convert buffer to a string
    //         const jsonString = msg.content.toString();

    //         const originalObject = JSON.parse(jsonString);

            
    //         const { payload } = originalObject
            
    //         const response = await this.flightService.getFlightPrice(payload);

    //         await channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
    //           correlationId: msg.properties.correlationId
    //         })

    //         channel.ack(msg);
    //       });
    //     });
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  }

  @Post('/search')
  async searchFlights(@Body() flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> { 
    return this.flightService.searchFlights(flightRequest);
  }

  @Post('/price')
  @ApiBody({ type: FlightOffersPricingRequestDTO })
  async getFlightPrice(@Body() requestDto: FlightOffersPricingRequestDTO) {
    return this.flightService.getFlightPrice(requestDto);
  }

  @Post('/order')
  @ApiBody({ type: BookingRequestDto })
  async createOrder(@Body() requestDto: BookingRequestDto) {
    return this.flightService.createOrder(requestDto);
  }

}
