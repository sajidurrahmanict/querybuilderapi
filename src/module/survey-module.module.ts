/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SurveyModuleController } from './survey-module.controller';
import { SurveyModuleService } from './survey-module.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modules } from './module.entity/modules.entity';
import { App } from './module.entity/app.entity';
import { Menu } from './module.entity/menu.entity';
import { Item } from './module.entity/item.entity';
import { Field } from './module.entity/field.entity';

import { SubItem } from './module.entity/subitem.entity';
import { SubSubItem } from './module.entity/subsubitem.entity';
import { AuthModule } from '../auth/auth.module';
import { SubSubSubItem } from './module.entity/subSubSubItem.entity';
import { Template } from 'src/Template/entity/template';
import { DataPoint } from './module.entity/dataPoint.entity';
import { DataPointMap } from './module.entity/dataPointMap.entity';
import { DPGroupMap } from './module.entity/dpgroupMap.entity';
import { Button } from './module.entity/button.entity';
import { TemplateButtonMap } from './module.entity/TemplateButtonMap.entity';
import { Page } from './module.entity/page.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Template,
      Modules,
      App, // ✅ This is likely what’s missing
      Menu,
      Item,
      SubItem,
      SubSubItem,
      SubSubSubItem,
      Field,
      DataPoint,
      DataPointMap,
      DPGroupMap,
      Button,
      TemplateButtonMap,
      Page
    ]),
    AuthModule,
  ],
  providers: [SurveyModuleService],
  controllers: [SurveyModuleController],
})
export class SurveyModuleModule {}
