import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFieldDialogComponent } from './create-field-dialog.component';
import {ClarityModule} from '@clr/angular';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';

describe('CreateFieldDialogComponent', () => {
  let component: CreateFieldDialogComponent;
  let fixture: ComponentFixture<CreateFieldDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        RxReactiveFormsModule],
      declarations: [ CreateFieldDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFieldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
