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

  public $config: Observable<Config>;
  public editingTab: string;

  constructor(private configService: ConfigService) {
    this.$config = configService.get();
  }

  get isEditing(): boolean {
    return this.editingTab != null;
  }

  ngOnInit(): void {
  }

  doAddTab(config: Config) {
    config.tabs.push(new ConfigTab({name: `Tab #${config.tabs.length + 1}`}));
    this.configService.update(config);
  }

  doSaveChanges(config: Config) {
    this.configService.update(config);
  }


  /**
   * Toggle editing of a tab
   * @param tab to edit
   */
  doEditTab(tab: ConfigTab) {

    // disable if clicked again
    if (this.editingTab != null && this.editingTab === tab.id) {
      this.editingTab = null;
    } else {
      this.editingTab = tab.id;
    }

  }
}
