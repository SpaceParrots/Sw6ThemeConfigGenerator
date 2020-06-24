import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Config} from '@app/shared/state/config.model';
import {ConfigService} from '@app/shared/state/config.service';
import {ConfigSection} from '@app/shared/classes/config-section.model';
import {ConfigBlock} from '@app/shared/classes/config-block.model';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  public $config: Observable<Config>;


  constructor(private configService: ConfigService) {
    this.$config = configService.get();
  }


  ngOnInit(): void {
  }

  doAddBlock(config: Config) {
    config.blocks.push(new ConfigBlock({name: `Block #${config.blocks.length + 1}`}));
    this.configService.update(config);
  }

  doSaveChanges(config: Config) {
    this.configService.update(config);
  }

}
