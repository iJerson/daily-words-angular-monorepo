import { MetaData } from './metadata.model';

export interface EventBus {
  key: string;
  metaData?: MetaData<unknown>;
}
