import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import {ClarityModule} from '@clr/angular';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ]
})
export class EditorModule { }
