import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFieldConfig } from '../models/form/form-field.model';

@Injectable({ providedIn: 'root' })
export class DynamicFormService {
  constructor(private fb: FormBuilder) { }

  // make the array of fields in keyValue pair and then push into the formGroup
  buildForm(fields: FormFieldConfig[]): FormGroup {
    const group: Record<string, any> = {};
    fields.forEach(field => {
      const validators = [];

      if (field.required) validators.push(Validators.required);
      if (field.minLength) validators.push(Validators.minLength(field.minLength));
      if (field.maxLength) validators.push(Validators.minLength(field.maxLength));
      if (field.type == 'email') validators.push(Validators.email);

      group[field.name] = [field.defaultValue ?? '', validators];
    })

    return this.fb.group(group);
  }


  // Patch existing data into form (for Edit mode)
  patchValue(form: FormGroup, data: any): void {
    debugger;
    form.patchValue(data);
  }

}
