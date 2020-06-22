import {Component, OnInit} from '@angular/core';
import {ConfigQuery} from '@app/shared/state/config.query';
import {ConfigService} from '@app/shared/state/config.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor(private configQuery: ConfigQuery,
              private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configQuery.select();
  }

}
