import React, {Fragment} from 'react';
import './TapTempo.style.css';

function TapTempo(props){
    const {tapLabel, onTapTempo, clearLabel, onClearTapTempo} = props;

    return (
        <Fragment>
            <div className='tap-tempo-button-container'>
                <input type='button' value={tapLabel} onClick={onTapTempo}/>
            </div>
            <div className='clear-tap-tempo-button-container'>
                <input type='button' value={clearLabel} onClick={onClearTapTempo}/>
            </div>
        </Fragment>
    )
}

export { TapTempo }