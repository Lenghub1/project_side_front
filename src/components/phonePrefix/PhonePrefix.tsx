import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import countries from "./countries.json";

type PhonePrefixProps = {
  selectedCountry: { name: string; dialCode: string; flag: string };
  setSelectedCountry: Function;
};

export default function PhonePrefix({
  selectedCountry,
  setSelectedCountry,
}: PhonePrefixProps) {
  return (
    <Autocomplete
      options={countries}
      value={selectedCountry}
      getOptionLabel={(option) => option.dialCode}
      // fullWidth
      onChange={(event, newValue) => {
        // safeguard against null newValue
        if (newValue) {
          setSelectedCountry(newValue);
        }
      }}
      disableClearable
      renderOption={(props, option) => (
        <li {...props}>
          {option.flag} {option.dialCode}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          color="info"
          fullWidth
          label="Prefix"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {selectedCountry.flag}
              </InputAdornment>
            ),
          }}
          style={{ minWidth: "8rem" }}
        />
      )}
    />
  );
}
