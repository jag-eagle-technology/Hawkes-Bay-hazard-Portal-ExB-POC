import {ImmutableObject} from 'jimu-core';
import {IMJimuMapConfig} from 'jimu-ui/advanced/map';

export interface Config extends IMJimuMapConfig{
  isUseCustomMapState: boolean;
}

export type IMConfig = ImmutableObject<Config>;

export type ToolConfig = { [key: string]: boolean }