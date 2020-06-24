import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Config} from '@app/shared/state/config.model';
import {ConfigService} from '@app/shared/state/config.service';
import {ConfigField} from '@app/shared/classes/config-field.model';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {
  public createFieldModal: boolean;
  public $config: Observable<Config>;

  constructor(private configService: ConfigService) {
    this.$config = configService.get();
  }

  ngOnInit(): void {
  }

  doCloseModal() {
    this.createFieldModal = false;
  }

  doCreateField(field: ConfigField, config: Config) {
    config.fields.push(field);
    this.configService.update(config);
    this.doCloseModal();
  }

  doOpenModal() {
    this.createFieldModal = true;
  }
}
