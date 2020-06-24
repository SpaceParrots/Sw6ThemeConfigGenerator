import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConfigRoutingModule} from './config-routing.module';
import {TabsComponent} from './tabs/tabs.component';
import {SectionsComponent} from './sections/sections.component';
import {BlocksComponent} from './blocks/blocks.component';
import {FieldsComponent} from './fields/fields.component';
import {ClarityModule} from '@clr/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {CreateFieldDialogComponent} from './fields/create-field-dialog/create-field-dialog.component';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';


@NgModule({
  declarations: [TabsComponent, SectionsComponent, BlocksComponent, FieldsComponent, CreateFieldDialogComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    ClarityModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule
  ]
})
export class ConfigModule {
}
