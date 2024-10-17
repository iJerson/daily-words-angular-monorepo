import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, EnvironmentModel } from '@daily-words/app-config';
import { Word } from './models/word.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: EnvironmentModel,
    private http: HttpClient
  ) {}

  getWord(word: string): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.appConfig.dictionaryApiUrl}${word}`);
  }
}
