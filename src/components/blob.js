import React from 'react';
import Territory from './territory';
import Tone from 'tone';

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
      this.state.player.start(0, Math.random()*this.state.player.buffer.duration);
      this.state.env.triggerAttack();
  }

  handleMouseHover() {
    this.setState({
      isHovering: true,
      player: new Tone.Player({
			"url" : this.props.audioPath,
      "onload" : this.playBuf,
      "loop" : true,
      "fadeIn" : 0,
      "fadeOut" : 0
    }),
      env: new Tone.AmplitudeEnvelope({
      	"attack" : 1,
      	"decay" : 0.2,
      	"sustain" : 1,
      	"release" : 20,
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
    const imageStyle = {
      width: this.props.diameter+50+'px',
      height: this.props.diameter+50+'px'
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

          <img
          className="p5canvas"
          src={this.props.imgPath}
          style={imageStyle}/>

        }
      </div>

    );
  }
}

export default Blob;



// <Territory
// className="p5canvas"
// diameter={this.props.diameter}
// imgPath={this.props.imgPath}/>
