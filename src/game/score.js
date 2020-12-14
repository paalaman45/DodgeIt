import React from "react";
import firebase from '../axios-instance/firebase'; 


const Score = (props) => {
    const he=props.visible;
    let visible={
        opacity: `${he}%`,
    }
    let data=[];
    firebase.database().ref('playerdata').orderByChild('playerscore').on("value",snapshot=>{
        let playerdata=[];
        snapshot.forEach(snap=>{
            playerdata.push(snap.val());
        })
        data=playerdata;
        console.log(data[0].playername);
    })
    return (
        <div className="scoreBox" style={visible}>
            <h1>Score</h1>
            <button type="button" onClick={props.Goback}>Back</button>
            <div className="scrollable">
                <table>
                    <tbody id="table_output">
                    {
                        data.map(d=>
                            <tr>
                                <td key={d.id}>{d.playername}</td>
                                <td>{d.playerscore}</td>
                            </tr>    
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Score;
