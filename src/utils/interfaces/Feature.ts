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

export interface APIFeature {
  filters?: Filter[];
  sorts?: Sort[];
  perPage?: number;
  page?: number;
}

export interface APIFeatureLocation {
  apiFeature: APIFeature;
  route?: string;
  url?: string;
}
