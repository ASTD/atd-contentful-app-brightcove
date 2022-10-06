import React from "react";
import { BrightcoveFolder } from "../../../types";
import "../../DialogStyles/Search.css";

type PropType = {
  setFolder: React.Dispatch<React.SetStateAction<BrightcoveFolder | null>>;
  setOpenFolderDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenTagDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setFolderType: React.Dispatch<React.SetStateAction<string>>;
  setTagType: React.Dispatch<React.SetStateAction<string>>;
  folders: BrightcoveFolder[];
  openFolderDrawer: boolean;
  openTagDrawer: boolean;
};

const SearchDropdown = ({
  openFolderDrawer,
  openTagDrawer,
  folders,
  setFolder,
  setTagType,
  setFolderType,
  setCurrentPage,
  setOpenTagDrawer,
  setOpenFolderDrawer,
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
            setFolderType("All Folders");
            setOpenFolderDrawer(false);
          }}
        >
          All Folders
        </li>
        {folders.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setFolder(item);
              setFolderType(item.name);
              setCurrentPage(0);
              setOpenFolderDrawer(false);
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
