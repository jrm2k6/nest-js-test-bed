import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let moduleRef: TestingModule;
  let application: INestApplication;
  
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    application = moduleRef.createNestApplication();
    await application.init();
  });

  describe('getTest', () => {
    it('handle arrays', async () => {
      const res = await request(application.getHttpServer())
        .get('/test')
        .query({
          name: 'Jeremy',
          ids: [1, 2, 3],
          context: {
            player: 'Player',
            players: ['p1', 'p2']
          }
        })

      console.log(res.body);
    });
  });
});
