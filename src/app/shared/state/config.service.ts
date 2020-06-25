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

  /**
   * Get the Observable of the config
   * @return config observable
   */
  public get(): Observable<Config> {
    return this.$config.asObservable();
  }

  /**
   * Gets the current config
   * @return current config
   */
  public getValue(): Config {
    return this.$config.getValue();
  }

  /**
   * Imports a config from a already existing theme.json file
   * @deprecated This method is not implemented yet!
   */
  public import(): void {
    // TODO import from an existing theme.json file
  }

  /**
   * Loads the current config from local storage
   */
  public load(): void {
    const item = localStorage.getItem(this.KEY);
    if (item) {
      log.info('Found config in local storage');
      this.$config.next(initConfig(JSON.parse(item)));
    }
  }

  /**
   * Saves the current config to local storage
   */
  public save(): void {
    localStorage.setItem(this.KEY, JSON.stringify(this.$config.getValue()));
    log.info('Saved config to local storage');
  }

  /**
   * Updates the current config
   * @param config next config state
   */
  public update(config: Config): void {
    this.$config.next(config);
    this.save();
  }

  /**
   * Clears the local storage and resets the
   * config state
   */
  public clear(): void {
    this.$config.next(initConfig());
    localStorage.removeItem(this.KEY);
  }

  /**
   * Generates a theme.json file from the current
   * config state
   */
  public generateConfig(): void {
    const config = this.$config.getValue();
    if (config) {
      this.downloadByHtmlTag({
        fileName: 'theme.json',
        text: JSON.stringify(generateConfigFormat(config), null, 2)
      });
    }

  }

  /**
   * Creates an anchor tag to simulate a download
   * @param arg filename and text to download a file
   */
  private downloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {

    const element = document.createElement('a');
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);
    element.dispatchEvent(new MouseEvent('click'));

    // TODO: maybe remove the element from document again
  }
}
