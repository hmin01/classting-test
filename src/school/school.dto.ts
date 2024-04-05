import { IsNotEmpty, IsString } from 'class-validator';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
