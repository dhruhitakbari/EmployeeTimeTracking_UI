import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicFormService } from './../../../services/dynamic-form.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormFieldConfig } from '../../../models/form/form-field.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'

})
export class DynamicFormComponent {

  @Input() form!: FormGroup;
  @Input() fields: FormFieldConfig[] = [];
  @Input() isLoading = false;
  @Output() formSubmit = new EventEmitter<any>();

  onSubmit(): void {
    debugger;
    if (this.form.valid) {
      this.formSubmit.emit(this.formSubmit);
    }
    else {
      this.form.markAllAsTouched(); // shows all validation Errors
    }
  }

  isInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }

  getError(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (control?.errors?.['required']) return `${fieldName} is required.`;
    if (control?.errors?.['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} characters required.`;
    if (control?.errors?.['maxlength']) return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed.`;
    if (control?.errors?.['email']) return `Enter a valid email.`;
    return '';
  }

}
