/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionGroup } from './survey-config.entity/questionGroup.entity';
import { Question } from './survey-config.entity/question.entity';
import { Option } from './survey-config.entity/option.entity';
import { QuestionModel } from './survey-config.entity/question-model.entity';
import { SurveyConfigController } from './survey-config.controller';
import { SurveyConfigService } from './survey-config.service';
import { Survey } from './survey-config.entity/survey.entity';
import { Answer } from './survey-config.entity/answer.entity';
import { SubSubItemAnswer } from './survey-config.entity/subSubItemAnswer.entity';
import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubSubItem,
      Survey,
      QuestionGroup,
      Question,
      Option,
      QuestionModel,
      Answer,
      SubSubItemAnswer,
    ]),
    AuthModule,
  ],
  controllers: [SurveyConfigController],
  providers: [SurveyConfigService],
})
export class SurveyConfigModule {}
