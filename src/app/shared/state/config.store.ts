import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Config } from './config.model';

export interface ConfigState extends EntityState<Config> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Config' })
export class ConfigStore extends EntityStore<ConfigState> {

  constructor() {
    super();
  }

}
