import {Component, OnInit} from '@angular/core';
import {I18nService} from '@core/i18n.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {


  constructor(
    private i18nService: I18nService
  ) {
  }

  /**
   * Gets the current selected language
   */
  get currentLanguage(): string {
    return this.i18nService.language;
  }

  /**
   * Lists all available languages
   */
  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  ngOnInit(): void {
  }

  /**
   * Change the current app language
   * @param lang language code (example: de-DE)
   */
  public doChangeLanguage(lang: string) {
    console.log(`Language change to ${lang}`);
    // Attempting to change language
    this.i18nService.language = lang;
  }
}
