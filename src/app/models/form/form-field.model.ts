export type FieldType = 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date' | 'checkbox';

export interface FormFieldConfig {
  name: string;
  type: FieldType;
  label: string;
  placeholder? : string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: {label: string; value: any}[];
  defaultValue?: any;
}
