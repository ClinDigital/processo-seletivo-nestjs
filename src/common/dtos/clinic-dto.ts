import { ApiProperty } from '@nestjs/swagger';

export class ClinicDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  ownerName: string;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  uf: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  number: string;

  @ApiProperty({ required: false }) 
  complement?: string;
}
