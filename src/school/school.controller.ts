import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
// DTO
import { CreateSchoolDto } from './school.dto';
// HTTP Method
import { Get, Post } from '@nestjs/common';
// Service
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get('/list')
  getAll() {
    return this.schoolService.getAll();
  }
}
