import {ConfigTab} from '@app/shared/classes/config-tab.model';
import {ConfigSection} from '@app/shared/classes/config-section.model';


export class ConfigModel {
  name: string;
  author: string;
  tabs: ConfigTab[];
  sections: ConfigSection[];


  constructor(tabs: ConfigTab[] = [], sections: ConfigSection[] = []) {
    this.name = 'A Theme';
    this.author = 'Sw6ThemeConfigGenerator';
    this.tabs = tabs;
    this.sections = sections;
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

    const sections = this.sections
      .map(value => value.toConfig()) // Transforms array to: [{"tabName": {...}},{"tabName2":{...}}]
      .reduce((result, item) => {
        const key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});

    Object.defineProperty(object, 'tabs', tabs);
    Object.defineProperty(object, 'sections', sections);

    return object;
  }
}
