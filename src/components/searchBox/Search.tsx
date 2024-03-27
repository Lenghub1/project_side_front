import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";

interface Option {
  name: string;
}

interface SearchProps {
  data: Option[];
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

const Search: React.FC<SearchProps> = ({ data, renderInput }) => {
  return (
    <Autocomplete
      fullWidth
      freeSolo
      disableClearable
      options={data.map((option: Option) => option.name)}
      renderInput={(params) =>
        renderInput ? (
          renderInput(params)
        ) : (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )
      }
    />
  );
};

export default Search;
