import React from "react";
import { DialogExtensionSDK } from "@contentful/app-sdk";
import {
  BrightcoveFolder,
  BrightcoveVideo,
  FolderSpecificBrightcoveVideos,
} from "../../../types";
import SearchFolderSpecificVideos from "./SearchFolderSpecificVideos";
import NoSearchFolderSpecificVideos from "./NoSearchFolderSpecificVideos";

type PropType = {
  videoCount: FolderSpecificBrightcoveVideos | null;
  folderDivRef: React.LegacyRef<HTMLDivElement>;
  allVideosInFolder: BrightcoveVideo[];
  folder: BrightcoveFolder | null;
  videos: BrightcoveVideo[];
  sdk: DialogExtensionSDK;
  sortDirection: string;
  selectedSort: string;
  videoDetail: string;
  currentPage: number;
  folderType: string;
  searchText: string;
  searchTag: string;
  loading: boolean;
  close: boolean;
  setFolder: React.Dispatch<React.SetStateAction<BrightcoveFolder | null>>;
  setSelectedSortAscDesc: React.Dispatch<React.SetStateAction<string>>;
  setSearchInputTag: React.Dispatch<React.SetStateAction<string>>;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  setVideoDetail: React.Dispatch<React.SetStateAction<string>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setFolderType: React.Dispatch<React.SetStateAction<string>>;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const FolderSpecificVideos = ({
  allVideosInFolder,
  sortDirection,
  selectedSort,
  folderDivRef,
  videoDetail,
  currentPage,
  searchText,
  videoCount,
  folderType,
  searchTag,
  loading,
  folder,
  videos,
  close,
  sdk,
  setSelectedSortAscDesc,
  setSearchInputTag,
  setSortDirection,
  setSelectedSort,
  setVideoDetail,
  setCurrentPage,
  setSearchInput,
  setFolderType,
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
      {searchText !== "" || searchTag !== "" ? (
        <SearchFolderSpecificVideos
          allVideosInFolder={allVideosInFolder}
          sortDirection={sortDirection}
          folderDivRef={folderDivRef}
          selectedSort={selectedSort}
          currentPage={currentPage}
          videoDetail={videoDetail}
          searchText={searchText}
          folderType={folderType}
          searchTag={searchTag}
          loading={loading}
          folder={folder}
          close={close}
          setSelectedSortAscDesc={setSelectedSortAscDesc}
          setSearchInputTag={setSearchInputTag}
          changePageNumber={changePageNumber}
          setSortDirection={setSortDirection}
          setSelectedSort={setSelectedSort}
          setSearchInput={setSearchInput}
          setCurrentPage={setCurrentPage}
          setFolderType={setFolderType}
          videoDetails={videoDetails}
          setFolder={setFolder}
          setClose={setClose}
          sdk={sdk}
        />
      ) : (
        <NoSearchFolderSpecificVideos
          sortDirection={sortDirection}
          folderDivRef={folderDivRef}
          selectedSort={selectedSort}
          currentPage={currentPage}
          videoDetail={videoDetail}
          videoCount={videoCount}
          folderType={folderType}
          folder={folder}
          videos={videos}
          close={close}
          setSelectedSortAscDesc={setSelectedSortAscDesc}
          changePageNumber={changePageNumber}
          setSortDirection={setSortDirection}
          setSelectedSort={setSelectedSort}
          setCurrentPage={setCurrentPage}
          setFolderType={setFolderType}
          videoDetails={videoDetails}
          setFolder={setFolder}
          setClose={setClose}
          sdk={sdk}
        />
      )}
    </>
  );
};

export default FolderSpecificVideos;
