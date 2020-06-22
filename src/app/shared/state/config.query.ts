import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ConfigStore, ConfigState } from './config.store';

@Injectable({ providedIn: 'root' })
export class ConfigQuery extends QueryEntity<ConfigState> {

  constructor(protected store: ConfigStore) {
    super(store);
  }

}
