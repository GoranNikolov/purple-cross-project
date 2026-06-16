export type FieldType =
  | "text"
  | "select"
  | "date"
  | "number"
  | "textarea"
  | "checkbox";

export interface FieldConfig<T> {
  key: keyof T;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: readonly string[]; // for 'select'
  disabled?: boolean | ((mode: "create" | "edit") => boolean);
  optional?: boolean;
}

export interface FormConfig<T> {
  fields: FieldConfig<T>[];
}
