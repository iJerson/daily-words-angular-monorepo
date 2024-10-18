import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SearchFormComponent, ButtonComponent } from '@daily-words/ui';
import { FormBuilder } from '@angular/forms';
import { EventBusService } from '@daily-words/services';
import { WordService } from '@daily-words/words';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        SearchFormComponent,
        ButtonComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: EventBusService,
          useValue: { on: jest.fn(), emit: jest.fn() },
        },
        {
          provide: WordService,
          useValue: { search: jest.fn() },
        },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
