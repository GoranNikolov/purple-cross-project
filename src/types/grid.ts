export interface GridColumn<T> {
  key: keyof T | "actions";
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  formatter?: (row: T) => string;
  component?: string; // name of a registered component to render in this cell, e.g. 'RowActions'
}

export type PaginationMode = "paged" | "infinite" | "none";

export interface PaginationConfig {
  mode: PaginationMode;
  pageSize: number;
}

export interface GridConfig<T> {
  columns: GridColumn<T>[];
  rowKey: keyof T; // unique identifier field, e.g. 'code'
  pagination?: PaginationConfig; // omit or { mode: 'none' } for no pagination
}
