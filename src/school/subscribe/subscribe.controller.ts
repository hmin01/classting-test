import { Controller } from '@nestjs/common';
// HTTP Method
import { Get } from '@nestjs/common';

@Controller('school/subscribe')
export class SubscribeController {
  @Get()
  findOne() {
    return 'hello';
  }
}
