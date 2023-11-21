import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { AirportSeedService } from './airports/airport-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(AirportSeedService).run();

  await app.close();
};

void runSeed();
