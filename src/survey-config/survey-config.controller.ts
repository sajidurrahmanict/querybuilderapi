/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

// import { SurveyConfig } from './survey-config.entity/survey-config.entity';

import { SurveyConfigService } from './survey-config.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { QuestionGroup } from './survey-config.entity/questionGroup.entity';

import { Question } from './survey-config.entity/question.entity';
import { Option } from './survey-config.entity/option.entity';
import { QuestionModel } from './survey-config.entity/question-model.entity';
import {
  CreateSurveyDto,
  UpdateSurveyDto,
} from './survey-config.dto/survey.dto';
import { Survey } from './survey-config.entity/survey.entity';
import {
  CreateAnswerDto,
  UpdateAnswerDto,
} from './survey-config.dto/create-answer.dto';
import { Answer } from './survey-config.entity/answer.entity';
import {
  SubSubItemAnswerResponseDto,
  CreateSubSubItemAnswerDto,
} from './survey-config.dto/CreateSubSubItemAnswer.dto';
import { SubSubItemAnswer } from './survey-config.entity/subSubItemAnswer.entity';
@ApiTags('Surveys')
@Controller('surveyConfig')
export class SurveyConfigController {
  constructor(private readonly surveyService: SurveyConfigService) {}
  //  @Post('addQuestionSet')
  //   async addSurvey(@Body() data: CreateQuestionGroupDto[]): Promise<QuestionGroup[]> {
  //     return this.surveyService.createSurvey(data);
  //   }
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(
    @Body() createSurveyDto: CreateSurveyDto,
    @Req() req: Request,
  ): Promise<Survey> {
    try {
      const user = req['user'];
      return await this.surveyService.create(createSurveyDto, user);
    } catch (error) {
      console.error('Survey creation failed:', error.message, error.stack);
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.surveyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSurveyDto: CreateSurveyDto,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.surveyService.update(id, updateSurveyDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveyService.remove(id);
  }
  //answer
  @Post('addAnswer')
  @ApiResponse({ status: 201, description: 'Answer created successfully' })
  async createAnswer(
    @Body() createAnswerDto: CreateAnswerDto,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.surveyService.createanswer(createAnswerDto, user);
  }

  @Get('getAnswer/:id')
  @ApiOperation({ summary: 'Get answer by ID' })
  async findOneAnswer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Answer> {
    return await this.surveyService.findOneAnswer(id);
  }

  @Put('updateAnswer/:id')
  @ApiOperation({ summary: 'Update answer by ID' })
  async updateAnswer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
    @Req() req: Request,
  ): Promise<Answer> {
    const user = req['user'];
    return await this.surveyService.updateAnswer(id, updateAnswerDto, user);
  }

  @Delete('deleteAnswer:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an answer by ID' })
  async removeAnswer(@Param('id', ParseUUIDPipe) id: string) {
    return this.surveyService.removeAnswer(id);
  }
  @Post('addSubSubItemAnswer')
  @ApiResponse({ status: 201, type: SubSubItemAnswerResponseDto })
  async createSubAns(
    @Body() dto: CreateSubSubItemAnswerDto,
    @Req() req: Request,
  ): Promise<SubSubItemAnswerResponseDto> {
    const user = req['user'];
    const entity = await this.surveyService.createSubAns(dto, user);
    return entity;
  }

  @Get('getAllSubSubItemAnswer')
  async findAllSubAns(): Promise<SubSubItemAnswerResponseDto[]> {
    const entities = await this.surveyService.findAllSubAns();
    return entities;
  }

  @Get('getSubSubItemAnswer:id')
  async findByIdSubAns(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<SubSubItemAnswerResponseDto> {
    const entity = await this.surveyService.findByIdSubAns(id);
    return entity;
  }

  @Delete('deleteSubSubItemAnswer:id')
  async deleteSubAns(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<{ message: string }> {
    await this.surveyService.deleteSubAns(id);
    return { message: `SubSubItemAnswer with ID ${id} deleted successfully.` };
  }

  //   @Get('getAllQuestionSets')
  //   async fetchSurvey(): Promise<QuestionGroup[]> {
  //     return this.surveyService.getSurvey();
  //   }
  // //questionGroup
  //  @Post('addQuestionGroup')
  //   createquestionGroup(@Body() dto: QuestionGroup): Promise<QuestionGroup> {
  //     return this.surveyService.createQuestionGroup(dto);
  //   }
  //    @Get('allQuestionGroups')
  //   async getAllQuestionGroups(): Promise<QuestionGroup[]> {
  //     return await this.surveyService.getAllQuestionGroups();
  //   }

  //   @Get('getQuestionGroup:id')
  //   getQuestionGroupById(@Param('id') id: string): Promise<QuestionGroup> {
  //     return this.surveyService.getQuestionGroupById(id);
  //   }

  //   @Put('updateQuestionGroup:id')
  //   updateQuestionGroup(
  //     @Param('id') id: string,
  //     @Body() dto: QuestionGroup,
  //   ): Promise<QuestionGroup> {
  //     return this.surveyService.updateQuestionGroup(id, dto);
  //   }

  //   @Delete('deleteQuestionGroup:id')
  //   deleteQuestionGroup(@Param('id') id: string): Promise<{ message: string }> {
  //     return this.surveyService.deleteQuestionGroup(id);
  //   }
  // //question
  //  @Post('add-question')
  //   createQuestion(@Body() question: Question): Promise<Question> {
  //     return this.surveyService.createQuestion(question);
  //   }

  //   @Get('get-all-questions')
  //   getAllQuestions(): Promise<Question[]> {
  //     return this.surveyService.getAllQuestions();
  //   }

  //   @Get('get-question/:id')
  //   getQuestionById(@Param('id') id: string): Promise<Question> {
  //     return this.surveyService.getQuestionById(id);
  //   }

  //   @Put('update-question/:id')
  //   updateQuestion(
  //     @Param('id') id: string,
  //     @Body() updatedQuestion: Question,
  //   ): Promise<Question> {
  //     return this.surveyService.updateQuestion(id, updatedQuestion);
  //   }

  //   @Delete('delete-question/:id')
  //   deleteQuestion(@Param('id') id: string): Promise<void> {
  //     return this.surveyService.deleteQuestion(id);
  //   }
  //   //option
  //    @Post('add-option')
  //   createOption(@Body() option: Option): Promise<Option> {
  //     return this.surveyService.createOption(option);
  //   }

  //   @Get('get-all-options')
  //   getAllOptions(): Promise<Option[]> {
  //     return this.surveyService.getAllOptions();
  //   }

  //   @Get('get-option/:id')
  //   getOptionById(@Param('id') id: string): Promise<Option> {
  //     return this.surveyService.getOptionById(id);
  //   }

  //   @Put('update-option/:id')
  //   updateOption(@Param('id') id: string, @Body() update: Option): Promise<Option> {
  //     return this.surveyService.updateOption(id, update);
  //   }

  //   @Delete('delete-option/:id')
  //   deleteOption(@Param('id') id: string): Promise<void> {
  //     return this.surveyService.deleteOption(id);
  //   }
  //   //questionmodel
  //    @Post('add-questionmodel')
  //   createQuestionModel(@Body() model: QuestionModel): Promise<QuestionModel> {
  //     return this.surveyService.createQuestionModel(model);
  //   }

  //   @Get('get-all-questionmodels')
  //   getAllQuestionModel(): Promise<QuestionModel[]> {
  //     return this.surveyService.getAllQuestionModels();
  //   }

  //   @Get('get-questionmodel/:id')
  //   getByIdQuestionModel(@Param('id') id: string): Promise<QuestionModel> {
  //     return this.surveyService.getQuestionModelById(id);
  //   }

  //   @Put('update-questionmodel/:id')
  //   updateQuestionModel(@Param('id') id: string, @Body() model: QuestionModel): Promise<QuestionModel> {
  //     return this.surveyService.updateQuestionModel(id, model);
  //   }

  //   @Delete('delete-questionmodel/:id')
  //   deleteQuestionModel(@Param('id') id: string): Promise<void> {
  //     return this.surveyService.deleteQuestionModel(id);
  //   }
}
