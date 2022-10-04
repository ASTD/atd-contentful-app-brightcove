import { DialogExtensionSDK } from "@contentful/app-sdk";
import { BrightcoveFolder, BrightcoveVideo } from "../../../types";

type PropType = {
  video: BrightcoveVideo;
  folder: BrightcoveFolder | null;
  sdk: DialogExtensionSDK;
};

const VideoMetaInfo = ({ video, folder, sdk }: PropType) => {
  const convertDuration = (milisecs: number) => {
    let toMinutes = milisecs / 60000;
    if (toMinutes > 60) {
      let theHours = (toMinutes / 60).toString();
      let theMinutes =
        parseFloat(theHours.substring(theHours.indexOf("."), theHours.length)) *
        60;
      return `${Math.min(parseInt(theHours))}hr ${Math.round(theMinutes)}min`;
    } else {
      return `${Math.ceil(toMinutes)}min`;
    }
  };
  return (
    <div
      style={{
        padding: "10px",
        fontFamily: "Tahoma",
        cursor: "pointer",
      }}
      onClick={() => sdk.close(video)}
    >
      <span
        style={{
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        {video.name}
      </span>
      <br
        style={{
          marginBottom: "10px",
        }}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ whiteSpace: "nowrap" }}>
          <span style={{ fontSize: "12px" }}>
            <span style={{ color: "grey" }}>Created: </span>
            {new Date(video.created_at).toLocaleDateString()}
          </span>
          <br />
          <span style={{ fontSize: "12px" }}>
            <span style={{ color: "grey" }}>Duration: </span>
            {convertDuration(video.duration)}
          </span>
          <br />
          <span style={{ fontSize: "12px" }}>
            <span style={{ color: "grey" }}>Folder: </span>
            {folder !== null ? folder.name : "Unknown"}
          </span>
        </div>
        <div style={{ paddingLeft: "100px" }}>&nbsp;</div>
        <div>
          <span style={{ fontSize: "12px" }}>
            <span style={{ color: "grey" }}>Updated: </span>
            {new Date(video.updated_at).toLocaleDateString()}
          </span>
          <br />
          <span style={{ fontSize: "12px" }}>
            <span style={{ color: "grey" }}>Description: </span>
            {video.description ? video.description : "None"}
          </span>
          <br />
          <span style={{ fontSize: "12px" }}>
            <span style={{ color: "grey" }}>Tags: </span>
            {video.tags.length > 0
              ? video.tags.map((tag) => (
                  <span
                    key={video.id}
                    style={{
                      margin: "2px",
                      padding: "4px",
                      borderRadius: "5px",
                      backgroundColor: "rgb(239,239,239)",
                      display: "inline-block",
                    }}
                  >
                    {tag}
                  </span>
                ))
              : "None"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoMetaInfo;
