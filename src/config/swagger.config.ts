import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('News feed API')
  .setDescription('for classting test')
  .setVersion('1.0.0')
  .build();
