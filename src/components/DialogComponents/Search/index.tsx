import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "../../DialogStyles/Search.css";
import SearchDropdown from "../SearchDropdown";
import FolderIcon from "@mui/icons-material/Folder";
import LabelIcon from "@mui/icons-material/Label";
import { BrightcoveFolder } from "../../../types";
import CloseIcon from "@mui/icons-material/Close";

type Proptype = {
  folders: BrightcoveFolder[];
  searchInputTag: string;
  searchInput: string;
  folderType: string;
  setFolder: React.Dispatch<React.SetStateAction<BrightcoveFolder | null>>;
  setSelectedSortAscDesc: React.Dispatch<React.SetStateAction<string>>;
  setSearchInputTag: React.Dispatch<React.SetStateAction<string>>;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setFolderType: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({
  folders,
  folderType,
  searchInput,
  searchInputTag,
  setSelectedSortAscDesc,
  setSearchInputTag,
  setSortDirection,
  setSelectedSort,
  setSearchInput,
  setCurrentPage,
  setFolderType,
  setFolder,
}: Proptype) => {
  const [openFolderDrawer, setOpenFolderDrawer] = useState<boolean>(false);

  const handleSearchChange = (event: any) => {
    setSearchInput(event.currentTarget.value.replace(/[^a-zA-Z0-9\s]/g, ""));
    setCurrentPage(0);
  };

  const handleTagChange = (event: any) => {
    setSearchInputTag(event.currentTarget.value.replace(/[^a-zA-Z0-9\s]/g, ""));
    setCurrentPage(0);
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
            onChange={handleSearchChange}
          />
        </div>
        <div
          className="searchFolderDropdownFlex"
          onClick={() => setOpenFolderDrawer(true)}
        >
          <div style={{ paddingTop: "4px" }}>
            <FolderIcon />
          </div>
          <div
            style={{
              paddingLeft: "6px",
              fontFamily: "Tahoma",
              fontSize: "13px",
            }}
          >
            {folderType}
          </div>
          <div style={{ paddingTop: "5px" }}>
            {openFolderDrawer ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </div>
        </div>
      </div>
      <div className="searchContainer">
        <div className="searchIconTag">
          <LabelIcon />
        </div>
        <div>
          <input
            className={
              searchInputTag === ""
                ? "searchInputTag"
                : "searchInputTagWithClose"
            }
            placeholder="Search by tags"
            type="text"
            value={searchInputTag}
            onChange={handleTagChange}
          />
        </div>
        {searchInputTag !== "" ? (
          <div className="searchTagCloseIcon">
            <CloseIcon onClick={() => setSearchInputTag("")} />
          </div>
        ) : null}
      </div>
      <SearchDropdown
        folders={folders}
        setFolder={setFolder}
        setFolderType={setFolderType}
        setCurrentPage={setCurrentPage}
        setSelectedSort={setSelectedSort}
        setSortDirection={setSortDirection}
        openFolderDrawer={openFolderDrawer}
        setOpenFolderDrawer={setOpenFolderDrawer}
        setSelectedSortAscDesc={setSelectedSortAscDesc}
      />
    </div>
  );
};

export default Search;
