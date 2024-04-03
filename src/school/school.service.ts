import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { md5 } from 'js-md5';
// DTO
import { CreateSchoolDto } from './school.dto';
// Interface
import { School, SchoolKey } from './school.interface';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel('School') private schoolModel: Model<School, SchoolKey>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<string> {
    const hash = md5.create();
    hash.update(createSchoolDto.region);
    hash.update(createSchoolDto.name);
    // 데이터 저장을 위한 객체 생성
    const info: School = { uuid: hash.hex(), ...createSchoolDto };

    try {
      // 저장
      const result = await this.schoolModel.create(info);
      // 생성된 ID 반환
      return result.uuid;
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new HttpException(
          'Validation failed: ' + err.message,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  getAll() {
    return [];
  }
}
