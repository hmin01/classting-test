import { Injectable } from '@nestjs/common';
// DTO
import { CreateSchoolDto } from './school.dto';

@Injectable()
export class SchoolService {
  create(createSchoolDto: CreateSchoolDto) {
    return;
  }

  getAll() {
    return [];
  }
}
