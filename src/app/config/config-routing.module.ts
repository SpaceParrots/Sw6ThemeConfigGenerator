import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TabsComponent} from '@app/config/tabs/tabs.component';
import {SectionsComponent} from '@app/config/sections/sections.component';
import {BlocksComponent} from '@app/config/blocks/blocks.component';
import {FieldsComponent} from '@app/config/fields/fields.component';


const routes: Routes = [
  {path: 'tabs', component: TabsComponent},
  {path: 'sections', component: SectionsComponent},
  {path: 'blocks', component: BlocksComponent},
  {path: 'fields', component: FieldsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
