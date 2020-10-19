import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';

import { AppService } from './app.service';
import { NestedDto } from './nested-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(
    @Query(new ValidationPipe({ transform: true, whitelist: true })) payload: NestedDto
  ): any {
    console.log(payload);
    return { test: true, ...payload };
  }

  @Post('post-test')
  postPostTest(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) payload: NestedDto
  ): any {
    console.log(payload);
    return { ...payload, test: true };
  }
}
