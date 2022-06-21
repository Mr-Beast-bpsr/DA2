import React, { Component, useState, useRef } from "react";
import arrowLeft from "../../public/left-arrow.png";
import arrowRight from "../../public/right-arrow.png";
import Link from "next/link";
import {
  Playlist,
  goToNextVideo,
  goToPreviousVideo,
} from "reactjs-video-playlist-player";

function VideoPlayer({ props }) {
  console.log(props.data);

  const [videoList, setVideoList] = useState(props.data);

  const [currentVideo, setCurrentVideo] = useState(0);
  const vidRef = useRef(null);
  const [pause, setPause] = useState(false);
  const params = {
    videos: videoList,
    autoPlay: true,
    showQueue: true,
    playForward: true,
    defaultQueueItemPlaceholderThumbnail:
      "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail-300x225.jpg",
    currentVideo: currentVideo,
    setCurrentVideo: setCurrentVideo,
    vidRef: vidRef,
  };
  function onPause() {
    setPause(!pause);
  }

  return (
    <div className="App page-header " style={{ paddingTop: "10rem" }}>
      <h3 id="title"></h3>
      <div>
        {videoList.length < 1 ? (
          <div className="empty-list">
            <h1> YOur playlist seem&apos;s empty, add some Video&apos;s </h1>
            <Link href="/" className="btn btn-outline ">
              Go to marketplace
            </Link>
          </div>
        ) : null}
        <Playlist playlistParams={params} />
        <div class="controls">
          <button
            onClick={(e) => {
              goToPreviousVideo(params);
            }}
            class="btn backward-btn"
          >
            <img src={arrowLeft.src} alt="" />
          </button>
          {/* <button class="play-btn pause">
        <span></span>
        <span></span>
    </button> */}
          <button
            onClick={(e) => goToNextVideo(params)}
            class="btn forward-btn"
          >
            <img src={arrowRight.src} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
