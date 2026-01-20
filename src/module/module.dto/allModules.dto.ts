/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable prettier/prettier */
import { App } from "../module.entity/app.entity";
import { DataPoint } from "../module.entity/dataPoint.entity";
import { Field } from "../module.entity/field.entity";
import { Item } from "../module.entity/item.entity";
import { Menu } from "../module.entity/menu.entity";
import { SubItem } from "../module.entity/subitem.entity";
import { SubSubItem } from "../module.entity/subsubitem.entity";
import { SubSubSubItem } from "../module.entity/subSubSubItem.entity";

export class AllModules {
  id: string;
  name: string;
  serialNumber: string;
  tier?: string | null;
  apps: App[] | null;
  menus: Menu[] | null;
  items: Item[] | null;
  subitems: SubItem[] | null;
  subsubitem: SubSubItem[] | null;
  subsubsubitem: SubSubSubItem[] | null;
  DpGroup: Field[] | null;
  DataPoint: DataPoint[] | null;
}