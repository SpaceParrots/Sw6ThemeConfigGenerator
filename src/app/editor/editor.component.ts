import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Config} from '@app/shared/state/config.model';
import {ConfigService} from '@app/shared/state/config.service';
import {ConfigTab} from '@app/shared/classes/config-tab.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  public $config: Observable<Config>;

  constructor(private configService: ConfigService) {
    this.$config = configService.get();
  }

  ngOnInit(): void {

  }

  doAddTab(config: Config) {
    config.tabs.push(new ConfigTab({name: `Tab #${config.tabs.length + 1}`}));
  }

  ngOnDestroy(): void {

  }

  doSaveChanges(config: Config) {
    this.configService.update(config);
  }
}
