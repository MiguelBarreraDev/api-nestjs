import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Welcome to the REST API' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/status')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Exposes the availalibity of the REST API',
  })
  async status() {
    return {
      message: 'CRM Backend service is connected to Database',
    };
  }

  @Get('/info')
  @ApiResponse({ status: 200, description: 'API details' })
  info() {
    return {
      nombre: 'REST API CRM Multilab',
      version: 'V 1.0',
      lenguaje: 'Nestjs',
      propietario: 'Multilab',
      desarrollador: 'Miguel Barrera',
      copyright: 2023,
    };
  }
}
