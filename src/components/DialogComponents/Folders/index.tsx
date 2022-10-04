import { css } from "emotion";
import {
  EntityList,
  ModalContent,
  Spinner,
} from "@contentful/forma-36-react-components";
import FolderIcon from "@mui/icons-material/Folder";
import { BrightcoveFolder } from "../../../types";
import "../../DialogStyles/Folder.css";
import { Pagination, Stack } from "@mui/material";
import { useState } from "react";

type PropType = {
  folders: BrightcoveFolder[];
  setFolder: React.Dispatch<React.SetStateAction<BrightcoveFolder | null>>;
};

const Folders = ({ folders, setFolder }: PropType) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const changePageNumber = (event: any) => {
    if (event.currentTarget.attributes[3].nodeValue === "Go to previous page") {
      setCurrentPage(currentPage - 1);
    } else if (
      event.currentTarget.attributes[3].nodeValue === "Go to next page"
    ) {
      setCurrentPage(currentPage + 1);
    } else {
      if (event.currentTarget.textContent) {
        setCurrentPage(parseInt(event.currentTarget.textContent) - 1);
      }
    }
  };
  return (
    <>
      {folders.length === 0 ? (
        <ModalContent data-testid="modal-spinner">
          <Spinner
            className={css`
              margin: 4px auto;
              display: block;
            `}
          />
        </ModalContent>
      ) : (
        <ModalContent data-testid="modal-folders" className="folderListParent">
          <div style={{ color: "grey", paddingBottom: "10px" }}>
            {folders.length} assets
          </div>
          <EntityList data-testid="folder-list" className="folderList">
            {folders
              .map((folder: BrightcoveFolder) => (
                <div
                  className="folderIconAndText"
                  onClick={() => setFolder(folder)}
                  key={folder.id}
                >
                  <div onClick={() => setFolder(folder)}>
                    <FolderIcon color="primary" sx={{ fontSize: "150px" }} />
                  </div>
                  <div style={{ paddingBottom: "15px" }}>
                    <span
                      key={folder.id}
                      className="folderListItems"
                      onClick={() => setFolder(folder)}
                    >
                      {folder.name}
                    </span>
                  </div>
                </div>
              ))
              .slice(10 * currentPage, 10 * currentPage + 10)}
          </EntityList>
          {folders.length !== 0 ? (
            <Stack sx={{ paddingTop: "25px", paddingBottom: "15px" }}>
              <Pagination
                sx={{ margin: "0 auto" }}
                count={Math.ceil(folders.length / 10)}
                size="medium"
                color="standard"
                onChange={changePageNumber}
                page={currentPage + 1}
              />
            </Stack>
          ) : null}
        </ModalContent>
      )}
    </>
  );
};

export default Folders;
