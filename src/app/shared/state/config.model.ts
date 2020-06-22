import {ConfigTab} from '@app/shared/classes/config-tab.model';
import {ConfigSection} from '@app/shared/classes/config-section.model';

export interface Config {
  id: number | string;
  name: string;
  author: string;
  tabs: ConfigTab[];
  sections: ConfigSection[];
}

export function createConfig(params: Partial<Config>) {
  return {

  } as Config;
}
