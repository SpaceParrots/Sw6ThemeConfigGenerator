import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationItem} from '@core/classes/NavigationItem';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {I18nService} from '@core/i18n.service';
import {environment} from '@env/environment';
import {Logger} from '@core/logger.service';
import {merge} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {untilDestroyed} from '@core/until-destroyed';
import {ConfigService} from '@app/shared/state/config.service';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Sw6ThemeConfigGenerator';

  navigation: NavigationItem[] = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private translateService: TranslateService,
              private i18nService: I18nService,
              private configService: ConfigService) {
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');


    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data),
        untilDestroyed(this)
      )
      .subscribe((event: any) => {
        const title = event.title;
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }

  doReset() {
    this.configService.clear();
  }

  doDownload() {
    this.configService.generateConfig();
  }
}
