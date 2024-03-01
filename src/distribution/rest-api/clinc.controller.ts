import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { CreateClinicDto } from '../../common/dtos/create-clinic-dto';
import { ClinicDto } from '../../common/dtos/clinic-dto';
import { ClinicsService } from 'src/business/services/clinc.service';
import { Query } from '@nestjs/common';

@Controller('/clinc')
export class ClincController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicsService.create(createClinicDto);
  }

  @ApiResponse({ type: ClinicDto, isArray: true })
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  list(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.clinicsService.list(+page, +limit);
  }
  

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateClinicDto: ClinicDto) {
    return this.clinicsService.update(parseInt(id), updateClinicDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.clinicsService.remove(parseInt(id));
  }
}
