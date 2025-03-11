import type { JSXElement } from "solid-js";

export enum ListTypeEnum {
  list = "list",
  table = "table",
}

export type TListTypeString = "list" | "table";

export type TList = TListTypeString | ListTypeEnum;

export interface IListColumnValue {
  id?: string | number;
  value: string | number | JSXElement;
  key: string | number;
}

export interface IListItemContent {
  id: string;
  columnValues: IListColumnValue[];
}

export interface ISummaryHeaderTexts {
  beginning: string;
  middle: string;
  ending: string;
}

export interface ISortValues {
  sortColumn: number;
  sortOrder: -1 | 0 | 1;
}
