/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SurveyConfigService } from './survey-config.service';

describe('SurveyConfigServiceService', () => {
  let service: SurveyConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyConfigService],
    }).compile();

    service = module.get<SurveyConfigService>(SurveyConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
