import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "../../DialogStyles/Search.css";
import SearchDropdown from "../SearchDropdown";
import FolderIcon from "@mui/icons-material/Folder";
import LabelIcon from "@mui/icons-material/Label";
import { BrightcoveFolder } from "../../../types";

type Proptype = {
  folders: BrightcoveFolder[];
  searchInput: string;
  folderType: string;
  tagType: string;
  setFolder: React.Dispatch<React.SetStateAction<BrightcoveFolder | null>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setFolderType: React.Dispatch<React.SetStateAction<string>>;
  setTagType: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({
  folders,
  tagType,
  folderType,
  searchInput,
  setSearchInput,
  setCurrentPage,
  setFolderType,
  setTagType,
  setFolder,
}: Proptype) => {
  const [openFolderDrawer, setOpenFolderDrawer] = useState<boolean>(false);
  const [openTagDrawer, setOpenTagDrawer] = useState<boolean>(false);

  const handleChange = (event: any) => {
    setSearchInput(event.currentTarget.value.replace(/[^a-zA-Z0-9\s]/g, ""));
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
            onChange={handleChange}
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
        {/* <div
          className="searchTagDropdownFlex"
          onClick={() => setOpenTagDrawer(true)}
        >
          <div>
            <LabelIcon />
          </div>
          <div
            style={{
              paddingLeft: "6px",
              fontFamily: "Arial",
              fontSize: "13px",
            }}
          >
            {tagType}
          </div>
          <div style={{ paddingTop: "4px" }}>
            {openTagDrawer ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </div>
        </div> */}
      </div>
      <SearchDropdown
        openFolderDrawer={openFolderDrawer}
        openTagDrawer={openTagDrawer}
        folders={folders}
        setFolder={setFolder}
        setTagType={setTagType}
        setFolderType={setFolderType}
        setCurrentPage={setCurrentPage}
        setOpenTagDrawer={setOpenTagDrawer}
        setOpenFolderDrawer={setOpenFolderDrawer}
      />
    </div>
  );
};

export default Search;
