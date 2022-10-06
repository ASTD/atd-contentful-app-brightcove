import { DialogExtensionSDK } from "@contentful/app-sdk";
import {
  Button,
  ModalContent,
  Spinner,
} from "@contentful/forma-36-react-components";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import {
  BrightcoveFolder,
  BrightcoveSearchResultVideoCount,
  BrightcoveVideo,
} from "../../../types";
import { EntityListSkeleton } from "../../ui";
import { css } from "emotion";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import VideosSort from "../VideosSort";
import VideoMetaInfo from "../VideoMetaInfo";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

type PropType = {
  searchResultVideoCount: BrightcoveSearchResultVideoCount | undefined;
  videoDivRef: React.LegacyRef<HTMLDivElement>;
  searchResultVideos: BrightcoveVideo[];
  folder: BrightcoveFolder | null;
  sdk: DialogExtensionSDK;
  sortDirection: string;
  selectedSort: string;
  currentPage: number;
  videoDetail: string;
  folderType: string;
  close: boolean;
  setFolder: React.Dispatch<React.SetStateAction<BrightcoveFolder | null>>;
  setSelectedSortAscDesc: React.Dispatch<React.SetStateAction<string>>;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setVideoDetail: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const Videos = ({
  searchResultVideoCount,
  searchResultVideos,
  sortDirection,
  selectedSort,
  currentPage,
  videoDetail,
  folderType,
  folder,
  videoDivRef,
  close,
  sdk,
  setSelectedSortAscDesc,
  setSortDirection,
  setSelectedSort,
  setVideoDetail,
  setSearchInput,
  setCurrentPage,
  setFolder,
  setClose,
}: PropType) => {
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

  const videoDetails = (id: string) => {
    if (id) {
      setVideoDetail(id);
    }
  };

  return (
    <>
      {searchResultVideos.length === 0 ? (
        <ModalContent data-testid="modal-spinner">
          <Spinner
            className={css`
              margin: 4px auto;
              display: block;
            `}
          />
        </ModalContent>
      ) : (
        <ModalContent
          data-testid="modal-videos"
          className={css`
             {
              background-color: rgb(244, 244, 244);
            }
          `}
        >
          <div
            ref={videoDivRef}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
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
                  setSearchInput("");
                }}
              >
                Clear Search
              </Button>
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
                {searchResultVideoCount?.count} assets
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
          {searchResultVideos.length === 0 && (
            <EntityListSkeleton num={searchResultVideos.length} />
          )}
          <div style={{ width: "800px", margin: "0 auto" }}>
            {searchResultVideos.length > 0 ? (
              <div>
                {searchResultVideos.map((video, index) => (
                  <div key={video.id}>
                    <Card
                      style={{
                        margin: "10px",
                      }}
                    >
                      {searchResultVideos
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
                        searchResultVideos
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
                ))}
              </div>
            ) : null}
            {searchResultVideoCount?.count !== undefined ? (
              <Stack sx={{ paddingTop: "20px" }}>
                <Pagination
                  sx={{ margin: "0 auto" }}
                  count={Math.ceil(searchResultVideoCount?.count / 10)}
                  size="medium"
                  color="primary"
                  onChange={changePageNumber}
                  page={currentPage + 1}
                />
              </Stack>
            ) : null}
          </div>
        </ModalContent>
      )}
    </>
  );
};

export default Videos;
