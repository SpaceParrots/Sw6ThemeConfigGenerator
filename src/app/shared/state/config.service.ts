import {Injectable} from '@angular/core';
import {Config, createConfig} from './config.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Logger} from '@core/logger.service';

const log = new Logger('ConfigService');

@Injectable({providedIn: 'root'})
export class ConfigService {

  private readonly KEY = 'sw6-theme-config';
  private readonly $config: BehaviorSubject<Config>;

  constructor() {
    // initial state
    this.$config = new BehaviorSubject(createConfig());
    this.load();
  }

  get(): Observable<Config> {
    return this.$config.asObservable();
  }

  load() {
    const item = localStorage.getItem(this.KEY);
    if (item) {
      log.info('Found config in local storage');
      this.$config.next(createConfig(JSON.parse(item)));
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
    this.$config.next(createConfig());
    localStorage.removeItem(this.KEY);
  }
}
