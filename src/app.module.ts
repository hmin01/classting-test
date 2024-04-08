import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// Config
import { DynamodbConfigService } from '@config/dynamodb.config';
import { JwtConfigService } from '@config/jwt.config';
// JWT
import { JwtModule, JwtService } from '@nestjs/jwt';
// Middleware
import { AuthMiddleware } from '@middleware/auth.middleware';
// Module
import { ConfigModule } from '@nestjs/config';
import { DynamooseModule } from 'nestjs-dynamoose';
import { SchoolModule } from '@api/school/school.module';
import { SubscriptionModule } from '@api/subscription/subscription.module';
import { TestModule } from './test/root-test.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DynamooseModule.forRootAsync({
      useClass: DynamodbConfigService,
    }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    SchoolModule,
    SubscriptionModule,
    TestModule,
  ],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // /subscribe 경로에 대해 AuthMiddleware 적용
    consumer.apply(AuthMiddleware).forRoutes('/school/subscription', '/school/unsubscription', '/subscription/*');
  }
}
