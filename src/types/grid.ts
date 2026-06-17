import type { Component } from "vue";

export interface GridColumn<T> {
  key: keyof T | "actions";
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
  formatter?: (row: T) => string;
  component?: Component;
  componentProps?: (row: T) => Record<string, unknown>;
}

export type PaginationMode = "paged" | "infinite" | "none";

export interface PaginationConfig {
  mode: PaginationMode;
  pageSize: number;
}

export interface GridConfig<T> {
  columns: GridColumn<T>[];
  rowKey: keyof T;
  pagination?: PaginationConfig;
  enableGrouping?: boolean;
}
