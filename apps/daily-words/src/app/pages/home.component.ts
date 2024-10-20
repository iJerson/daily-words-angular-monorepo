import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EventBusService } from '@daily-words/services';
import { ButtonComponent, SearchFormComponent } from '@daily-words/ui';
import { Word, WordService } from '@daily-words/words';

@Component({
  selector: 'dw-home',
  standalone: true,
  imports: [CommonModule, SearchFormComponent, ButtonComponent],
  template: `
    <dw-search-form [searchEvent]="searchEvent" [formGroup]="searchForm" />

    <div
      class="word-definition-container"
      *ngIf="hasFoundWord(); else noDefinition"
    >
      <ng-container *ngFor="let word of words()">
        <h4>
          {{ word.word }}
          <dw-button type="icon" icon="volume_up" [event]="audioPlayEvent" />
        </h4>
        <p>{{ word.phonetic }}</p>
        <ng-container *ngFor="let meaning of word.meanings">
          <p>{{ meaning.partOfSpeech }}</p>
          <ul>
            <li *ngFor="let definition of meaning.definitions">
              {{ definition.definition }}
              <br />
              <span class="example" *ngIf="definition.example"
                >"{{ definition.example }}"</span
              >
            </li>
          </ul>
        </ng-container>
      </ng-container>
    </div>

    <ng-template #noDefinition>
      <div class="no-definition-container">
        <h4>No definition found</h4>
      </div>
    </ng-template>
  `,
  styles: `
    p {
      padding: 1rem 0 0 1rem;
      font-style: italic;
    }

    ul {
      padding-left: 5rem;
      .example {
        font-style: normal;
        color: #666;
      }
    }

    .no-definition-container {
      padding: 1rem;
      text-align: center;
    }

  `,
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  words = signal<Word[]>([]);
  hasFoundWord = computed(() => this.words().length > 0);
  searchEvent = 'search:clicked';
  audioPlayEvent = 'audio:play';

  eventBusService = inject(EventBusService);
  constructor(private wordService: WordService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: fb.control(''),
    });
  }

  ngOnInit(): void {
    this.eventBusService.on(this.searchEvent, () => {
      this.wordService.getWord(this.searchControl?.value).subscribe(
        (data) => {
          this.words.set(data);
        },
        (error) => {
          if (error.status === 404) {
            this.words.set([]);
          } else {
            console.error(error);
          }
        }
      );
    });

    this.eventBusService.on(this.audioPlayEvent, () => {
      this.playAudio(this.words()[0].phonetics[0].audio);
    });
  }

  playAudio(url: string) {
    const audio = new Audio(url);
    audio.play();
  }

  get searchControl() {
    return this.searchForm.get('search') as FormControl;
  }
}
