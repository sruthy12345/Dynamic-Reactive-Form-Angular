import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { FormService } from '../form.service';

export interface jsonFormControls {
  name: string;
  label: string;
  value: any;
  type: string;
  validators: jsonFormValidators;
  options?: { label: string; value: any }[];
}
export interface jsonFormValidators {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  jsonData!: Array<jsonFormControls>;
  dynamicForm: FormGroup = this.fb.group({});
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private commonService: CommonService,
    private formService: FormService
  ) {}

  ngOnInit() {
    this.jsonData = this.commonService.controls;
    this.createDynamicReactiveForm(this.jsonData);
  }
  createDynamicReactiveForm(controls: Array<jsonFormControls>) {
    for (const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'required':
            validatorsToAdd.push(Validators.required);
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          default:
            break;
        }
      }
      this.dynamicForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }
  submitForm() {
    if (this.dynamicForm.invalid) {
      console.log('Form is invalid'); //show form is invalid
      return;
    }
    /* calling submit API here */
    this.formService.submitFormData(this.dynamicForm.value).subscribe(
      (res) => {
        if (!res) this.commonService.errorPopup('Error!...');
        this.commonService.successPopup('Form is submitted successfully!...');
      },
      (error) => {
        this.commonService.errorPopup('Error submitting form!...', error);
      }
    );
    this.resetForm();
  }
  resetForm() {
    this.dynamicForm.reset();
  }
}
