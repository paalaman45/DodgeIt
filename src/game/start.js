import React from "react";
import AC from '../img/ac.png';
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
                <img src={AC} alt="ac" height="100px"/>
                <li><h1 className='title'>Dodge <span className="it">It</span></h1></li>
                <li><input type="button" value="Play" onClick={props.gameStart} className="btnplay"/></li>
                <li><input type="button" value="Score" onClick={props.gameScore}/></li>
            </ul>
        </div>
    );
};

export default Start;
