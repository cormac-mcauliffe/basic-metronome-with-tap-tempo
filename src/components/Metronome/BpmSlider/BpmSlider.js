import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './BpmSlider.style.css';

// React's synthetic "onMouseX" events only trigger on desktop. Map 'onTouchX' to trigger same callbacks.
function BpmSlider(props) {
    const {bpm, min, max, onSliderChange, onSliderPress, onSliderRelease} = props;
    return (
        <div className='slider-wrapper'>
            <RemoveIcon className='bpm-minus' size='small'/>
            <input type='range' value={bpm} id='bpm-slider' min={min} max={max} step='1' onChange={onSliderChange} onMouseDown={onSliderPress} onMouseUp={onSliderRelease} onTouchStart={onSliderPress} onTouchEnd={onSliderRelease}/>
            <AddIcon className='bpm-plus' size='small'/>
        </div>
    )
}

export { BpmSlider }