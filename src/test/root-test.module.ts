import { Module } from '@nestjs/common';
// Module
import { DynamooseModule } from 'nestjs-dynamoose';
// Repository
import { SchoolRepository } from '@repository/school.repository';
// Schema
import SchoolSchema, { SchoolSchemaName } from '@/schema/school.schema';

@Module({
  imports: [DynamooseModule.forFeature([{ name: SchoolSchemaName, schema: SchoolSchema }])],
  providers: [SchoolRepository],
})
export class RootTestModule {}
