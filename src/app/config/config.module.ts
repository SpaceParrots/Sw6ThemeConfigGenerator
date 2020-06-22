import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConfigRoutingModule} from './config-routing.module';
import {TabsComponent} from './tabs/tabs.component';
import {SectionsComponent} from './sections/sections.component';
import {BlocksComponent} from './blocks/blocks.component';
import {FieldsComponent} from './fields/fields.component';
import {ClarityModule} from '@clr/angular';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [TabsComponent, SectionsComponent, BlocksComponent, FieldsComponent],
  imports: [
    CommonModule,
    ClarityModule,
    ConfigRoutingModule,
    FormsModule
  ]
})
export class ConfigModule {
}
