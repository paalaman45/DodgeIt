import React from "react";
const Player = (props) => {
    const he=props.visible;
    const style = {
    left: `${props.left}px`,
    top: `${props.top}px`,
    opacity: `${he}%`,
    }
    const animate={
        left: `${props.animate}px`,
    }
    return (
        <div className="player" style={style}>
            <img src={props.img} alt="Player" height="20" style={animate}/>
        </div>
    );
};

export default Player;
