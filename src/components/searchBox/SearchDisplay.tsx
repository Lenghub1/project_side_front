import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import Search from "./Search";
import CP from "..";
import { Tooltip } from "@mui/material";

const SearchDisplay = ({ data }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleSearch = () => {
    setShowSearch((previous) => !previous);
  };

  const handleSearchClick = () => {
    console.log("Sending request to backend with search value:", searchValue);
  };

  const handleCancelClick = () => {
    setSearchValue("");
    setShowSearch(false);
  };

  return (
    <CP.Styled.Flex justify="flex-end" width="100%">
      {showSearch ? (
        <>
          <Search data={data} />
          <IconButton onClick={handleCancelClick}>
            <CancelIcon />
          </IconButton>
          <IconButton onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </>
      ) : (
        <Tooltip title="search">
          <IconButton onClick={toggleSearch}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}
    </CP.Styled.Flex>
  );
};

export default SearchDisplay;
