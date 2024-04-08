import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_id: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;
}

export class UpdateNewsDto extends CreateNewsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  created_at: number;
}
