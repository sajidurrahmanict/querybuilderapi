/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DesignDefinitionController } from './design-definition.controller';
import { DesignDefinitionService } from './design-definition.service';
import { DesignDefinition } from './design-defination.entity/design-definition.entity';
//import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Modules } from 'src/module/module.entity/modules.entity';
import { Field } from 'src/module/module.entity/field.entity';
import { App } from 'src/module/module.entity/app.entity';
import { Item } from 'src/module/module.entity/item.entity';
import { Menu } from 'src/module/module.entity/menu.entity';
import { SubItem } from 'src/module/module.entity/subitem.entity';
import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([
       DesignDefinition ,Modules,
       App,Menu,Item,SubItem,SubSubItem,Field
      ]),
    ],
  controllers: [DesignDefinitionController],
  providers: [DesignDefinitionService]
})
export class DesignDefinitionModule {}
