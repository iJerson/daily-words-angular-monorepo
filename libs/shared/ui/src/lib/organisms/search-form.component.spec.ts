import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFormComponent } from './search-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../atoms/button.component';
import { FormFieldComponent } from '../molecules/form-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  // let fixture: ComponentFixture<SearchFormComponent>;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [
        SearchFormComponent,
        FormFieldComponent,
        ButtonComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    // fixture = TestBed.createComponent(SearchFormComponent);
    // component = fixture.componentInstance;
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.children[0].componentInstance;
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display search component', () => {
    hostComponent.searchForm.get('search')?.setValue('Search');
    fixture.detectChanges();

    const formFieldElement =
      fixture.debugElement.nativeElement.querySelector('dw-form-field');
    expect(formFieldElement).not.toBeNull();
    expect(formFieldElement.textContent.trim()).toBe('Search');
  });
});

@Component({
  selector: 'dw-test-host-component',
  template: `
    <dw-search-form [searchEvent]="searchEvent" [formGroup]="searchForm" />
  `,
})
class TestHostComponent {
  searchForm!: FormGroup;
  searchEvent = 'search:clicked';

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: fb.control(''),
    });
  }
}
