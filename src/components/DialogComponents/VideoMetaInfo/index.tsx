import { DialogExtensionSDK } from "@contentful/app-sdk";
import { useEffect, useState } from "react";
import { BrightcoveFolder, BrightcoveVideo } from "../../../types";
import { AppInstallationParameters } from "../../ConfigScreen";

type PropType = {
  folderType: string;
  video: BrightcoveVideo;
  sdk: DialogExtensionSDK;
  folder: BrightcoveFolder | null;
};

const VideoMetaInfo = ({ sdk, video, folder, folderType }: PropType) => {
  const { proxyUrl } = (sdk.parameters
    .installation as unknown) as AppInstallationParameters;

  const [folderName, setFolderName] = useState<string>("");

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

  useEffect(() => {
    (async () => {
      if (folderType === "All Folders") {
        const folder: BrightcoveFolder = await fetch(
          `${proxyUrl}/folders/${video.folder_id}`
        )
          .then((response) => response.json())
          .catch((err) => console.log(err));
        setFolderName(folder.name);
      }
    })();
  });

  return (
    <div
      style={{
        padding: "10px",
        fontFamily: "Arial",
        cursor: video.state !== "ACTIVE" ? "not-allowed" : "pointer",
      }}
      onClick={() => (video.state !== "ACTIVE" ? null : sdk.close(video))}
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
            {folder !== null
              ? folder.name
              : folderName !== undefined
              ? folderName
              : "None"}
          </span>
        </div>
        <div style={{ paddingLeft: "50px" }}>&nbsp;</div>
        <div style={{ whiteSpace: "nowrap" }}>
          <span style={{ fontSize: "12px" }}>
            <span style={{ color: "grey" }}>Updated: </span>
            {new Date(video.updated_at).toLocaleDateString()}
          </span>
          <br />
          <span style={{ fontSize: "12px" }}>
            <span style={{ color: "grey" }}>Published: </span>
            {new Date(video.published_at).toLocaleDateString()}
          </span>
          <br />
          <span style={{ fontSize: "12px" }}>
            <span style={{ color: "grey" }}>Status: </span>
            {video.state}
          </span>
        </div>
        <div style={{ paddingLeft: "50px" }}>&nbsp;</div>
        <div>
          <span style={{ fontSize: "12px" }}>
            {video.tags.length > 0 ? (
              video.tags.map((tag) => (
                <span
                  key={video.id}
                  style={{
                    margin: "2px",
                    padding: "5px",
                    borderRadius: "5px",
                    backgroundColor: "rgb(239,239,239)",
                    display: "inline-block",
                  }}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span>
                <span style={{ color: "grey" }}>Tags:</span> None
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoMetaInfo;
