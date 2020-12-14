import React, {Component} from 'react';
import './App.css';
import Player from './game/character';
import Obstacle from './game/obstacle';
import score from './img/unnamed.png';
import speed from './img/speed.png';
import life from './img/heart.png';
import Gameover from './game/gameover';
import Start from './game/start';
import RightSprite from './img/sprite.png';
import LeftSprite from './img/sprite2.png';
import Stand from './img/player-stand.png';
import Stand2 from './img/player-stand2.png';
import Score from './game/score';
import JumpR from './img/fly-right.png';
import JumpL from './img/fly-left.png';
import axios from './axios-instance/axios-instance';

const getRandomPosition = (e)=>{
  let leftrandom=Math.floor((Math.random() * 41)+1);
  let left=leftrandom*20;
  return left;
}

class App extends Component{
   state={
    //playerPos: getRandomPosition(),
    playerScore: 0,
    playerSpeed:10,
    playerLife: 5,
    playerTop: 260,//260
    playerLeft: -200,
    direction: "RIGHT",
    animatePos: 0,
    obstacleTop: -100,
    obstacleLeft: 80,
    gameOver: false,
    gameStop: 20,
    gameoverDisplay:"none",
    DisplayAll: 0,
    Screen: "",
    animation: "pause",
    img:Stand,
    StartD: 100,
    ScoreDisplay: 100,
    Scoreindex: 50,
    facing: "right",
    jump: false,
    playername: "",
    scoredata: null,
    playerData : [],
    testing:[{
      "-MO-TPb6vLG_rrqUafA-":
        {
          "playername":"Kissel James Paalaman",
          "playerscore":691
        },
      "-MO-T_89ZxKvE2BUNePq":
        {
          "playername":"James",
          "playerscore":1037
        },
      "-MO1DKl-Ueh8hxc5y8QC":
        {
          "playername":"Kissel James",
          "playerscore":1316
        }
    }]
  }
  componentDidMount(){
      this.GAME();
  }
  GAME(){
      if(this.state.gameOver===false){
        setInterval(this.componentScore, this.state.playerSpeed);
        setInterval(this.componentFallingObstacle, this.state.playerSpeed);
        setInterval(this.checkCollide, 1);
        setInterval(this.componentSpeed, this.state.playerSpeed);
        document.onkeydown=this.onKeyDown;
        setInterval(this.componentAnimation,100);
        setInterval(this.jump,15);
        console.log(this.state.gameOver);
      }
  }
  checkCollide=(e)=>{
    let topObstacle=this.state.obstacleTop;
    let leftObstacle=this.state.obstacleLeft;
    let leftPlayer=this.state.playerLeft;
    let tmpleft1=leftObstacle-20;
    let tmpleft2=leftObstacle-40;
    let tmpleft3=leftObstacle-60;
    let tmpright1=leftObstacle+20;
    let tmpright2=leftObstacle+40;
    let tmpright3=leftObstacle+60;
    let random;
    let HP=this.state.playerLife;
      //((topObstacle>=topPlayer)&&(topObstacle+20<=topPlayer))
      //((leftObstacle>=leftPlayer)&&(leftObstacle+80<=leftPlayer))
      if((topObstacle>=165)&&((tmpright1===leftPlayer)||(tmpright2===leftPlayer)||(tmpright3===leftPlayer)||(tmpleft1===leftPlayer)||(tmpleft2===leftPlayer)||(tmpleft3===leftPlayer)||(leftObstacle===leftPlayer))){
      random=getRandomPosition();
      this.setState({obstacleLeft: random});
      this.setState({obstacleTop: -100});
      HP-=1;
      if(HP<=0){
        this.setState({playerLeft: -200});
        this.setState({playerTop: 160});
        this.setState({animation:"pause"});
        this.setState({gameOver: true});
        this.setState({gameoverDisplay: ""});
        this.setState({DisplayAll: 0});

        //This will send the data
      } 
        this.setState({playerLife: HP});
      }
    
  }
  componentFallingObstacle=(e)=>{
    let top=this.state.obstacleTop;
    let random;
    top+=5;
    if(top>=240){
      top=-100;
      random=getRandomPosition();
      this.setState({obstacleLeft: random});
    }
    this.setState({obstacleTop: top});
  }
  componentScore=(e)=>{
    let timer=this.state.playerScore;
    if(this.state.gameOver!==true){
      timer+=1;
      this.setState({playerScore: timer});
    }
  }
  jump=(e)=>{
    let currentTop=this.state.playerTop;
    let currentLeft=this.state.playerLeft;
    let direction=this.state.direction;
    let animation=this.state.animation;
    let facing=this.state.facing;
    let jump=this.state.jump;
    if((direction==="UP")&&(animation==="pause")&&(facing==="right")){
      this.setState({img: JumpR});
      if((jump===true)&&(currentTop!==160)){
        currentTop-=10; 
        currentLeft+=10;    
      }else{
        jump=false;
      } 
      if((jump===false)&&(currentTop!==260)){
        currentTop+=10;
        this.setState({img: Stand});
      }
      if(currentTop===260){
        this.setState({img: RightSprite});
        direction="RIGHT";
        this.setState({animation: "play"});
        this.setState({animatePos: 0});
      }
    }
    if((direction==="UP")&&(animation==="pause")&&(facing==="left")){
      this.setState({img: JumpL});
      if((jump===true)&&(currentTop!==160)){
        currentTop-=10;     
        currentLeft-=10;
      }else{
        jump=false;
      } 
      if((jump===false)&&(currentTop!==260)){
        currentTop+=10;
        this.setState({img: Stand2});
      }
      if(currentTop===260){
        this.setState({img: LeftSprite});
        direction="LEFT";
        this.setState({animation: "play"});
        this.setState({animatePos: -560});
      }
    }
    
    //console.log("Direction: "+this.state.direction);
    //console.log("ANIMATION POS: "+this.state.animatePos);
    this.setState({playerTop: currentTop}); 
    this.setState({playerLeft: currentLeft});
    this.setState({direction: direction});
    this.setState({jump: jump}); 
  }
  componentstopAnimate=(e)=>{ 
    this.setState({animation:"pause"});
    if(this.state.direction==="RIGHT"){
      this.setState({animatePos:0});
    }else{
      this.setState({animatePos:-640});
    }
  }
  
  componentAnimation=(e)=>{
    let currentLeft=this.state.playerLeft;
    let position=this.state.animatePos;
    let animation=this.state.animation;
    let direction=this.state.direction;
    let gameover=this.state.gameOver;
    if(this.state.direction!=="UP"){
      if((animation==="play")&&(direction==="RIGHT")&&(gameover!==true)){
        currentLeft+=20;
        if(currentLeft>=740){
          currentLeft=740;
          this.setState({direction: "LEFT"});
          this.setState({facing: "left"});
          this.setState({img: LeftSprite});
        }
        this.setState({playerLeft:currentLeft});
        switch(position){
          case 0:
              position-=80;
              break;
          case -80:
              position-=80;
              break;
          case -160:
              position-=80;
              break;
          case -240:
              position-=80;
              break;
          case -320:
              position-=80;
              break;
          case -400:
              position-=80;
              break;
          case -480:
              position-=80;
              break;
          case -560:
              position=0;
              break;
          default:
              position=0;
        }
      }
      if((animation==="play")&&(direction==="LEFT")&&(gameover!==true)){
        currentLeft-=20;
        if(currentLeft<=0){
          currentLeft=0;
          this.setState({direction: "RIGHT"});
          this.setState({facing: "right"});
          this.setState({img: RightSprite});
        }
        this.setState({playerLeft:currentLeft});
        //console.log(position);
        switch(position){
          case -560:
              position+=80;
              break;
          case -480:
              position+=80;
              break;
          case -400:
              position+=80;
              break;
          case -320:
              position+=80;
              break;
          case -240:
              position+=80;
              break;
          case -160:
              position+=80;
              break;
          case -80:
              position+=80;
              break;
          case 0:
              position=-560;
              break;
          default:
              position=-560;
        }
      }
    }
    this.setState({animatePos: position});
  }
  onKeyDown = (e) =>{
    switch (e.keyCode) {
      case 38:
        if(this.state.playerTop===260){
          this.setState({direction: 'UP'});
          this.setState({animation:"pause"});
          this.setState({animatePos: 0});
          this.setState({jump: true});
          this.setState({playerTop: this.state.playerTop-10}); 
        }
        break;
      case 37:
        if(this.state.playerTop===260){
          this.setState({animation:"play"});
          this.setState({direction: 'LEFT'});
          this.setState({facing: 'left'});
          this.setState({img: LeftSprite});
        }
        break;
      case 39:
        if(this.state.playerTop===260){
          this.setState({animation:"play"});
          this.setState({direction: 'RIGHT'});  
          this.setState({img: RightSprite});
          this.setState({facing: 'right'});
        }
        break;
      default:
        this.setState({animation:"pause "});
        if(this.state.direction==="LEFT"){
          this.setState({img: Stand2});
          this.setState({animatePos:0});
          this.componentAnimation();
        }else if(this.state.direction==="RIGHT"){
          this.setState({animatePos:0});
          this.setState({img: Stand});
          this.componentAnimation();
        }
    }
  }
  gameRestart = (e) =>{
    this.setState({gameoverDisplay: "none"});
    this.setState({playerScore: 0});
    this.setState({playerSpeed: 10});
    this.setState({playerLife: 5});
    this.setState({animate: 0});
    this.setState({obstacleTop: -100});
    this.setState({gameOver: false});
    this.setState({DisplayAll: 100});
    this.setState({playerLeft: 0});
    this.setState({ScoreDisplay:0});
    this.setState({playerLeft: 0});
    this.setState({playerTop: 260});
  }
  SaveRecord = (event) =>{
    this.setState({ playername: event.target.value });
  }
  
  Upload=(e)=>{
    alert("Successfully Saved!");
    const data={
      playername: this.state.playername,
      playerscore: this.state.playerScore
    }
    //Store
    axios.post('/playerdata.json',data)
    .then(response=>console.log(response))
    .catch(error=>console.log(error));
    
    axios.get('https://dodgeit-dc4ef-default-rtdb.firebaseio.com/playerdata.json')
    .then(res=>{
      console.log(res);
      console.log(res.data);
    });
  }
  gameStart = (e) =>{
    this.setState({gameoverDisplay: "none"});
    this.setState({playerLeft: 0});
    this.setState({playerScore: 0});
    this.setState({playerSpeed: 10});
    this.setState({playerLife: 5});
    this.setState({animate: 0});
    this.setState({obstacleTop: -100});
    this.setState({gameOver: false});
    this.setState({DisplayAll: 100});
    this.setState({playerLeft: 0});
    this.setState({StartD: 0});
    this.setState({ScoreDisplay:0});
    this.setState({playerTop: 260});
  }
  gameScore = (e) =>{
    this.setState({gameoverDisplay: "none"});
    this.setState({DisplayAll: 0});
    this.setState({StartD: 0});
    this.setState({ScoreDisplay: 100});
  }
  Goback = (e) =>{
    this.setState({DisplayAll: 0});
    this.setState({playerLeft: 0});
    this.setState({StartD: 100});
    this.setState({ScoreDisplay:0});
  }
  
  render(){
    return(
      <div className="screen">
        <div className="game_info" style={{opacity: this.state.DisplayAll}}>
          <ul>
            <li><img className="score" src={score} alt="Player"/> {this.state.playerScore}</li>
            <li><img className="speed" src={speed} alt="Player"/> {this.state.playerSpeed} ms</li>
            <li><img className="life" src={life} alt="Player"/> {this.state.playerLife}</li>
          </ul>
        </div>
        <div className="game_screen" >
          <Player img={this.state.img} top={this.state.playerTop} left={this.state.playerLeft} animate={this.state.animatePos} visible={this.state.DisplayAll} animation={this.state.animation} />
          <Start gameStart={this.gameStart} visible={this.state.StartD} gameScore={this.gameScore} />
          <Score visible={this.state.ScoreDisplay} Goback={this.Goback} scoreData={this.state.scoredata}/>
          <Gameover value={this.state.playername} pname={this.SaveRecord} game={this.state.gameoverDisplay} gameRestart={this.gameRestart} score={this.state.playerScore} speed={this.state.playerSpeed} gameScore={this.gameScore} SaveRecord={this.SaveRecord} Upload={this.Upload}/>
          <Obstacle top={this.state.obstacleTop} left={this.state.obstacleLeft} visible={this.state.DisplayAll} />
        </div>

      </div>
    );
  }
}

export default App;
