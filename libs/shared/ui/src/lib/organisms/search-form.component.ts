import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent, ButtonComponent } from '@daily-words/ui';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'dw-search-form',
  standalone: true,
  imports: [
    CommonModule,
    FormFieldComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="formGroup()">
      <div class="search-form-container">
        <dw-form-field
          name="search"
          label="Search"
          [control]="searchControl"
          placeholder="Type a word here"
        />
        <dw-button type="fab" icon="search" [event]="searchEvent()" />
      </div>
    </form>
  `,
  styles: `
    :host {
      display: block;
      
      .search-form-container {
        display: flex;
        flex-direction: row;
        padding: 1rem;

        dw-button {
          padding-top: 1rem;
        }

        dw-form-field {
          width: 100%;
        }
      }
    }
  `,
})
export class SearchFormComponent {
  searchEvent = input.required<string>();
  searchValueOutput = output<string>();
  formGroup = input<FormGroup>(new FormGroup({ search: new FormControl() }));

  get searchControl() {
    return this.formGroup().get('search') as FormControl;
  }
}
