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
      isHovering: true,
      player: null,
      env: null
    });
  }

  render(props) {
    const orientation = {
      width: this.props.diameter+'px',
      height: this.props.diameter+'px',
      transform: 'translate('+this.props.x+'px, '+this.props.y+'px) rotate('+this.props.rotation+'deg)',
      borderRadius: ' '+this.props.radii[0]+'% '+this.props.radii[1]+'% '+this.props.radii[2]+'% '+this.props.radii[3]+'% / '+this.props.radii[4]+'% '+this.props.radii[5]+'% '+this.props.radii[6]+'% '+this.props.radii[7]+'%'
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
          className="blogImg"
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
