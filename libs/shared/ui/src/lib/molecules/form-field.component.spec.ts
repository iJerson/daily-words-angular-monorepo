import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  // let fixture: ComponentFixture<FormFieldComponent>;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [
        FormFieldComponent,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    // fixture = TestBed.createComponent(FormFieldComponent);
    // component = fixture.componentInstance;
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.children[0].componentInstance;
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display form field with label Search', () => {
    hostComponent.searchControl.setValue('Search');
    fixture.detectChanges();

    const formFieldElement =
      fixture.debugElement.nativeElement.querySelector('dw-form-field');
    expect(formFieldElement).not.toBeNull();
    expect(formFieldElement.textContent.trim()).toBe('Search');
  });
});

@Component({
  selector: 'dw-test-host-component',
  template: `<dw-form-field
    name="search"
    label="Search"
    [control]="searchControl"
    placeholder="Type a word here"
  />`,
})
class TestHostComponent {
  searchControl = new FormControl();
}
