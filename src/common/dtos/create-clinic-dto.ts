import { IsString, IsOptional, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClinicDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsPhoneNumber('BR')
  phone: string;

  @ApiProperty()
  @IsString()
  ownerName: string;

  @ApiProperty()
  @Length(8, 8)
  cep: string;

  @ApiProperty()
  @Length(2, 2)
  uf: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  complement?: string;
}
