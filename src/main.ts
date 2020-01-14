import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/common/enums/transport.enum';
// tslint:disable-next-line:no-var-requires
require('dotenv').config();
// create a logger instance
const logger = new Logger('Main');

// create microservice options object
const microserviceOptions = {
  transport: Transport.REDIS,
  options: {
    url: 'redis://localhost:6379',
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  app.listen(() => {
    logger.log(
      'User microservice is listening on port: ' +
        microserviceOptions.options.url,
    );
  });
}
bootstrap();
