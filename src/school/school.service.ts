import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
// DTO
import { CreateSchoolDto } from './school.dto';
// Interface
import { School, SchoolKey } from './school.schema';
// Utility
import { createHash } from 'utils/crypto';
import { responseException } from 'utils/response';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel('classting-school')
    private schoolModel: Model<School, SchoolKey>,
  ) {}

  /**
   * [Method] 학교 페이지 생성 메서드
   * @param createSchoolDto 생성을 위한 데이터 객체
   * @returns 저장된 데이터 객체
   */
  async create(createSchoolDto: CreateSchoolDto): Promise<string> {
    // UUID 생성
    const uuid: string = createHash(
      createSchoolDto.region,
      createSchoolDto.name,
    );
    // 데이터 저장을 위한 객체 생성
    const info: School = { uuid, ...createSchoolDto };

    try {
      // 저장
      const result = await this.schoolModel.create(info);
      // 생성된 ID 반환
      return result.uuid;
    } catch (err) {
      responseException(err);
    }
  }
}
