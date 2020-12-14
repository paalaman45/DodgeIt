import React from "react";
import score from '../img/unnamed.png';
import speed from '../img/speed.png';
const Gameover = (props) => {
    let visible={
        display:`${props.game}`
    }
    return (
        <div className="gameover" style={visible}>
            <ul className="secret">
                <li><h1>GAMEOVER</h1></li>
                <li><img className="score" src={score} alt="Player"/>: {props.score}</li>
                <li><img className="speed" src={speed} alt="Player"/>: {props.speed} ms</li>
                <li><input type="text" placeholder="Enter Player Name" className="player-name" id="txtplayer"  value={props.value} onChange={props.pname}/><button id="btnsave" type="button" className="save" onClick={props.Upload}>Save</button></li>
                <li><button type="button"  onClick={props.gameRestart} >Restart</button></li>
                <li><button type="button"  onClick={props.gameScore} id="btnscore">Score</button></li>
            </ul>
            
        </div>
    );
};

export default Gameover;
