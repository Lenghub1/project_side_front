interface FilterSelection {
  key: string;
  option: string;
  values: string[];
}

interface Filter {
  field: string;
  logicalClause: string;
  targetValue: string;
}

interface Sort {
  field: string;
  direction: "asc" | "desc";
}

export { type Sort, type Filter, type FilterSelection };
