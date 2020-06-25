import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormArray, FormGroup} from '@angular/forms';
import {ConfigField, IConfigField} from '@app/shared/classes/config-field.model';
import {Config} from '@app/shared/state/config.model';
import {ConfigService} from '@app/shared/state/config.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-field-dialog',
  templateUrl: './create-field-dialog.component.html',
  styleUrls: ['./create-field-dialog.component.scss']
})
export class CreateFieldDialogComponent implements OnInit {

  public form: FormGroup;
  public $config: Observable<Config>;
  @Output()
  public submit: EventEmitter<ConfigField> = new EventEmitter<ConfigField>();
  private editingField: ConfigField;

  constructor(private formBuilder: RxFormBuilder,
              private configService: ConfigService) {

  }

  get label(): FormArray {
    return this.form.get('label') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.formGroup(ConfigField);
    this.$config = this.configService.get();
  }

  doEdit(field: ConfigField) {
    this.editingField = field;
    console.log(field);
    this.form.setValue(field);
  }

  doSubmit(config: Config) {
    if (this.form.untouched || this.form.invalid) {
      return;
    }

    const value = this.form.getRawValue() as IConfigField;
    const field = new ConfigField(value);

    if (!!field.tab) {
      const configTab = config.tabs.find(tab => tab.name === field.tab);
      if (!!configTab) {
        field.setTab(configTab);
      }
    }

    if (!!field.section) {
      const configSection = config.sections.find(section => section.name === field.section);
      if (!!configSection) {
        field.setSection(configSection);
      }
    }

    if (!!field.block) {
      const configBlock = config.blocks.find(block => block.name === field.block);
      if (!!configBlock) {
        field.setBlock(configBlock);
      }
    }

    if (this.editingField) {
      Object.assign(this.editingField, field);
      /*this.editingField.name = field.name;*/
      this.editingField = null;
    }

    this.submit.emit(field);
    this.form.reset();
  }

}
