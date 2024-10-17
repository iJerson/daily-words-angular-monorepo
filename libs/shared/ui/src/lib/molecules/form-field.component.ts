import { CommonModule } from '@angular/common';
import { Component, input, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatFormFieldAppearance,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export const NOOP_VALUE_ACCESSOR: ControlValueAccessor = {
  writeValue(): void {},
  registerOnChange(): void {},
  registerOnTouched(): void {},
};

@Component({
  selector: 'dw-form-field',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  template: `
    <mat-form-field [appearance]="appearance()">
      <mat-label>{{ label() }}</mat-label>
      <input
        matInput
        [placeholder]="placeholder()"
        [formControl]="control()"
        [name]="name()"
      />
      @if (icon()) {
      <mat-icon matSuffix>{{ icon() }}</mat-icon>
      }
      <mat-hint>{{ hint() }}</mat-hint>
    </mat-form-field>
  `,
  styles: `
    :host {
      display: block;
      padding: 1rem;      

      mat-form-field {
        width: 100%;
      }
    }
  `,
})
export class FormFieldComponent {
  // Required inputs
  control = input.required<FormControl>();
  name = input.required<string>();

  // Optional inputs
  appearance = input<FormFieldAppearance>('outline');
  label = input<string>('');
  placeholder = input<string>('');
  hint = input<string>('');
  icon = input<string>('');

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = NOOP_VALUE_ACCESSOR;
    }
  }
}

type FormFieldAppearance = MatFormFieldAppearance;
