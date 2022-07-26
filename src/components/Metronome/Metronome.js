import React, {useState, useRef} from 'react';
import PlayStop from './PlayStop';
import BpmSlider from './BpmSlider';
import TapTempo from './TapTempo';
import './Metronome.style.css';
import tickWav from "../../services/tick.wav";

function Metronome() {
  
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(60);
  const pause = useRef(false); // Binary toggle for pausing metronome playback while user changes slider position
  const [intervalID, setIntervalID] = useState(0);
  const [tempoArray, setTempoArray] = useState([]); // Store time points of user taps in an array. Allow us to calculate average user-tapped bpm, rather than relying purely on interval between final two taps
  const tickSound = useRef(new Audio(tickWav));

  // Utility functions invoked by event handler callbacks
  const playTick = () => {
    tickSound.current.play();
  };

  const clearPlayback = (intervalID) => {
    setPlaying(false);
    clearInterval(intervalID);
  };

  const tempoToBpm = (arr) => {
    let averageInt = ((arr[arr.length -1] - arr[0]) / (arr.length - 1));
    let averageBpm = Math.round((60 * 1000) / averageInt);
    if(averageBpm < 1) { // Prevent averageBpm ever being zero
      averageBpm = 1;
    };
    return averageBpm;
  };

  // Event handler callbacks
  const onPlay = () => {
    setPlaying(true);
    setIntervalID(
      setInterval(playTick, 1000 * (60 / bpm))
    );
  };

  const onStop = () => {
    clearPlayback(intervalID);
    setTempoArray([]);
  };
  
  const onSliderChange = (event) => {
    setBpm(event.target.value);
  };

  const onSliderPress = () => {
    setTempoArray([]);
    if (playing) {
      pause.current = true;
      clearInterval(intervalID);
    }
  };

  const onSliderRelease = () => {
    if (pause.current) {
      setIntervalID(
        setInterval(playTick, 1000 * (60 / bpm))
      );
      pause.current = false;
    }
  };

  const onTapTempo = () => {
    clearPlayback(intervalID);
    playTick();
    const nextArr = [...tempoArray, performance.now()];
    setTempoArray(nextArr);
    if(nextArr.length > 1) {
      setBpm(tempoToBpm(nextArr));
    };
  };

  const onClearTapTempo = () => {
    clearPlayback(intervalID);
    setTempoArray([]);
  };

  return (
    <div className='metronome-container'>
      <header className='metronome-header'>
        Metronome
      </header>
      <div className='bpm-play'>
        <span className='bpm-display'>
          {`${bpm} BPM`}
        </span>
        <PlayStop playing={playing} onPlay={onPlay} onStop={onStop}/>
      </div>
      <BpmSlider bpm={bpm} min='1' max='218' onSliderChange={onSliderChange} onSliderPress={onSliderPress} onSliderRelease={onSliderRelease}/>
      <TapTempo tapLabel='Tap tempo here 🥁' onTapTempo={onTapTempo} clearLabel='Clear tap tempo 🗑' onClearTapTempo={onClearTapTempo}/>
    </div>
  );
}

export { Metronome };