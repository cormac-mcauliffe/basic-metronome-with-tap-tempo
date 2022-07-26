import React, { Fragment } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import IconButton from '@mui/material/IconButton';
import './PlayStop.style.css';

function PlayStop(props) {
    const {playing, onPlay, onStop} = props;

    return (
        <Fragment>
            { playing ? ( <IconButton aria-label='stop' size='small' onClick={onStop}>
                    <StopCircleIcon className='stop-button' style={{ fontSize: 45}}/>
                    </IconButton>
                ) : ( <IconButton aria-label='play' size='small' onClick={onPlay}>
                    <PlayCircleIcon className='play-button' style={{ fontSize: 45}}/>
                    </IconButton>
            )}
        </Fragment>
    )
}

export { PlayStop }