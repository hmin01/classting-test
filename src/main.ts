import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const swaggerConfig = new DocumentBuilder().setTitle('News feed API').setDescription('for classting test').setVersion('1.0.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  // Swagger 추가
  SwaggerModule.setup('apis-doc', app, document);

  await app.listen(3000);
}
bootstrap();
