export interface HeadCell<T> {
  id: keyof T;
  label: string;
  type?: string;
  numeric?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  visibility: boolean;
  disablePadding?: boolean;
  element?: (row: T) => React.ReactNode;
}
