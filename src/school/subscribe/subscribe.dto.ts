import { IsNotEmpty, IsString } from 'class-validator';

export class SubscribeDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  school_id: string;
}
