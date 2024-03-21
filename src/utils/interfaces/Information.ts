type Data = { [key: string]: string | Data };

export interface InformationProvider {
  data: Data;
  direction?: string;
  fullwidth?: boolean;
}

export { type Data };
