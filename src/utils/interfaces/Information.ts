type Data = { [key: string]: string | Data };

interface InformationProvider {
  data: Data;
  direction?: string;
  fullwidth?: boolean;
}

export { type Data, type InformationProvider };
