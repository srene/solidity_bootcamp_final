import { Controller, Get,Post, Param, Body, Query, ForbiddenException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('get-video-list')
  async getVideoList(){
    return await this.appService.getVideoList();
  }

}
