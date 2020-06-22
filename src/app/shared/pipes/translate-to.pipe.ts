import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {Logger} from '@core/logger.service';
import {I18nService} from '@core/i18n.service';

const log = new Logger('TranslateToPipe');

@Pipe({
  name: 'translateTo'
})
export class TranslateToPipe implements PipeTransform {

  constructor(private translateService: TranslateService,
              private i18nService: I18nService) {

  }

  transform(value: string, language: string): any {
    if (!value) {
      log.error('Value is null');
      return '';
    }

    // If no language was defined, take the current selected language
    if (!language) {
      language = this.i18nService.language;
    }

    // Return the translation for given key
    return this.getTranslation(value, language);
  }

  /**
   * Gets a translation for a given key and language
   * @param key value that should be translated
   * @param language target
   */
  public getTranslation(key: string, language: string): string {
    const embeddedTranslation = this.i18nService.getEmbeddedTranslation(language);
    if(embeddedTranslation){
      return this.translateService.getParsedResult(embeddedTranslation, key);
    } else {
      return 'NO_TRANSLATION_FOUND';
    }
  }
}
