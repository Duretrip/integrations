import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || 3009
  await app.listen(port);
  console.log(
    `app listening on ${port}`,
  );
}
bootstrap();
