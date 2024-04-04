import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  school_id: string;

  @IsNotEmpty()
  content: string;
}

export class UpdateNewsDto extends CreateNewsDto {
  @IsNotEmpty()
  @IsNumber()
  created_at: number;
}
