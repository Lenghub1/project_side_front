export interface HeadCell<T> {
  id: keyof T;
  label: string;
  type?: string;
  numeric?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  visibility: boolean;
  disablePadding?: boolean;
  element?: React.ComponentType<{
    row: T;
    onActionCallback?: (data: any, error: any) => void;
  }>;
}
