import { Module } from '@nestjs/common';
// Config
import { DynamodbConfigure } from './config/dynamodb.config';
// Module
import { ConfigModule } from '@nestjs/config';
import { DynamooseModule } from 'nestjs-dynamoose';
import { SchoolModule } from './school/school.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DynamooseModule.forRootAsync({
      useClass: DynamodbConfigure,
    }),
    SchoolModule,
  ],
})
export class AppModule {}
