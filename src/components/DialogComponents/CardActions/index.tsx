import { BrightcoveVideo } from "../../../types";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { CardActions } from "@mui/material";

type PropType = {
  mappedIndex: number;
  showVideoDetail: boolean;
  selectedVideoDetail: string;
  allVideos: BrightcoveVideo[];
  mappedVideo: BrightcoveVideo;
  selectedVideoDetailFunc: (id: string) => void;
  setShowVideoDetail: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoCardActions = ({
  allVideos,
  mappedVideo,
  mappedIndex,
  showVideoDetail,
  setShowVideoDetail,
  selectedVideoDetail,
  selectedVideoDetailFunc,
}: PropType) => {
  return (
    <CardActions
      style={{
        display: "flex",
        flexDirection: mappedVideo.state !== "ACTIVE" ? "row" : "row-reverse",
        justifyContent: "space-between",
        backgroundColor:
          mappedVideo.state === "PENDING"
            ? "rgb(0, 145, 247)"
            : mappedVideo.state === "INACTIVE"
            ? "rgb(246, 7, 17)"
            : mappedVideo.state === "DELETED"
            ? "rgb(246, 7, 17)"
            : "rgb(239,239,239)",
      }}
    >
      {mappedVideo.state !== "ACTIVE" ? (
        <div>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>
            Status: {mappedVideo.state}{" "}
            {mappedVideo.state === "DELETED"
              ? "- Video has been deleted within the past 10 days"
              : null}
          </span>
        </div>
      ) : null}
      {showVideoDetail &&
      allVideos
        .map((item, count) => {
          if (item.id === selectedVideoDetail) {
            return count;
          }
        })
        .indexOf(mappedIndex) === mappedIndex ? (
        <CloseIcon
          fontSize="small"
          style={{ cursor: "pointer" }}
          onClick={() => {
            selectedVideoDetailFunc("null");
            setShowVideoDetail(false);
          }}
        />
      ) : (
        <InfoIcon
          fontSize="small"
          style={{ cursor: "pointer" }}
          onClick={() => {
            selectedVideoDetailFunc(mappedVideo.id);
            setShowVideoDetail(true);
          }}
        />
      )}
    </CardActions>
  );
};

export default VideoCardActions;
