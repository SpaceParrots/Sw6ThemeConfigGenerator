import {Component, OnInit} from '@angular/core';
import {ConfigService} from '@app/shared/state/config.service';
import {Observable} from 'rxjs';
import {Config} from '@app/shared/state/config.model';
import {ConfigTab} from '@app/shared/classes/config-tab.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  $config: Observable<Config>;

  constructor(private configService: ConfigService) {
    this.$config = configService.get();
  }

  ngOnInit(): void {
  }

  doAddTab(config: Config) {
    config.tabs.push(new ConfigTab('New Tab'));
    this.configService.update(config);
  }
}
