import React, { Component } from 'react'
import { Media, Player, controls ,utils } from 'react-media-player'

const {
    PlayPause,
    CurrentTime,
    Progress,
    SeekBar,
    Duration,
    MuteUnmute,
    Volume,
    Fullscreen,
  } = controls
  

const MixPlayer = () => {
    const { keyboardControls } = utils

  return (
    <Media >
    {mediaProps => (
      <div
        className="media"
        onKeyDown={keyboardControls.bind(null, mediaProps)}
      >
        <Player src="https://www.youtube.com/watch?v=GNWLILeztaI" className="media-player" />
        <div className="media-controls">
          <PlayPause />
          <CurrentTime />
          <Progress />
          <SeekBar />
          <Duration />
          <MuteUnmute />
          <Volume />
          <Fullscreen />
        </div>
      </div>
    )}
  </Media>
  )
}

export default MixPlayer



// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
// // import 'react-h5-audio-player/lib/styles.less' Use LESS
// // import 'react-h5-audio-player/src/styles.scss' Use SASS

// import React, { useState } from "react";
// import Link from "next/link";
// import { useRef } from "react";
// import { useEffect } from "react";
// // import React from 'react';
// import { Player,ControlBar } from 'video-react';


 

// const MusicPlayer = ({ props }) => {
//   const audioPlayer = useRef()
//   const videoPlayerRef = useRef()
//   const [currentTimeState, setCurrentTimeState] = useState(0)
//   const [playing, setPlaying] = useState(false);
//   const [playlist, setPlaylist] = useState(props.data);
//   console.log(props.data);
//   const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
//   const handleClickPrevious = () => {
//     setCurrentMusicIndex(
//       currentMusicIndex === 0 ? playlist.length - 1 : currentMusicIndex - 1
//     );
//   };

//   const handleClickNext = () => {
//     setCurrentMusicIndex(
//       currentMusicIndex < playlist.length - 1 ? currentMusicIndex + 1 : 0
//     );
//   };

//   const changeTimeHandler =(e)=>{
//     e.preventDefault();
//     videoPlayerRef.current.seek(audioPlayer.current.audio.current.currentTime)
//     setCurrentTimeState(audioPlayer.current.audio.current.currentTime)
//   }


// function pauseEvent(e){
//   // e.preventDefault();
//   videoPlayerRef.current.pause()
//   console.log(audioPlayer.current)
//   // audioPlayer.current.handlePause()
// }
// function playEvent(e){
//   // e.preventDefault();
//   videoPlayerRef.current.play()
//   // audioPlayer.current
//   // audioPlayer.current.play()

//   console.log(audioPlayer.current)
// }
//   useEffect(()=>{
//       console.log(audioPlayer.current.isPlaying());
//   console.log(audioPlayer.current.audio.current.currentTime)

//     console.log(audioPlayer.current.progressBar.current.ariaValueNow);
//   },)
//   // Console.log(audioPlayer.current.audio.current.currentTime)
//   return (
//     <div
//       style={
//         playing == true
//           ? {
//               background: "url(http://physical-authority.surge.sh/imgs/1.jpg) ",
//             }
//           : {}
//       }
//       className="music-page "
//     >


//       <div className="video-container-playlist">
//       <Player ref={videoPlayerRef} onPause={(e)=>pauseEvent(e)} onPlay={(e)=>playEvent(e)} muted={true} src={playlist[currentMusicIndex]?.url} currentTime={currentTimeState}  >
//       <ControlBar disableCompletely={true} className="my-class" />
//       {/* <source s/> */}

//     </Player>
//       </div>
//       <div className="player">
//         <ul className="player__playlist list">
//           <li className="player__song">
//             <img
//               className="player__img img"
//               src="https://consideringapple.com/wp-content/uploads/2021/12/9f6d075d00d36877f8c0efc5822f956e.jpg"
//               alt="cover"
//             />

//             <p className="player__context">
//               <b className="player__song-name">Your Playlist</b>
//               <span className="flex"></span>
//             </p>
//           </li>

//           {playlist.length > 0 ? (
//             ""
//           ) : (
//             <div>
//               {" "}
//               <p> "Your playlist seem's empty please add some music"</p>
//               <Link href="/"> Go to Marketplace </Link>{" "}
//             </div>
//           )}
//           {playlist.map((song, i) => {
//             return (
//               <li
//                 onClick={() => setCurrentMusicIndex(i)}
//                 className="player__song"
//               >
//                 <img
//                   className="player__img img"
//                   src="http://physical-authority.surge.sh/imgs/1.jpg"
//                   alt="cover"
//                 />

//                 <p className="player__context">
//                   <b className="player__song-name">{song.imageAlt}</b>
//                   <span className="flex">
//                     <span className="player__title">last lings</span>
//                     <span className="player__song-time"></span>
//                   </span>
//                 </p>

//                 <audio
//                   className="audio"
//                   src="http://physical-authority.surge.sh/music/1.mp3"
//                 ></audio>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       <AudioPlayer
//         style={{ top: "100", height: "" }}
//         autoPlay
//         ref={audioPlayer}
//         src={playlist[currentMusicIndex]?.url}
//         onPlay={(e) => playEvent(e)}
//         onPause={(e) => pauseEvent(e)}
//         onClickPrevious={handleClickPrevious}
//         onChange={(e) => console.log(e)}
//         header={"Now playing : " + playlist[currentMusicIndex]?.imageAlt}
//         onClickNext={handleClickNext}
//         onEnded={handleClickNext}
//         autoPlayAfterSrcChange={true}
//         handleKeyDown={(e)=>console.log(e)}
//         showSkipControls={true}
//         showJumpControls={false}
//         // defualtDuration={true}
//         onSeeked={(e) => {changeTimeHandler(e)}}
//         isPlaying={true}
//         showProgress={true}
//       />
//     </div>
//   );
// };

// export default MusicPlayer;
