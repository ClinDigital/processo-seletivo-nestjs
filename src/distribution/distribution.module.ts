import { JwtAuthGuard } from './../common/auth/jwt-auth.guard';
import { JwtStrategy } from './../common/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { UsersController } from './rest-api/users.controller';
import { AuthController } from './rest-api/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { BusinessModule } from 'src/business/business.module';
import { HealthCheckController } from './rest-api/healthcheck.controller';
import { ClincController } from './rest-api/clinc.controller';

@Module({
  controllers: [HealthCheckController, UsersController, AuthController, ClincController],
  imports: [BusinessModule, PassportModule],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class DistributionModule {}
