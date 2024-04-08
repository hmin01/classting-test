import { IsNotEmpty, IsString } from 'class-validator';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_id: string;
}
