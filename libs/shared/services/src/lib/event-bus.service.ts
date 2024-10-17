import { effect, Injectable, Injector, signal, untracked } from '@angular/core';
import { EventBus } from './models/event-bus.model';
import { MetaData } from './models/metadata.model';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private eventBus = signal<EventBus>({
    key: '',
    metaData: {
      data: null,
      timestamp: 0,
    },
  });

  constructor(private injector: Injector) {}

  emit(key: string, data?: unknown): void {
    if (!key) {
      throw new Error('EventBusService: Key is required');
    }

    this.eventBus.set({
      key,
      metaData: {
        data,
        timestamp: Date.now(),
      },
    });
  }

  on<T>(key: string, callback: (data: MetaData<T>) => void): void {
    effect(
      () => {
        const eventBus = this.eventBus();
        if (this.keyMatched(key, eventBus)) {
          untracked(() => callback(eventBus.metaData as MetaData<T>));
        }
      },
      { injector: this.injector }
    );
  }

  private keyMatched(key: string, eventBus: EventBus): boolean {
    // matched specific key
    if (eventBus.key === key) return true;

    // matched for all keys
    if (eventBus.key === '*') return true;

    // matched for prefix
    if (eventBus.key.includes(':')) {
      const [prefix, suffix] = eventBus.key.split(':');

      if (suffix === '*' && key.startsWith(prefix)) return true;
      if (key.startsWith(prefix) && key.endsWith(suffix)) return true;
    }

    return false;
  }
}
