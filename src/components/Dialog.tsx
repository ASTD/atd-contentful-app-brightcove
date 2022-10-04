import React, { useEffect, useState } from "react";
import { DialogExtensionSDK } from "@contentful/app-sdk";
import {
  BrightcoveFolder,
  BrightcoveVideo,
  FolderSpecificBrightcoveVideos,
} from "../types";
import { AppInstallationParameters } from "./ConfigScreen";
import Folders from "./DialogComponents/Folders";
import FolderSpecificVideos from "./DialogComponents/FolderSpecificVideos";
import Search from "./DialogComponents/Search";

interface DialogProps {
  sdk: DialogExtensionSDK;
}

const Dialog = ({ sdk }: DialogProps) => {
  const { proxyUrl } = (sdk.parameters
    .installation as unknown) as AppInstallationParameters;

  const ref = React.createRef<HTMLDivElement>();
  const [currentPage, setCurrentPage] = useState(0);
  const [close, setClose] = useState<boolean>(false);
  const [sortDirection, setSortDirection] = useState<string>("latest");
  const [videos, setVideos] = useState<BrightcoveVideo[]>([]);
  const [videoDetail, setVideoDetail] = useState<string>("");
  const [folders, setFolders] = useState<BrightcoveFolder[]>([]);
  const [folder, setFolder] = useState<BrightcoveFolder | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>("created_at");
  const [selectedSortAscDesc, setSelectedSortAscDesc] = useState<string>("-");
  const [
    videoCount,
    setVideoCount,
  ] = useState<FolderSpecificBrightcoveVideos | null>(null);

  useEffect(() => {
    sdk.window.startAutoResizer();
    return () => {
      sdk.window.stopAutoResizer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const folders: BrightcoveFolder[] = await fetch(`${proxyUrl}/folders`)
        .then((response) => response.json())
        .catch((err) => console.log(err));
      setFolders(folders);
    })();
  }, [proxyUrl]);

  useEffect(() => {
    (async () => {
      if (folder) {
        const videoCount: FolderSpecificBrightcoveVideos = await fetch(
          `${proxyUrl}/folders/${folder.id}`
        )
          .then((response) => response.json())
          .catch((err) => console.log(err));
        setVideoCount(videoCount);

        const videos: BrightcoveVideo[] = await fetch(
          `${proxyUrl}/folders/${
            folder.id
          }/videos?sort=${selectedSortAscDesc}${selectedSort}&limit=10&offset=${
            currentPage * 10
          }`
        )
          .then((response) => response.json())
          .catch((err) => console.log(err));
        setVideos(videos);
      } else {
        setVideos([]);
      }
    })();

    if (ref.current !== null) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    proxyUrl,
    folder,
    currentPage,
    selectedSort,
    selectedSortAscDesc,
    sortDirection,
  ]);

  return (
    <div style={{ minWidth: "900px" }}>
      <p>
        <Search />
      </p>
      {folder === null ? (
        <Folders folders={folders} setFolder={setFolder} />
      ) : (
        <FolderSpecificVideos
          currentPage={currentPage}
          videoDetail={videoDetail}
          videoCount={videoCount}
          folder={folder}
          videos={videos}
          close={close}
          divRef={ref}
          selectedSort={selectedSort}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          setSelectedSortAscDesc={setSelectedSortAscDesc}
          setSelectedSort={setSelectedSort}
          setCurrentPage={setCurrentPage}
          setFolder={setFolder}
          setVideoDetail={setVideoDetail}
          setClose={setClose}
          sdk={sdk}
        />
      )}
    </div>
  );
};

export default Dialog;
