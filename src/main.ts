import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: envs.natsServers
    }
  });

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );

  await app.listen();
  //const app = await NestFactory.create(AppModule);
  //await app.listen(process.env.PORT ?? 3010);
}
bootstrap();
