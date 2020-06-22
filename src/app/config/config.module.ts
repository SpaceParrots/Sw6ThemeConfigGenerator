import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { TabsComponent } from './tabs/tabs.component';
import { SectionsComponent } from './sections/sections.component';
import { BlocksComponent } from './blocks/blocks.component';
import { FieldsComponent } from './fields/fields.component';


@NgModule({
  declarations: [TabsComponent, SectionsComponent, BlocksComponent, FieldsComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule
  ]
})
export class ConfigModule { }
