import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LanguageSelectorComponent} from './components/language-selector/language-selector.component';
import {ClarityModule} from '@clr/angular';
import {TranslateModule} from '@ngx-translate/core';
import {TranslateToPipe} from '@app/shared/pipes/translate-to.pipe';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [LanguageSelectorComponent, TranslateToPipe, FooterComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ClarityModule
  ],
  exports: [LanguageSelectorComponent, TranslateToPipe, FooterComponent]
})
export class SharedModule {
}
