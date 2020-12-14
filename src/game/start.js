import React from "react";
const Start = (props) => {
    const he=props.visible;
    let none;
    if(he===0){
        none="none";
    }else{
        none="";
    }
    let visible={
        display:`${none}`,
        opacity: `${he}%`,
    }
    return (
        <div className="start" style={visible}>
            <ul className="menus" id="menus">
                <li><h1>Dodge It!</h1></li>
                <li><input type="button" value="Play" onClick={props.gameStart} className="btnplay"/></li>
                <li><input type="button" value="Score" onClick={props.gameScore}/></li>
            </ul>
        </div>
    );
};

export default Start;
