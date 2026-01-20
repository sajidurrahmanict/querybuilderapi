/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SurveyModuleController } from './survey-module.controller';

describe('SurveyModuleController', () => {
  let controller: SurveyModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyModuleController],
    }).compile();

    controller = module.get<SurveyModuleController>(SurveyModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  }); 
});
