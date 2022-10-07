import React from "react";
import { BrightcoveFolder } from "../../../types";
import "../../DialogStyles/Search.css";

type PropType = {
  setFolder: React.Dispatch<React.SetStateAction<BrightcoveFolder | null>>;
  setSelectedSortAscDesc: React.Dispatch<React.SetStateAction<string>>;
  setOpenFolderDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setFolderType: React.Dispatch<React.SetStateAction<string>>;
  folders: BrightcoveFolder[];
  openFolderDrawer: boolean;
};

const SearchDropdown = ({
  openFolderDrawer,
  folders,
  setFolder,
  setFolderType,
  setCurrentPage,
  setSelectedSort,
  setSortDirection,
  setOpenFolderDrawer,
  setSelectedSortAscDesc,
}: PropType) => {
  return openFolderDrawer ? (
    <div
      className="searchDropdownBlur"
      onClick={() => setOpenFolderDrawer(false)}
    >
      <ul className="searchDropdown">
        <li
          onClick={() => {
            setFolder(null);
            setCurrentPage(0);
            setSortDirection("latest");
            setOpenFolderDrawer(false);
            setSelectedSortAscDesc("-");
            setFolderType("All Folders");
            setSelectedSort("updated_at");
          }}
        >
          All Folders
        </li>
        {folders.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setFolder(item);
              setCurrentPage(0);
              setFolderType(item.name);
              setSortDirection("latest");
              setOpenFolderDrawer(false);
              setSelectedSortAscDesc("-");
              setSelectedSort("updated_at");
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default SearchDropdown;
