import React, { useContext } from "react";
import "../../DialogStyles/Search.css";

type PropType = {
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  openDrawer: boolean;
};

const SearchDropdown = ({ openDrawer, setOpenDrawer }: PropType) => {
  //const { setAlgoliaIndex } = useContext(CheckContext);
  return openDrawer ? (
    <div className="searchDropdownBlur" onClick={() => setOpenDrawer(false)}>
      <ul className="searchDropdown">
        {/* {newsletterOptions.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              setIndex(item);
              setIsOpen(false);
              setAlgoliaIndex(item);
            }}
          >
            {item}
          </li>
        ))} */}
      </ul>
    </div>
  ) : null;
};

export default SearchDropdown;
