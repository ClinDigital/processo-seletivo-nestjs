import { UsersProviders } from './../common/providers/users.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ClinicsProviders } from 'src/common/providers/clinc.providers';
import { Clinics, Users } from 'src/common/entities';

@Module({
  imports: [SequelizeModule.forFeature([Users, Clinics])],
  exports: [SequelizeModule],
  providers: [...UsersProviders, ...ClinicsProviders],
})
export class DataAccessModule {}
