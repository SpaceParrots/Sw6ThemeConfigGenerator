import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Config} from '@app/shared/state/config.model';
import {ConfigService} from '@app/shared/state/config.service';
import {ConfigSection} from '@app/shared/classes/config-section.model';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  public $config: Observable<Config>;

  constructor(private configService: ConfigService) {
    this.$config = configService.get();
  }


  ngOnInit(): void {
  }

  doAddSection(config: Config) {
    config.sections.push(new ConfigSection({name: `Section #${config.sections.length + 1}`}));
    this.configService.update(config);
  }

  doSaveChanges(config: Config) {
    this.configService.update(config);
  }

  doRemove(config: Config, index: number) {
    // TODO: Detect fields that are affected
    config.sections.splice(index, 1);
    this.configService.update(config);
  }
}
