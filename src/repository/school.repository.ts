import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
// Const
import { SchoolSchemaName } from '@/schema/school.schema';
// Interface
import type { School, SchoolKey } from '@/interface/school.interface';

@Injectable()
export class SchoolRepository {
  constructor(
    @InjectModel(SchoolSchemaName)
    private readonly model: Model<School, SchoolKey>,
  ) {}

  async create(input: School): Promise<School> {
    return await this.model.create(input);
  }
}
