import { Injectable } from '@nestjs/common';
import {
  DynamooseModuleOptions,
  DynamooseOptionsFactory,
} from 'nestjs-dynamoose';
// Config
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DynamodbConfigure implements DynamooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createDynamooseOptions(): DynamooseModuleOptions {
    return {
      aws: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
        region: this.configService.get<string>('AWS_REGION'),
      },
    };
  }
}
