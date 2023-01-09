import React, {useState, useEffect, useRef} from 'react'
import {
    styled, Typography, Slider,
    Paper, Stack, Box
} from '@mui/material';



// #region ------------ ICONS ---------
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// #endregion ------------ ICONS ---------




// #region ------- Tracts -------------------------------------------------------


import fade from './music/As You Fade Away - NEFFEX.mp3'
import enough from './music/Enough - NEFFEX.mp3'
import immortal from './music/Immortal - NEFFEX.mp3';
import playDead from './music/Play Dead - NEFFEX.mp3';
import winning from './music/Winning - NEFFEX.mp3';


// #endregion ---------------------------------------------------------------
const Div = styled('div')(({theme}) => ({
  backgroundColor: 'black',
  height:'100vh',
  width:'100vw',
  paddingTop: theme.spacing(6)
}))

const CustomPaper = styled(Paper)(({theme}) => ({
  backgroundColor: '#4c4c4c',
  marginLeft: theme.spacing(6),
  marginRight: theme.spacing(6),
  padding: theme.spacing(2)
}))


const PSlider = styled(Slider)(({theme, ...props}: any) => ({
  color: 'silver',
  height: 2,
  '&:hover': {
      cursor: 'auto',
  },
  '& .MuiSlider-thumb': {
      width: '13px',
      height: '13px',
      display: props.thumbless ? 'none' : 'block',
  }
}))
// #endregion ---------------------------------------------------------------



const playList = [fade, enough, immortal, playDead, winning ]

const Player = () => {
  const audioPlayer: any = useRef()

  const [index, setIndex] = useState(0)

  const [currentSong] = useState(playList[index])
  const [isPlaying, setIsPlaying] = useState(false);


  // volume control
  const [volume, setVolume] = useState(30);
  const [mute, setMute] = useState(false);

  const [elasped, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(()=> {
    if(audioPlayer){
      audioPlayer.current.volume = volume / 100;
    }

  if(isPlaying){
    setInterval(() => {
        const _duration = Math.floor(audioPlayer?.current?.duration);
        const _elasped = Math.floor(audioPlayer?.current?.currentTime);


        setDuration(_duration);
        setElapsed(_elasped);
    }, 100);
  }
  }, [
    volume, isPlaying 
  ]);


function formatTime(time: any): any {
  if(time && !isNaN(time)){
    const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
    const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);

    return `${minutes}:${seconds}`;
  }
   return '00:00';
}




const togglePlay = () => {
  if(!isPlaying) {
      audioPlayer.current.play()
  }else {
      audioPlayer.current.pause()
  }
  setIsPlaying(prev => !prev)
}

const toggleForward = () => {
  audioPlayer.current.currentTime += 10;
}


const togglebBackwared = () => {
  audioPlayer.current.currentTime -= 10
}

const toggleSkipForward = () => {
  if(index > playList.length -1){
    setIndex(0);
    audioPlayer.current.src = playList[0];
    audioPlayer.current.play();
  } else {
    setIndex(prev => prev + 1);
    audioPlayer.current.src = playList [index + 1]
    audioPlayer.current.play()
  }
}


const toggleSkipBackward = () => {
  if(index > 0){
    setIndex(prev => prev - 1);
    audioPlayer.current.src = playList[index -1];
    audioPlayer.current.play();
  } 
}



function VolumesBtns () {
  return mute 
        ? <VolumeOffIcon sx={{color: 'silver', "&:hover": {color: "white" }}} onClick = {() => setMute(!mute)} />
        : volume < 10 ? <VolumeMuteIcon sx={{color: 'silver', "&:hover": {color: "white" }}} onClick = {() => setMute(!mute)} />
        : volume < 65 ? <VolumeMuteIcon sx={{color: 'silver', "&:hover": {color: "white" }}} onClick = {() => setMute(!mute)} />
        : <VolumeUpIcon sx={{color: 'silver', "&:hover": {color: "white" }}} onClick = {() => setMute(!mute)} />
}
 

  return (
    <Div>
      //note here
      <audio src={currentSong} ref={audioPlayer} muted={mute} />
      <CustomPaper>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Stack direction='row' spacing={1}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                width: "25%",
                alignItems: 'center',
              }}
           > 


           <VolumesBtns />
           {/* <VolumeDownIcon sx={{color: "silver", '&:hover': {color: "white"}}} /> */}

          {/* volume control */}
           <PSlider min={0} max={100} value={volume} onChange={(e: any, v: any) => setVolume(v)} />
          </Stack>

          <Stack direction='row' spacing={1}
              sx={{
                display: "flex",
                width: "40%",
                alignItems: 'center',
              }}> 
           
           <SkipPreviousIcon sx={{color: "silver", '&:hover': {color: "white"}}} onClick={toggleSkipBackward} />
           <FastRewindIcon sx={{color: "silver", '&:hover': {color: "white"}}} onClick={togglebBackwared} />

           {!isPlaying
              ?  <PlayArrowIcon fontSize={'large'} sx={{color: "silver", '&:hover': {color: "white"}}} onClick={togglePlay} />
              :  <PauseIcon fontSize={'large'} sx={{color: "silver", '&:hover': {color: "white"}}} onClick={togglePlay} />
           }
           
            <FastForwardIcon sx={{color: "silver", '&:hover': {color: "white"}}} onClick={toggleForward} />
            <SkipNextIcon sx={{color: "silver", '&:hover': {color: "white"}}} onClick={toggleSkipForward} />
          </Stack>

 
          <Stack 
              sx={{
              display: "flex",
              justifyContent: "flex-start",
          }}
          />
        </Box>

        <Stack spacing={1} direction='row' sx={{
          display: 'flex',
          width: '40%',          
          alignItems: "center",
        }}> 
           <Typography sx={{color: "silver"}}>{formatTime(elasped)}</Typography>
           <PSlider thumbless value={elasped} max={duration} />
           <Typography sx={{color: "silver"}}>{formatTime(duration - elasped)}</Typography>
        </Stack>
      </CustomPaper>
    </Div>
  )
}

export default Player
