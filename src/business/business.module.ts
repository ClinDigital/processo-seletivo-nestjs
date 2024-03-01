import { DataAccessModule } from './../data-access/data-access.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../common/auth/auth.service';
import { HealthCheckService } from './services/healthcheck.service';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersProviders } from 'src/common/providers';
import { LocalStrategy } from 'src/common/auth/local.strategy';
import { ClinicsProviders } from 'src/common/providers/clinc.providers';
import { ClinicsService } from './services/clinc.service';

@Module({
  imports: [DataAccessModule],
  providers: [HealthCheckService, AuthService, UsersService, ClinicsService, JwtService, ...UsersProviders, ...ClinicsProviders, LocalStrategy],
  exports: [HealthCheckService, AuthService, UsersService, JwtService, ClinicsService],
})
export class BusinessModule {}
