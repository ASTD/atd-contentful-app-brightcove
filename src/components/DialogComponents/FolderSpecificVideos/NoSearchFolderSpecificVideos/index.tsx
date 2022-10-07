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
  CardContent,
  CardMedia,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import {
  BrightcoveFolder,
  BrightcoveVideo,
  FolderSpecificBrightcoveVideos,
} from "../../../../types";
import VideosSort from "../../VideosSort";
import VideoMetaInfo from "../../VideoMetaInfo";
import VideoCardActions from "../../CardActions";

type PropType = {
  videoCount: FolderSpecificBrightcoveVideos | null;
  folderDivRef: React.LegacyRef<HTMLDivElement>;
  folder: BrightcoveFolder | null;
  videos: BrightcoveVideo[];
  sdk: DialogExtensionSDK;
  sortDirection: string;
  selectedSort: string;
  videoDetail: string;
  currentPage: number;
  folderType: string;
  close: boolean;
  setFolder: React.Dispatch<React.SetStateAction<BrightcoveFolder | null>>;
  setSelectedSortAscDesc: React.Dispatch<React.SetStateAction<string>>;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  setFolderType: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  changePageNumber: (event: any) => void;
  videoDetails: (id: string) => void;
};

const NoSearchFolderSpecificVideos = ({
  sortDirection,
  selectedSort,
  folderDivRef,
  videoDetail,
  currentPage,
  videoCount,
  folderType,
  folder,
  videos,
  close,
  sdk,
  setSelectedSortAscDesc,
  changePageNumber,
  setSortDirection,
  setSelectedSort,
  setCurrentPage,
  setFolderType,
  videoDetails,
  setFolder,
  setClose,
}: PropType) => {
  return (
    <>
      {videos.length === 0 ? (
        <ModalContent data-testid="modal-spinner">
          <div
            style={{
              textAlign: "center",
              paddingBottom: "60px",
            }}
          >
            <Button
              data-testid="back-to-folders"
              buttonType="muted"
              onClick={() => {
                setSelectedSort("updated_at");
                setFolderType("All Folders");
                setSelectedSortAscDesc("-");
                setSortDirection("latest");
                setCurrentPage(0);
                setFolder(null);
              }}
            >
              Back
            </Button>
          </div>
          <Spinner
            className={css`
              margin: 4px auto;
              display: block;
              padding-top: 70px;
              padding-bottom: 130px;
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
            ref={folderDivRef}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div>
                <Button
                  data-testid="back-to-folders"
                  buttonType="muted"
                  onClick={() => {
                    setSelectedSort("updated_at");
                    setFolderType("All Folders");
                    setSelectedSortAscDesc("-");
                    setSortDirection("latest");
                    setCurrentPage(0);
                    setFolder(null);
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
                    setSelectedSort("updated_at");
                    setSelectedSortAscDesc("-");
                    setSortDirection("latest");
                    setCurrentPage(0);
                  }}
                >
                  Clear Filter
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
                {videoCount?.video_count} assets
              </div>
              <div style={{ paddingLeft: "15px" }}>&nbsp;</div>
              <VideosSort
                selectedSort={selectedSort}
                sortDirection={sortDirection}
                setCurrentPage={setCurrentPage}
                setSelectedSort={setSelectedSort}
                setSortDirection={setSortDirection}
                setSelectedSortAscDesc={setSelectedSortAscDesc}
              />
            </div>
          </div>
          <div style={{ width: "800px", margin: "0 auto" }}>
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
                        folderType={folderType}
                        folder={folder}
                        video={video}
                        sdk={sdk}
                      />
                    ) : (
                      <div
                        style={{
                          cursor:
                            video.state !== "ACTIVE"
                              ? "not-allowed"
                              : "pointer",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                        onClick={() =>
                          video.state !== "ACTIVE" ? null : sdk.close(video)
                        }
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
                    <VideoCardActions
                      allVideos={videos}
                      mappedIndex={index}
                      mappedVideo={video}
                      showVideoDetail={close}
                      setShowVideoDetail={setClose}
                      selectedVideoDetail={videoDetail}
                      selectedVideoDetailFunc={videoDetails}
                    />
                  </Card>
                </div>
              ))}
            </div>
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

export default NoSearchFolderSpecificVideos;
