import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());

  // for validation error response
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
      exceptionFactory: (validationErrors = []) => {
        const errors: Record<string, string>[] = [];

        const extractErrors = (errs: any[], parentPath = '') => {
          for (const err of errs) {
            const path = parentPath
              ? `${parentPath}.${err.property}`
              : err.property;

            if (err.constraints) {
              const firstMessage = Object.values(err.constraints)[0] as string;

              errors.push({
                [path]: firstMessage,
              });
            }

            if (err.children && err.children.length > 0) {
              extractErrors(err.children, path);
            }
          }
        };

        extractErrors(validationErrors);

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors,
        });
      },
    }),
  );
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  });

  app.use(helmet());
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
