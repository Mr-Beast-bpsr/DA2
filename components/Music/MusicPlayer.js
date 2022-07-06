import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

import React, { useState } from "react";
import Link from "next/link";
import { useRef } from "react";
import { useEffect } from "react";
// import React from 'react';
import { Player, ControlBar, FullscreenToggle, PlayToggle } from "video-react";
import { Button } from "@mui/material";
import { ButtonToolbar, CloseButton } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";  
const MusicPlayer = ({ props }) => {
  const router = useRouter()
  console.log(router.query.uid)
  console.log(props)
  const audioPlayer = useRef();
  const videoPlayerRef = useRef();
  const [currentTimeState, setCurrentTimeState] = useState(0);
  const [playing, setPlaying] = useState(false);
  // let playlist = props.data;
  const [playlist, setPlaylist] = useState(props.data);
  // console.log(props.data);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const handleClickPrevious = () => {
    setCurrentMusicIndex(
      currentMusicIndex === 0 ? playlist.length - 1 : currentMusicIndex - 1
    );
  };

  const handleClickNext = () => {
    setCurrentMusicIndex(
      currentMusicIndex < playlist.length - 1 ? currentMusicIndex + 1 : 0
    );
  };

  const changeTimeHandler = (e) => {
    e.preventDefault();
    videoPlayerRef.current.seek(audioPlayer.current.audio.current.currentTime);
    setCurrentTimeState(audioPlayer.current.audio.current.currentTime);
  };

  function pauseEvent(e) {
    e.preventDefault();
    videoPlayerRef.current.pause();
    setCurrentTimeState(audioPlayer.current.audio.current.currentTime);

    // console.log(audioPlayer.current)
    // audioPlayer.current.handlePause()
  }
  function playEvent(e) {
    // e.preventDefault();
    setCurrentTimeState(audioPlayer.current.audio.current.currentTime);

    videoPlayerRef.current.play();
    // audioPlayer.current
    // audioPlayer.current.togglePlay()

    // console.log(audioPlayer.current)
  }
  useEffect(() => {
    // console.log(audioPlayer.current.isPlaying());
    // console.log(audioPlayer.current.audio.current.currentTime)
    // console.log(audioPlayer.current.progressBar.current.ariaValueNow);
  });
  // Console.log(audioPlayer.current.audio.current.currentTime)

  async function remove(e) {
    e.preventDefault();
    console.log(e.currentTarget.id);
    e.currentTarget.parentElement.remove();
    let add = await axios.post("/api/music/removeplaylist", {
      id: e.currentTarget.id,
      userAddress: router.query.uid,
    });
    
  }
  return (
    <div
      style={
        playing == true
          ? {
              background: "url(http://physical-authority.surge.sh/imgs/1.jpg) ",
            }
          : {}
      }
      className="music-page "
    >
      <div className="video-container-playlist">
        <div className="video-container-video">
          <Player
            poster="/MusicBg.jpg"
            ref={videoPlayerRef}
            onPause={(e) => pauseEvent(e)}
            onPlay={(e) => playEvent(e)}
            muted={true}
            src={playlist[currentMusicIndex]?.url}
            currentTime={currentTimeState}
          >
            <ControlBar disableDefaultControls={true} className="my-class">
              {/* <PlayToggle /> */}
              <FullscreenToggle />
            </ControlBar>
            {/* <source s/> */}
          </Player>
        </div>

        <AudioPlayer
          style={{ top: "100", height: "" }}
          autoPlay
          // togglePlay={e => {console.log(first)}}
          ref={audioPlayer}
          // onListen={(e) => {console.log(e)}}
          src={playlist[currentMusicIndex]?.url}
          onPlay={(e) => playEvent(e)}
          onPause={(e) => pauseEvent(e)}
          onClickPrevious={handleClickPrevious}
          onChange={(e) => console.log(e)}
          header={"Now playing : " + playlist[currentMusicIndex]?.nftIndexName}
          onClickNext={handleClickNext}
          onEnded={handleClickNext}
          autoPlayAfterSrcChange={true}
          handleKeyDown={(e) => console.log(e)}
          showSkipControls={true}
          showJumpControls={false}
          // defualtDuration={true}
          onSeeked={(e) => {
            changeTimeHandler(e);
          }}
          isPlaying={true}
          showProgress={true}
        />
      </div>
      <div className="player" >
        <ul className="player__playlist list" >
          <li className="player__song">
            <img
              className="player__img img"
              id="player_imagetip"
              src="https://consideringapple.com/wp-content/uploads/2021/12/9f6d075d00d36877f8c0efc5822f956e.jpg"
              alt="cover"
            />

            <p className="player__context" >
              <b className="player__song-name" >Your Playlist</b>
              <span className="flex"></span>
            </p>
          </li>

          {playlist.length > 0 ? (
            ""
          ) : (
            <div>
              {" "}
              <p> "Your playlist seem's empty please add some music"</p>
              <Link href="/"> Go to Marketplace </Link>{" "}
            </div>
          )}
          {playlist.map((song, i) => {
            return (
              <li
                key={i}
                value={i}
                style={{
                  justifyContent: "space-between",
                  // alignItems: "center  ",
                  // borderBottom: "0.1em solid #d8d8d859" ,
                  // display: "flex",
                  // marginTop:"20px"
                }}
              >
                <div></div>
                <div
                  className="player__song"
                  onClick={() => setCurrentMusicIndex(i)}
                >
                  <img
                    className="player__img img"
                    src={song.nftFeaturedImage || "http://physical-authority.surge.sh/imgs/1.jpg"}
                    alt="cover"
                  />

                  <p className="player__context">
                    <b className="player__song-name">{song.nftIndexName}</b>
                    <span className="flex">
                      <span className="player__title">{song.imageAlt}</span>
                      <span className="player__song-time"></span>
                    </span>
                  </p>

                  <audio
                    className="audio"
                    src="http://physical-authority.surge.sh/music/1.mp3"
                  ></audio>

                  <div id={song.nftId} value={song.nftId}  onClick={(e) => {
                        remove(e);
                      }}>
                    <CloseButton
                      className="cls-btn"
                      variant={"danger"}
                    
                    ></CloseButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MusicPlayer;
