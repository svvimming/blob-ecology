import React from 'react';
import Draggable from 'react-draggable';
import Tone from 'tone';

const fonts = ['anton', 'arvo', 'courier', 'merriweather', 'nanum', 'source-code'];

class Letter extends React.Component{
  constructor(props){
    super(props);
    this.initializePlayers = this.initializePlayers.bind(this);
    this.handlePlayers = this.handlePlayers.bind(this);
    this.state = {
      isLoaded: false,
      players: new Tone.Players({
          "urls" : {
            v1: this.props.audioPath,
            v2: this.props.audioPath,
            v3: this.props.audioPath
          },
          "onload" : this.initializePlayers,
          "loop" : true,
          "fadeIn" : 0,
          "fadeOut" : 0
      }),
      env: new Tone.AmplitudeEnvelope({
            "attack" : 0.1,
            "decay" : 0.1,
            "sustain" : 1.0,
            "release" : 0.7,
      }),
      letters: this.props.characters,
      startTimes: [...Array(this.props.characters.length)].map(() => Math.random())
    }
    this.voices = ["v1", "v2", "v3"];
    this.cycle = 0;
  }

  initializePlayers() {
      this.state.env.toMaster();
      this.state.env.connect(this.props.gain);
      this.state.players.connect(this.state.env);
      console.log(this.state.players);
      this.setState({
        isLoaded: true
      });
  }

  componentWillUnmount(){
    this.state.players.dispose();
    this.state.env.dispose();
  }

  handlePlayers(ind) {
    clearTimeout(this.timer);
    // this.state.players.start();
    // this.voices[this.cycle]
    this.state.players.player("v1").start(0, this.state.startTimes[ind]);
    this.state.env.triggerAttack();
    this.cycle = ((this.cycle + 1) % 3);
    this.timer = setTimeout(() => {
      this.state.env.triggerRelease();
    }, 750);
  }

      render() {
        const styling = {left: this.props.x+'px', top: this.props.y+'px', transform: this.props.trans};
          return (
            <div className={"abso"} style={styling}>
              {this.state.letters.map((element, index) => (
              <Draggable handle=".handle" key={"drag"+index}>
              <div className={"handle"} key={"handle"+index}>
                <p
                key={"letter"+index}
                className={"testcnv noselect "+fonts[Math.floor(Math.random()*fonts.length)]+" "+this.props.classList}
                onMouseEnter={() => this.handlePlayers(index)}
                style={{
                  left: (50*index+Math.random()*40)+'px',
                  top: (30*Math.sin(0.25*index)+ Math.random()*10)+'px',
                  fontSize: (this.props.fontsize+(Math.floor(this.props.rand*Math.random())))+'px',
                  transform: 'rotate3d('+Math.random()+', '+Math.random()+', '+Math.random()+', '+this.props.orient+'deg)'
                }}
                >{element}
                </p>
                </div>
                </Draggable>
              ))}
            </div>
          );
      }

}

export default Letter;
