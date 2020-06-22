import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {Config} from './config.model';
import {ConfigStore} from './config.store';

@Injectable({providedIn: 'root'})
export class ConfigService {

  private readonly KEY = 'sw6-theme-config';

  constructor(private configStore: ConfigStore) {
  }


  get() {
    const item = localStorage.getItem(this.KEY);
    if (item) {
      this.configStore.add(JSON.parse(item));
    }
  }

  save() {
    localStorage.setItem(this.KEY, JSON.stringify(this.configStore._value()));
  }

  update(id: ID, config: Partial<Config>) {
    this.configStore.update(id, config);
  }

  remove(id: ID) {
    this.configStore.remove(id);
    localStorage.removeItem(this.KEY);
  }

}
