import React from "react";

const Obstacle = (props) => {
    const he=props.visible;
    const style = {
    left: `${props.left}px`,
    top: `${props.top}px`,
    opacity: `${he}%`,
    }
    return (
        <div className="obstacle" style={style}></div>
    );
};

export default Obstacle;
