export interface Filter {
  field: string;
  logicalClause: string;
  values?: string[];
  targetValue?: string;
}

export interface Sort {
  field: string;
  direction: "asc" | "desc";
}
