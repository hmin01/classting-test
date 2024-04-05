import { IsNotEmpty, IsString } from 'class-validator';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class SubscribeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_id: string;
}
