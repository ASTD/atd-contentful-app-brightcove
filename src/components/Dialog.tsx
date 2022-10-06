import React, { useEffect, useState } from "react";
import { DialogExtensionSDK } from "@contentful/app-sdk";
import {
  BrightcoveFolder,
  BrightcoveSearchResultVideoCount,
  BrightcoveVideo,
  FolderSpecificBrightcoveVideos,
} from "../types";
import { AppInstallationParameters } from "./ConfigScreen";
import Folders from "./DialogComponents/Folders";
import FolderSpecificVideos from "./DialogComponents/FolderSpecificVideos";
import Search from "./DialogComponents/Search";
import useDebounce from "./hooks/useDebounce";
import Videos from "./DialogComponents/Videos";

interface DialogProps {
  sdk: DialogExtensionSDK;
}

const Dialog = ({ sdk }: DialogProps) => {
  const { proxyUrl } = (sdk.parameters
    .installation as unknown) as AppInstallationParameters;

  const ref = React.createRef<HTMLDivElement>();
  const [currentPage, setCurrentPage] = useState(0);
  const [close, setClose] = useState<boolean>(false);
  const [videoDetail, setVideoDetail] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [tagType, setTagType] = useState<string>("All Tags");
  const [videos, setVideos] = useState<BrightcoveVideo[]>([]);
  const [folders, setFolders] = useState<BrightcoveFolder[]>([]);
  const [folder, setFolder] = useState<BrightcoveFolder | null>(null);
  const [folderType, setFolderType] = useState<string>("All Folders");
  const [sortDirection, setSortDirection] = useState<string>("latest");
  const [selectedSort, setSelectedSort] = useState<string>("created_at");
  const [selectedSortAscDesc, setSelectedSortAscDesc] = useState<string>("-");
  const [allVideosInFolder, setAllVideosInFolder] = useState<BrightcoveVideo[]>(
    []
  );
  const [searchResultVideoCount, setSearchResultVideoCount] = useState<
    BrightcoveSearchResultVideoCount | undefined
  >();
  const [searchResultVideos, setSearchResultVideos] = useState<
    BrightcoveVideo[]
  >([]);
  const [
    videoCount,
    setVideoCount,
  ] = useState<FolderSpecificBrightcoveVideos | null>(null);

  const searchText = useDebounce(searchInput);

  /****************************************
   * SDK
   *****************************************/
  useEffect(() => {
    sdk.window.startAutoResizer();
    return () => {
      sdk.window.stopAutoResizer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /****************************************
   * SEARCH
   *****************************************/
  useEffect(() => {
    (async () => {
      if (searchText !== "" && folderType === "All Folders") {
        const searchResults: BrightcoveVideo[] = await fetch(
          `${proxyUrl}/videos?query=name:"${searchText}"&sort=${selectedSortAscDesc}${selectedSort}&limit=10&offset=${
            currentPage * 10
          }`
        )
          .then((response) => response.json())
          .catch((err) => console.log(err));
        setSearchResultVideos(searchResults);

        const searchResultsCount: BrightcoveSearchResultVideoCount = await fetch(
          `${proxyUrl}/counts/videos?query=name:"${searchText}"`
        )
          .then((response) => response.json())
          .catch((err) => console.log(err));
        setSearchResultVideoCount(searchResultsCount);
      } else {
        setSearchResultVideos([]);
      }
    })();

    if (ref.current !== null) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    folder,
    proxyUrl,
    searchText,
    currentPage,
    selectedSort,
    sortDirection,
    selectedSortAscDesc,
  ]);

  /****************************************
   * FOLDERS
   *****************************************/
  useEffect(() => {
    (async () => {
      const folders: BrightcoveFolder[] = await fetch(`${proxyUrl}/folders`)
        .then((response) => response.json())
        .catch((err) => console.log(err));
      setFolders(folders);
    })();
  }, [proxyUrl]);

  /****************************************
   * FOLDER SPECIFIC VIDEOS
   *****************************************/
  useEffect(() => {
    (async () => {
      if (folder) {
        const videoCount: FolderSpecificBrightcoveVideos = await fetch(
          `${proxyUrl}/folders/${folder.id}`
        )
          .then((response) => response.json())
          .catch((err) => console.log(err));
        setVideoCount(videoCount);

        if (searchText !== "") {
          let allVideos: BrightcoveVideo[] = [];
          while (
            Math.ceil(videoCount.video_count / 100) - allVideos.length >
            0
          ) {
            await fetch(
              `${proxyUrl}/folders/${
                folder.id
              }/videos?sort=${selectedSortAscDesc}${selectedSort}&limit=100&offset=${
                100 * allVideos.length
              }`
            )
              .then(async (response) => allVideos.push(await response.json()))
              .catch((err) => console.log(err));
          }
          const mergeAllVideos = Array.prototype.concat.apply([], allVideos);
          setAllVideosInFolder(mergeAllVideos);
        } else {
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
          setFolderType(folder.name);
        }
      } else {
        setVideos([]);
      }
    })();

    if (ref.current !== null) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    folder,
    proxyUrl,
    searchText,
    currentPage,
    selectedSort,
    sortDirection,
    selectedSortAscDesc,
  ]);

  /****************************************
   * RENDER
   *****************************************/
  return (
    <div style={{ minWidth: "900px" }}>
      <p>
        <Search
          searchInput={searchInput}
          folderType={folderType}
          tagType={tagType}
          folders={folders}
          setCurrentPage={setCurrentPage}
          setSearchInput={setSearchInput}
          setFolderType={setFolderType}
          setTagType={setTagType}
          setFolder={setFolder}
        />
        {searchResultVideos.length === 0 &&
        searchText !== "" &&
        folderType === "All Folders" ? (
          <div
            style={{
              fontFamily: "Arial",
              fontSize: "13px",
              color: "grey",
              textAlign: "center",
              paddingTop: "8px",
            }}
          >
            No results for search input <b>{searchText.toUpperCase()}</b>,
            please try a different search
          </div>
        ) : null}
      </p>
      {searchResultVideos.length !== 0 ? (
        <Videos
          searchResultVideoCount={searchResultVideoCount}
          searchResultVideos={searchResultVideos}
          sortDirection={sortDirection}
          selectedSort={selectedSort}
          currentPage={currentPage}
          videoDetail={videoDetail}
          folderType={folderType}
          videoDivRef={ref}
          folder={folder}
          close={close}
          sdk={sdk}
          setSelectedSortAscDesc={setSelectedSortAscDesc}
          setSortDirection={setSortDirection}
          setSelectedSort={setSelectedSort}
          setCurrentPage={setCurrentPage}
          setVideoDetail={setVideoDetail}
          setSearchInput={setSearchInput}
          setFolder={setFolder}
          setClose={setClose}
        />
      ) : folder === null ? (
        <Folders folders={folders} setFolder={setFolder} />
      ) : (
        <FolderSpecificVideos
          allVideosInFolder={allVideosInFolder}
          sortDirection={sortDirection}
          selectedSort={selectedSort}
          currentPage={currentPage}
          videoDetail={videoDetail}
          videoCount={videoCount}
          searchText={searchText}
          folderType={folderType}
          folder={folder}
          videos={videos}
          close={close}
          folderDivRef={ref}
          setSelectedSortAscDesc={setSelectedSortAscDesc}
          setSortDirection={setSortDirection}
          setSelectedSort={setSelectedSort}
          setSearchInput={setSearchInput}
          setVideoDetail={setVideoDetail}
          setCurrentPage={setCurrentPage}
          setFolderType={setFolderType}
          setFolder={setFolder}
          setClose={setClose}
          sdk={sdk}
        />
      )}
    </div>
  );
};

export default Dialog;
