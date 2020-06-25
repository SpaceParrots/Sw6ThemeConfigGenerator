import {ConfigTab} from '@app/shared/classes/config-tab.model';
import {ConfigSection} from '@app/shared/classes/config-section.model';
import {ConfigField} from '@app/shared/classes/config-field.model';
import {ConfigBlock} from '@app/shared/classes/config-block.model';
import {prop, propArray} from '@rxweb/reactive-form-validators';

/**
 * Config class
 */
export class Config {
  @prop()
  name: string;

  @prop()
  author: string;

  @propArray(ConfigTab)
  tabs: ConfigTab[];

  @propArray(ConfigTab)
  blocks: ConfigBlock[];

  @propArray(ConfigSection)
  sections: ConfigSection[];

  @propArray(ConfigField)
  fields: ConfigField[];
}

/**
 * Initializes a config object state
 * @param params local storage object or empty object
 */
export function initConfig(params: Partial<Config> = {}): Config {
  return {
    name: params.name || 'A Theme',
    author: params.author || 'Sw6ThemeConfigGenerator',
    tabs: (params.tabs || []).map(value => new ConfigTab(value)),
    blocks: (params.blocks || []).map(value => new ConfigBlock(value)),
    sections: (params.sections || []).map(value => new ConfigSection(value)),
    fields: (params.fields || []).map(value => new ConfigField(value)),
  } as Config;
}

/**
 * Generates a theme.json file for a shopware 6 theme
 * @see https://docs.shopware.com/en/shopware-platform-dev-en/theme-guide/configuration#tabs-blocks-and-sections
 * @param config current config state
 */
export function generateConfigFormat(config: Config): any {
  const configObj = {
    name: config.name,
    author: config.author
  };

  // tslint:disable-next-line
  configObj['tabs'] = config.tabs.map(value => value.toConfigFormat()) // Transforms array to: [{"tabName":{}},{"tabName2":{}}]
    .reduce((result, item) => {
      console.log(result, item, Object.keys(item));
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});

  // tslint:disable-next-line
  configObj['sections'] = config.sections.map(value => value.toConfigFormat()) // Transforms array to: [{"sectionName":{}},{"sectionName2":{}}]
    .reduce((result, item) => {
      console.log(result, item, Object.keys(item));
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});

  // tslint:disable-next-line
  configObj['blocks'] = config.blocks.map(value => value.toConfigFormat()) // Transforms array to: [{"blockName":{}},{"blockName2":{}}]
    .reduce((result, item) => {
      console.log(result, item, Object.keys(item));
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});

  // tslint:disable-next-line
  configObj['fields'] = config.fields.map(value => value.toConfigFormat()) // Transforms array to: [{"fieldName":{}},{"fieldName2":{}}]
    .reduce((result, item) => {
      console.log(result, item, Object.keys(item));
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});

  return configObj;
}
