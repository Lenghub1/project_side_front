import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import { useRecoilState } from "recoil";
import { employeeFeatureData } from "@/store/employee";
interface Option {
  name: string;
}

interface SearchProps {
  data: Option[];
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  onSearchChange?: (filteredOptions: Option[], searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({
  data,
  renderInput,
  onSearchChange,
}) => {
  const [employeeFeature, setEmployeeFeature] =
    useRecoilState(employeeFeatureData);

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [labelVisible, setLabelVisible] = React.useState<boolean>(true);

  const filteredOptions = data.filter((option: Option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  React.useEffect(() => {
    onSearchChange &&
      onSearchChange(
        data.filter((option: Option) =>
          option.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        searchTerm
      );
  }, [data, searchTerm, onSearchChange]);
  const handleInputClick = () => {
    setLabelVisible(false);
  };
  return (
    <Autocomplete
      fullWidth
      freeSolo
      disableClearable
      options={filteredOptions.map((option: Option) => option.name)}
      renderInput={(params) =>
        renderInput ? (
          renderInput(params)
        ) : (
          <TextField
            {...params}
            label={labelVisible ? "Search input" : ""}
            InputProps={{
              ...params.InputProps,
              type: "search",
              onClick: handleInputClick,
            }}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        )
      }
    />
  );
};

export default Search;
