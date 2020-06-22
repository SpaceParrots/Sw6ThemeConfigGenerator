import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditorComponent} from '@app/editor/editor.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'editor'},
  {path: 'editor', component: EditorComponent},
  {path: 'config', loadChildren: () => import('./config/config.module').then(value => value.ConfigModule)}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
