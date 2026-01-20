/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { SurveyConfigController } from './survey-config.controller'

describe('SurveyConfigController', () => {
  let controller: SurveyConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyConfigController],
    }).compile();

    controller = module.get<SurveyConfigController>(SurveyConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
