import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { EventBusService } from '@daily-words/services';

fdescribe('ButtonComponent', () => {
  let component: ButtonComponent;
  // let fixture: ComponentFixture<ButtonComponent>;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [ButtonComponent, MatButtonModule, MatIconModule],
      providers: [
        {
          provide: EventBusService,
          useValue: { on: jest.fn(), emit: jest.fn() },
        },
      ],
    }).compileComponents();

    // fixture = TestBed.createComponent(ButtonComponent);
    // component = fixture.componentInstance;
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.children[0].componentInstance;
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a type of basic', () => {
    hostComponent.setProperties('basic', 'Search');
    fixture.detectChanges();

    console.log(fixture.debugElement.nativeElement);
    const buttonElement = fixture.debugElement.query(By.css('dw-button'));
    expect(buttonElement).not.toBeNull();
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Search');
  });
});

@Component({
  selector: 'dw-test-host-component',
  template: `<dw-button
    [type]="type"
    [label]="label"
    [icon]="search"
    [event]="event()"
  />`,
})
class TestHostComponent {
  icon?: string;
  type = 'fab';
  label = 'Search';

  setProperties(type: string, label: string, icon?: string) {
    this.type = type;
    this.label = label;
    this.icon = icon;
  }

  event() {
    return 'search:clicked';
  }
}
