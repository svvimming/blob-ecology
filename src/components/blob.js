import React from 'react';
import Territory from './territory';
import Tone from 'tone';
import errlymixx from "../assets/a-long-walk-to-somewhere-close-errlymixx.mp3";

class Blob extends React.Component {
  constructor(props){
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.playBuf = this.playBuf.bind(this);
    this.state = {
      isHovering: false,
      player: null,
      env: null
    };
  }

  playBuf() {
      this.state.env.toMaster();
      this.state.player.connect(this.state.env);
      this.state.player.start();
      this.state.env.triggerAttack();
  }

  handleMouseHover() {
    this.setState({
      isHovering: true,
      player: new Tone.Player({
			"url" : errlymixx,
      "onload" : this.playBuf,
      "fadeIn" : 0,
      "fadeOut" : 0
    }),
      env: new Tone.AmplitudeEnvelope({
      	"attack" : 1,
      	"decay" : 0.2,
      	"sustain" : 1,
      	"release" : 10,
      })
    });
  }

  handleMouseLeave() {
    this.state.env.triggerRelease();
    this.setState({
      isHovering: false,
      player: null,
      env: null
    });
  }

  render(props) {
    const orientation = {
      width: this.props.diameter+'px',
      height: this.props.diameter+'px',
      transform: 'translate('+this.props.x+'px, '+this.props.y+'px) rotate('+90*Math.random()+'deg)',
      borderRadius: ' '+60*Math.random()+15+'% '+60*Math.random()+15+'% '+60*Math.random()+15+'% '+60*Math.random()+15+'% / '+60*Math.random()+15+'% '+60*Math.random()+15+'% '+60*Math.random()+15+'% '+60*Math.random()+15+'%'
    }
    return(
      <div
      className={"blob "+this.props.color}
      style={orientation}
      onMouseEnter={this.handleMouseHover}
      onMouseLeave={this.handleMouseLeave}
      >
      {
        this.state.isHovering &&

          <Territory
          className="p5canvas"
          diameter={this.props.diameter}
          imgIndex={this.props.imgIndex}/>

        }
      </div>

    );
  }
}

export default Blob;

// onMouseOver={() => this.setState({ text: 'hola'})}
// onMouseOut={() =>this.setState({text: ''})}
// <Fuites
// diameter={this.props.diameter}/>

// <Territory
// className="p5canvas"
// diameter={this.props.diameter}/>
