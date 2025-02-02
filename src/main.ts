import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS (по умолчанию разрешает запросы от любого домена)
  app.enableCors();

  // Конфигурация Swagger
  const config = new DocumentBuilder()
    .setTitle('Risk Assessment API')
    .setDescription('API для оценки рисков крипто токенов')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
  console.log('Swagger is available on: http://localhost:3000/api');
}
bootstrap();
