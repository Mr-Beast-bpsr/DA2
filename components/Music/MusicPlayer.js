import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS
// import Button from 'react-bootstrap/Button';
import Collapse from "react-bootstrap/Collapse";

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
  const router = useRouter();
  console.log(router.query.uid);
  // console.log(props)
  const audioPlayer = useRef();
  const videoPlayerRef = useRef();
  const [currentTimeState, setCurrentTimeState] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playlistName, setPlaylistName] = useState();
  const [allPlaylist, setAllPlaylist] = useState(null);
  // let playlist = props.data;
  const [playlist, setPlaylist] = useState([]);
  const [open, setOpen] = useState(false);
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
    getAllplaylist();
  }, []);
  useEffect(() => {
    if (allPlaylist) {
      fetchSongs(allPlaylist[0]?.id);
    }
  }, [allPlaylist]);
  // Console.log(audioPlayer.current.audio.current.currentTime)

  async function remove(e) {
    e.preventDefault();
    let i = e.currentTarget.id;

    e.currentTarget.parentElement.remove();
    let add = await axios.post("/api/music/removeplaylist", {
      nftId: playlist[i].nftId,
      playListId: playlist[i].playListId,
      userAddress: router.query.uid,
    });
  }

  async function getAllplaylist() {
    try {
      const res = await axios.post("/api/music/playlist/getAllPlaylist", {
        userAddress: router.query.uid,
      });
      const request = res.data;
      console.log(request.data)
      setPlaylistName(request.data[0].playListName);
      setAllPlaylist(request.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchSongs(e, n) {
    try {
      const res = await axios.post("/api/music/playlist/getSong", {
        userAddress: router.query.uid,
        playListId: e,
      });
      if (n) setPlaylistName(n);

      const request = res.data;
      console.log(request.data, "all play");
      setPlaylist(request.data);
    } catch (err) {
      console.log(err);
    }
  }
async function removePlaylist(e) {
  try {
    const res = await axios.post("/api/music/playlist/removeplaylist", {
      userAddress: router.query.uid,
      id: e,
    });
    // if (n) setPlaylistName(n);

    const request = res.data;
    getAllplaylist()
    console.log(request.data, "all play");
  
  } catch (err) {
    console.log(err);
  }
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
      <div className="player">
        <ul className="player__playlist list">
          <li className="player__song">
            <img
              className="player__img img"
              id="player_imagetip"
              src="https://consideringapple.com/wp-content/uploads/2021/12/9f6d075d00d36877f8c0efc5822f956e.jpg"
              alt="cover"
            />

            <p className="player__context ">
 <b className="player__song-name">  {playlistName}</b>
            </p>
            <div style={{ display: "flex" }} className="player__context">
              <Button
                variant="contained"
                onClick={() => setOpen(!open)}
                style={{
                  height: "3rem",
                  margin:'0.8rem',
                  justifyContent: "flex-end ",
                  width: "160px",
                  marginLeft:"200px"
                  
                }}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                {"Select PlayList"}
              </Button>
              <Collapse in={open}>
                <div
                  className="mt-4"
                  style={{  flexDirection: "column", width: "85%" , marginLeft:"3rem" }}
                  id="example-collapse-text"
                >
                  {allPlaylist
                    ? allPlaylist.map((item) => {
                      console.log(item,"THius is dataaaaa")
                      return(
                        <div
                          className="player__song "
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <div
                            style={{ width: "100%", height: "2.5rem" }}
                            onClick={(e) => {
                              setPlaylist([]);
                              fetchSongs(e.currentTarget.id, item.playListName);
                            }}
                            defaultValue={1}
                            id={item.id}
                            className="player__"
                          >
                            {item.playListName}
                          </div>

                          <Button
                          value={item.id}
                            className="cls-btn"
                            variant="contained"
                            color="error"
                            onClick={e=>removePlaylist(e.currentTarget.value)}
                          >
                            {" "}
                            Delete
                          </Button>
                        </div>
                      )})
                    : ""}
                </div>
              </Collapse>

              <span className="flex"></span>
            </div>
          </li>

          {/* {playlist.length > 0 ? (
            ""
          ) : (
            <div>
              {" "}
              <p> "Your playlist seem's empty please add some music"</p>
              <Link href="/"> Go to Marketplace </Link>{" "}
            </div>
          )} */}
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
                <div
                  className="player__song"
                  onClick={() => setCurrentMusicIndex(i)}
                >
                  <img
                    className="player__img img"
                    src={
                      song.nftFeaturedImage ||
                      "http://physical-authority.surge.sh/imgs/1.jpg"
                    }
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

                  <div
                    id={i}
                    value={song.playListId}
                    onClick={(e) => {
                      remove(e);
                    }}
                  >
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
