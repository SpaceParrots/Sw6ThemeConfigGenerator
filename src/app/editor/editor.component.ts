import {Component, OnInit} from '@angular/core';
import {ConfigModel} from '@app/shared/classes/config.model';
import {ConfigTab} from '@app/shared/classes/config-tab.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public config: ConfigModel;

  constructor() {
    this.config = new ConfigModel();
    this.config.tabs.push(new ConfigTab('default'));
  }

  ngOnInit(): void {

  }

  doAddTab() {
    this.config.tabs.push(new ConfigTab('New Tab'));
  }
}
