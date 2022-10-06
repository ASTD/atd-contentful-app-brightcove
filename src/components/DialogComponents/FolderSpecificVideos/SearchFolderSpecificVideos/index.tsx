import React from "react";
import { css } from "emotion";
import {
  Button,
  ModalContent,
  Spinner,
} from "@contentful/forma-36-react-components";
import { DialogExtensionSDK } from "@contentful/app-sdk";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { BrightcoveFolder, BrightcoveVideo } from "../../../../types";
import VideosSort from "../../VideosSort";
import { EntityListSkeleton } from "../../../ui";
import VideoMetaInfo from "../../VideoMetaInfo";

type PropType = {
  folderDivRef: React.LegacyRef<HTMLDivElement>;
  allVideosInFolder: BrightcoveVideo[];
  folder: BrightcoveFolder | null;
  sdk: DialogExtensionSDK;
  sortDirection: string;
  selectedSort: string;
  videoDetail: string;
  currentPage: number;
  searchText: string;
  folderType: string;
  close: boolean;
  setFolder: React.Dispatch<React.SetStateAction<BrightcoveFolder | null>>;
  setSelectedSortAscDesc: React.Dispatch<React.SetStateAction<string>>;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setFolderType: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  changePageNumber: (event: any) => void;
  videoDetails: (id: string) => void;
};

const SearchFolderSpecificVideos = ({
  allVideosInFolder,
  sortDirection,
  selectedSort,
  folderDivRef,
  videoDetail,
  currentPage,
  searchText,
  folderType,
  folder,
  close,
  sdk,
  setSelectedSortAscDesc,
  changePageNumber,
  setSortDirection,
  setSelectedSort,
  setCurrentPage,
  setSearchInput,
  setFolderType,
  videoDetails,
  setFolder,
  setClose,
}: PropType) => {
  const searchFolderSpecificVideos = allVideosInFolder.filter(
    (item) => item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );

  return (
    <>
      <ModalContent
        data-testid="modal-videos"
        className={css`
           {
            background-color: rgb(244, 244, 244);
          }
        `}
      >
        <div
          ref={folderDivRef}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Button
                data-testid="back-to-folders"
                buttonType="muted"
                onClick={() => {
                  setFolder(null);
                  setCurrentPage(0);
                  setSelectedSort("created_at");
                  setSelectedSortAscDesc("-");
                  setSortDirection("latest");
                  setFolderType("All Folders");
                  setSearchInput("");
                }}
              >
                Back
              </Button>
            </div>
            <div style={{ paddingLeft: "15px" }}>&nbsp;</div>
            <div>
              <Button
                data-testid="back-to-folders"
                buttonType="muted"
                onClick={() => {
                  setCurrentPage(0);
                  setSelectedSort("created_at");
                  setSelectedSortAscDesc("-");
                  setSortDirection("latest");
                  setSearchInput("");
                }}
              >
                Clear Search
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div style={{ color: "grey" }}>
              {searchFolderSpecificVideos.length} assets
            </div>
            <div style={{ paddingLeft: "15px" }}>&nbsp;</div>
            <VideosSort
              selectedSort={selectedSort}
              sortDirection={sortDirection}
              setSelectedSort={setSelectedSort}
              setSortDirection={setSortDirection}
              setSelectedSortAscDesc={setSelectedSortAscDesc}
            />
          </div>
        </div>
        {searchFolderSpecificVideos.length === 0 && (
          <EntityListSkeleton num={searchFolderSpecificVideos.length} />
        )}
        <div style={{ width: "800px", margin: "0 auto" }}>
          {searchFolderSpecificVideos.length > 0 ? (
            <div>
              {searchFolderSpecificVideos
                .map((video, index) => (
                  <div key={video.id}>
                    <Card
                      style={{
                        margin: "10px",
                      }}
                    >
                      {searchFolderSpecificVideos
                        .map((item, count) => {
                          if (item.id === videoDetail) {
                            return count;
                          }
                        })
                        .indexOf(index) === index ? (
                        <VideoMetaInfo
                          folderType={folderType}
                          folder={folder}
                          video={video}
                          sdk={sdk}
                        />
                      ) : (
                        <div
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                          onClick={() => sdk.close(video)}
                        >
                          {video.images.poster?.src ? (
                            <CardMedia
                              component="img"
                              image={video.images.poster?.src}
                              alt={video.name}
                              style={{ width: "200px", padding: "5px" }}
                            />
                          ) : (
                            <OndemandVideoIcon style={{ fontSize: "115px" }} />
                          )}
                          <CardContent>
                            <Typography
                              style={{
                                fontFamily: "Arial",
                                fontWeight: "bold",
                              }}
                              variant="body2"
                            >
                              {video.name}
                            </Typography>
                          </CardContent>
                        </div>
                      )}
                      <CardActions
                        style={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          justifyContent: "space-between",
                          backgroundColor: "rgb(239,239,239)",
                        }}
                      >
                        {close &&
                        searchFolderSpecificVideos
                          .map((item, count) => {
                            if (item.id === videoDetail) {
                              return count;
                            }
                          })
                          .indexOf(index) === index ? (
                          <CloseIcon
                            fontSize="small"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              videoDetails("null");
                              setClose(false);
                            }}
                          />
                        ) : (
                          <InfoIcon
                            fontSize="small"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              videoDetails(video.id);
                              setClose(true);
                            }}
                          />
                        )}
                      </CardActions>
                    </Card>
                  </div>
                ))
                .slice(10 * currentPage, 10 * currentPage + 10)}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                paddingTop: "120px",
                paddingBottom: "120px",
              }}
            >
              No results for search input <b>{searchText.toUpperCase()}</b> in
              folder <b>{folder?.name}</b>, please try a different search
            </div>
          )}
          {searchFolderSpecificVideos.length !== 0 ? (
            <Stack sx={{ paddingTop: "20px" }}>
              <Pagination
                sx={{ margin: "0 auto" }}
                count={Math.ceil(searchFolderSpecificVideos.length / 10)}
                size="medium"
                color="primary"
                onChange={changePageNumber}
                page={currentPage + 1}
              />
            </Stack>
          ) : null}
        </div>
      </ModalContent>
    </>
  );
};

export default SearchFolderSpecificVideos;
