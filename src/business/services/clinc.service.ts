import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateClinicDto } from 'src/common/dtos/create-clinic-dto';
import { Clinics } from 'src/common/entities/template-nest/clinics.entity';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';

@Injectable()
export class ClinicsService {
  constructor(
    @Inject('CLINICS_REPOSITORY')
    private clinicsRepository: typeof Clinics
  ) {}

  async create(createClinicDto: CreateClinicDto) {
    await this.clinicAlreadyRegistered(createClinicDto.cep, createClinicDto.number);
    await this.createClinic(createClinicDto);
  }

  async list(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.clinicsRepository.findAndCountAll({
      limit,
      offset,
    });
  
    const data = rows.map((clinic: Clinics) => ({
      id: clinic.id,
      name: clinic.name,
      phone: clinic.phone,
      ownerName: clinic.ownerName,
      address: {
        cep: clinic.cep,
        uf: clinic.uf,
        city: clinic.city,
        neighborhood: clinic.neighborhood,
        street: clinic.street,
        number: clinic.number,
        complement: clinic.complement,
      },
    }));
  
    return {
      data,
      total: count,
      page,
      lastPage: Math.ceil(count / limit),
    };
  }
  

  async createClinic(createClinicDto: CreateClinicDto) {
    await this.clinicsRepository.create<Clinics>({
      name: createClinicDto.name,
      phone: createClinicDto.phone,
      ownerName: createClinicDto.ownerName,
      cep: createClinicDto.cep,
      uf: createClinicDto.uf,
      city: createClinicDto.city,
      neighborhood: createClinicDto.neighborhood,
      street: createClinicDto.street,
      number: createClinicDto.number,
      complement: createClinicDto.complement,
    });
  }

  async findAll(): Promise<Clinics[]> {
    return this.clinicsRepository.findAll<Clinics>();
  }

  findOne(id: number) {
    return this.clinicsRepository.findOne<Clinics>({
      where: {
        id,
      },
    });
  }

  private async clinicExists(cep: string, number: string) {
    const clinic = await this.clinicsRepository.findOne({
      where: {
        cep,
        number,
      },
    });
    return clinic;
  }

  private async clinicAlreadyRegistered(cep: string, number: string) {
    const clinic = await this.clinicExists(cep, number);
    if (clinic) {
      throw new ConflictException(null, ErrorMessages.CLINIC_ALREADY_REGISTERED);
    }
  }

  async update(id: number, updateClinicDto: CreateClinicDto): Promise<Clinics> {
    const clinic = await this.clinicsRepository.findByPk(id);
    if (!clinic) {
      throw new NotFoundException(ErrorMessages.CLINIC_NOT_FOUND);
    }

    await clinic.update(updateClinicDto);
    return clinic; 
  }

  async remove(id: number): Promise<void> {
    const clinic = await this.clinicsRepository.findByPk(id);
    if (!clinic) {
      throw new NotFoundException(ErrorMessages.CLINIC_NOT_FOUND);
    }

    await clinic.destroy();
  }
}
