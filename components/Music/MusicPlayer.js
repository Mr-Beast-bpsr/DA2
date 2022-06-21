import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS



import React,{useState} from 'react'
import Link from 'next/link';

const MusicPlayer = ({props}) => {
  const [playing,setPlaying] = useState(false)
  const [playlist,setPlaylist] = useState(props.data)
console.log(props.data)
  const [currentMusicIndex,setCurrentMusicIndex] = useState(0) 
  const handleClickPrevious = () => {
    setCurrentMusicIndex(currentMusicIndex === 0 ? playlist.length - 1 : currentMusicIndex - 1,
    )
  }

  const handleClickNext = () => {
    setCurrentMusicIndex( currentMusicIndex < playlist.length - 1 ? currentMusicIndex + 1 : 0,
    )
  }
 
  return (
    <div style={playing == true ? {background:"url(http://physical-authority.surge.sh/imgs/1.jpg) "}:{}} className="music-page "> 








<div className="player" >

 
    <ul className="player__playlist list">

    <li   className="player__song">
    <img className="player__img img" src="https://consideringapple.com/wp-content/uploads/2021/12/9f6d075d00d36877f8c0efc5822f956e.jpg" alt="cover"/>


<p className="player__context">

  <b className="player__song-name">Your Playlist</b>
  <span className="flex">


  </span>

</p>


</li>







{playlist.length>0? "":<div> <p>  "Your playlist seem's empty please add some music"</p><Link href="/"> Go to Marketplace </Link> </div>}
{playlist.map((song,i)=>{
return(   <li   onClick={()=>setCurrentMusicIndex(i)} className="player__song">

<img className="player__img img" src="http://physical-authority.surge.sh/imgs/1.jpg" alt="cover"/>

<p className="player__context">

  <b className="player__song-name">{song.imageAlt}</b>
  <span className="flex">

    <span className="player__title">last lings</span>
    <span className="player__song-time"></span>

  </span>

</p>

<audio className="audio" src="http://physical-authority.surge.sh/music/1.mp3"></audio>

</li>

)
})}


    </ul>

  </div>









    <AudioPlayer  
    style={{top:"100", height:""}}
    autoPlay
    src={playlist[currentMusicIndex]?.url}
    onPlay={e => setPlaying(true)}
    onPause={e => setPlaying(false)}
    onClickPrevious={handleClickPrevious}
    header={"Now playing : " + playlist[currentMusicIndex]?.imageAlt}
          onClickNext={handleClickNext}
          onEnded={handleClickNext}
          autoPlayAfterSrcChange={true}
          showSkipControls={true}
          showJumpControls={false}
    // other props here
    />
    </div>
  )
}

export default MusicPlayer
