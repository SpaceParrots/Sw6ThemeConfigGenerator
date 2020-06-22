import {ConfigTab} from '@app/editor/classes/config-tab.model';

export class ConfigModel {
  tabs: ConfigTab[];


  constructor(tabs: ConfigTab[] = []) {
    this.tabs = tabs;
  }

  /**
   * Builds a theme config entry
   * @return label config format: `${name}: { ${label}.toMap() }`
   */
  public toConfig(): any {
    const object = {};

    const tabs = this.tabs
      .map(value => value.toConfig()) // Transforms array to: [{"tabName": {...}},{"tabName2":{...}}]
      .reduce((result, item) => {
        const key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});

    Object.defineProperty(object, 'tabs', tabs);

    return object;
  }
}
