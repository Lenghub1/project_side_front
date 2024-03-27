import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import Search from "./Search";
import CP from "..";

const SearchDisplay = ({ data }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchValue("");
    }
  };

  const handleSearchClick = () => {
    if (searchValue.trim() !== "") {
      console.log("Sending request to backend with search value:", searchValue);
    }
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleCancelClick = () => {
    setSearchValue("");
  };

  return (
    <CP.Styled.Flex justify="flex-end">
      {showSearch ? (
        <>
          <Search data={data} />
          <CancelIcon onClick={handleCancelClick} />
        </>
      ) : (
        <SearchIcon onClick={toggleSearch} />
      )}
      {showSearch && (
        <SearchIcon onClick={handleSearchClick} style={{ marginLeft: "8px" }} />
      )}
    </CP.Styled.Flex>
  );
};

export default SearchDisplay;
