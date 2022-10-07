import { useEffect, useRef, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Button } from "@contentful/forma-36-react-components";
import React from "react";
import "../../DialogStyles/Video.css";

type PropType = {
  selectedSort: string;
  sortDirection: string;
  setSelectedSortAscDesc: React.Dispatch<React.SetStateAction<string>>;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const sortOptions = ["created_at", "published_at", "updated_at", "name"];

const VideosSort = ({
  selectedSort,
  sortDirection,
  setSelectedSortAscDesc,
  setSortDirection,
  setSelectedSort,
  setCurrentPage,
}: PropType) => {
  const [openSortOptions, setOpenSortOptions] = useState<boolean>(false);
  const ref = React.createRef<HTMLDivElement>();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openSortOptions]);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenSortOptions(false);
    }
  };

  const alterSortText = (sortText: string) => {
    if (sortText === "created_at") {
      return "Created Date";
    } else if (sortText === "updated_at") {
      return "Updated Date";
    } else if (sortText === "name") {
      return "Name";
    } else {
      return "Published Date";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
      ref={ref}
    >
      <div style={{ position: "relative" }}>
        <ul style={{ padding: 0, listStyle: "none", cursor: "pointer" }}>
          <Button
            buttonType="muted"
            style={{
              fontSize: "14px",
              paddingBottom: "1.2px",
              paddingTop: "1px",
              paddingLeft: 0,
              paddingRight: 0,
              color: "black",
              textAlign: "center",
            }}
            onClick={() => setOpenSortOptions(!openSortOptions)}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>{alterSortText(selectedSort)}</div>
              <div style={{ paddingTop: "10px" }}>
                {openSortOptions ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </div>
            </div>
          </Button>
          {openSortOptions ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, 15%)",
                backgroundColor: "white",
                textAlign: "center",
                width: "150px",
                boxShadow: "0 4px 8px rgba(55, 55, 55, 0.109)",
                borderRadius: "5px",
                fontSize: "13px",
                marginTop: "5px",
              }}
            >
              {sortOptions.map((sort: string, index: number) =>
                sort.indexOf(selectedSort) === -1 ? (
                  <li
                    className="sortOptions"
                    key={index}
                    onClick={() => {
                      setOpenSortOptions(false);
                      setSelectedSort(sort);
                      setCurrentPage(0);
                    }}
                  >
                    {alterSortText(sort)}
                  </li>
                ) : null
              )}
            </div>
          ) : null}
        </ul>
      </div>
      <div style={{ paddingLeft: "15px" }}>&nbsp;</div>
      <div>
        <ul style={{ padding: 0, listStyle: "none", cursor: "pointer" }}>
          {sortDirection === "latest" ? (
            <li
              title="Descending"
              onClick={() => {
                setSelectedSortAscDesc("");
                setSortDirection("oldest");
                setCurrentPage(0);
              }}
            >
              <Button buttonType="muted" style={{ paddingTop: "8px" }}>
                <SortIcon />
              </Button>
            </li>
          ) : (
            <li
              title="Ascending"
              onClick={() => {
                setSelectedSortAscDesc("-");
                setSortDirection("latest");
                setCurrentPage(0);
              }}
            >
              <Button buttonType="muted" style={{ paddingTop: "8px" }}>
                <SortIcon style={{ transform: "scale(1, -1)" }} />
              </Button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default VideosSort;
