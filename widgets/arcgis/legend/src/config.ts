import {ImmutableObject} from 'jimu-core';

export interface Config{
  showBaseMap?: boolean;
  cardStyle?: boolean;
  cardLayout?: 'auto' | 'side-by-side' | 'stack';
}

export type IMConfig = ImmutableObject<Config>;
