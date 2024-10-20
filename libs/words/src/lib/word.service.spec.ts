import { TestBed } from '@angular/core/testing';

import { WordService } from './word.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { APP_CONFIG } from '@daily-words/app-config';

describe('WordService', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: APP_CONFIG,
          useValue: {
            dictionaryApiUrl: 'https://api.dictionary.com',
          },
        },
      ],
    });
    service = TestBed.inject(WordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
