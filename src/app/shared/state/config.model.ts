import {ConfigTab} from '@app/shared/classes/config-tab.model';

export interface Config {
  name: string;
  author: string;
  tabs: ConfigTab[];
}

export function createConfig(params: Partial<Config> = {}): Config {
  return {
    name: params.name || 'A Theme',
    author: params.author || 'Sw6ThemeConfigGenerator',
    tabs: params.tabs || new Array<ConfigTab>()
  } as Config;
}
