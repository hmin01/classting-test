import { Injectable } from '@nestjs/common';
// DTO
import { CreateSchoolDto } from './school.dto';
// Model
import SchoolModel from './school.model';
// Utility
import { createHash } from '../utils/crypto';
import { responseException } from '../utils/response';

@Injectable()
export class SchoolService {
  /**
   * [Method] 학교 페이지 생성 메서드
   * @param createSchoolDto 생성을 위한 데이터 객체
   * @returns 저장된 데이터 객체
   */
  async create(createSchoolDto: CreateSchoolDto): Promise<string> {
    try {
      // UUID 생성
      const uuid: string = createHash(
        createSchoolDto.region,
        createSchoolDto.name,
      );
      // 데이터 저장을 위한 객체 생성
      const info = { uuid, ...createSchoolDto };

      // 저장
      const result = await SchoolModel.create(info);
      // 생성된 ID 반환
      return result.uuid;
    } catch (err) {
      responseException(err);
    }
  }
}
