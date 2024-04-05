import { IsNotEmpty, IsString } from 'class-validator';

export class SubscribeDto {
  @IsNotEmpty()
  @IsString()
  school_id: string;
}
