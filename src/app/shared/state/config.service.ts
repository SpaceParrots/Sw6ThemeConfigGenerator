import {Injectable} from '@angular/core';
import {Config, generateConfigFormat, initConfig} from './config.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Logger} from '@core/logger.service';

const log = new Logger('ConfigService');

@Injectable({providedIn: 'root'})
export class ConfigService {

  private readonly KEY = 'sw6-theme-config';
  private readonly $config: BehaviorSubject<Config>;

  constructor() {
    // initial state
    this.$config = new BehaviorSubject(initConfig());
    this.load();
  }

  get(): Observable<Config> {
    return this.$config.asObservable();
  }

  getValue(): Config {
    return this.$config.getValue();
  }

  load() {
    const item = localStorage.getItem(this.KEY);
    if (item) {
      log.info('Found config in local storage');
      this.$config.next(initConfig(JSON.parse(item)));
    }
  }

  save() {
    localStorage.setItem(this.KEY, JSON.stringify(this.$config.getValue()));
    log.info('Saved config to local storage');
  }

  update(config: Config) {
    this.$config.next(config);
    this.save();
  }

  clear() {
    this.$config.next(initConfig());
    localStorage.removeItem(this.KEY);
  }

  generateConfig() {
    const config = this.$config.getValue();
    if (config) {
      this.downloadByHtmlTag({
        fileName: 'theme.json',
        text: JSON.stringify(generateConfigFormat(config), null, 2)
      });
    }

  }


  private downloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {

    const element = document.createElement('a');
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);
    element.dispatchEvent(new MouseEvent('click'));
  }
}
