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
import {
  BrightcoveFolder,
  BrightcoveVideo,
  FolderSpecificBrightcoveVideos,
} from "../../../types";
import { EntityListSkeleton } from "../../ui";
import VideoMetaInfo from "../VideoMetaInfo";
import FolderSpecificVideosSort from "../FolderSpecificVideosSort";

type PropType = {
  currentPage: number;
  videoCount: FolderSpecificBrightcoveVideos | null;
  folder: BrightcoveFolder | null;
  videos: BrightcoveVideo[];
  videoDetail: string;
  close: boolean;
  divRef: React.LegacyRef<HTMLDivElement>;
  sdk: DialogExtensionSDK;
  selectedSort: string;
  sortDirection: string;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSortAscDesc: React.Dispatch<React.SetStateAction<string>>;
  setVideoDetail: React.Dispatch<React.SetStateAction<string>>;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setFolder: React.Dispatch<React.SetStateAction<BrightcoveFolder | null>>;
};

const FolderSpecificVideos = ({
  currentPage,
  videoCount,
  videoDetail,
  selectedSort,
  sortDirection,
  folder,
  videos,
  close,
  divRef,
  sdk,
  setSortDirection,
  setSelectedSort,
  setSelectedSortAscDesc,
  setVideoDetail,
  setCurrentPage,
  setClose,
  setFolder,
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
      {videos.length === 0 ? (
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
            ref={divRef}
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
                }}
              >
                Back
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
                {videoCount?.video_count} assets
              </div>
              <div style={{ paddingLeft: "15px" }}>&nbsp;</div>
              <FolderSpecificVideosSort
                selectedSort={selectedSort}
                sortDirection={sortDirection}
                setSelectedSort={setSelectedSort}
                setSortDirection={setSortDirection}
                setSelectedSortAscDesc={setSelectedSortAscDesc}
              />
            </div>
          </div>
          {videos.length === 0 && <EntityListSkeleton num={videos.length} />}
          <div style={{ width: "800px", margin: "0 auto" }}>
            {videos.length > 0 ? (
              <div>
                {videos.map((video, index) => (
                  <div key={video.id}>
                    <Card
                      style={{
                        margin: "10px",
                      }}
                    >
                      {videos
                        .map((item, count) => {
                          if (item.id === videoDetail) {
                            return count;
                          }
                        })
                        .indexOf(index) === index ? (
                        <VideoMetaInfo
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
                        videos
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
            {videoCount?.video_count !== undefined ? (
              <Stack sx={{ paddingTop: "20px" }}>
                <Pagination
                  sx={{ margin: "0 auto" }}
                  count={Math.ceil(videoCount?.video_count / 10)}
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

export default FolderSpecificVideos;
