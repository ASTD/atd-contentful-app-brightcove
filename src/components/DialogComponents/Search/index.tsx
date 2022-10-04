import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "../../DialogStyles/Search.css";
import SearchDropdown from "../SearchDropdown";

const Search = () => {
  const [folderType, setFolderType] = useState("All Folders");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChange = (event: any) => {
    setSearchInput(event.currentTarget.value.replace(/[^a-zA-Z0-9\s]/g, ""));
  };

  return (
    <div>
      <div className="searchContainer">
        <div className="searchIcon">
          <SearchIcon />
        </div>
        <div>
          <input
            className="searchInput"
            placeholder="Search videos"
            type="text"
            value={searchInput}
            onChange={handleChange}
          />
        </div>
        <div className="searchDropdownFlex" onClick={() => setOpenDrawer(true)}>
          <div
            style={{
              paddingLeft: "6px",
              fontFamily: "Arial",
              fontSize: "13px",
            }}
          >
            {folderType}
          </div>
          <div>&nbsp;</div>
          <div style={{ paddingTop: "4px" }}>
            {openDrawer ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </div>
        </div>
      </div>
      <SearchDropdown openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </div>
  );
};

export default Search;
