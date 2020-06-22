import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import {ClarityModule} from '@clr/angular';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    TranslateModule
  ]
})
export class EditorModule { }
