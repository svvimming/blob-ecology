import React from 'react';
import Tone from 'tone';
// import soundfile from '../assets/arp.mp3'

class Territory extends React.Component {
  constructor(props){
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.initializePlayer = this.initializePlayer.bind(this);
    this.state = {
      loaded: false,
      isHovering: false,
      player: new Tone.Player({
      "url" : this.props.audioPath,
      "onload" : this.initializePlayer,
      "loop" : true,
      "fadeIn" : 0,
      "fadeOut" : 0
    }),
      env: new Tone.AmplitudeEnvelope({
        "attack" : 0.1,
        "decay" : 0.2,
        "sustain" : 1,
        "release" : 2,
      })
    };
  }

  initializePlayer() {
      this.state.env.toMaster();
      this.state.player.connect(this.state.env);
      this.setState({
        loaded: true
      });
  }

  handleMouseHover() {
    this.state.player.start(0, Math.random()*this.state.player.buffer.duration);
    this.state.env.triggerAttack();
  }

  handleMouseLeave() {
    this.state.env.triggerRelease();
  }

  render(props) {
    const orientation = this.state.loaded ? {
      width: this.props.diameter+'px',
      height: this.props.diameter+'px',
      transform: 'translate('+this.props.x+'px, '+this.props.y+'px) rotate('+this.props.rotation+'deg)',
      borderRadius: ' '+this.props.radii[0]+'% '+this.props.radii[1]+'% '+this.props.radii[2]+'% '+this.props.radii[3]+'% / '+this.props.radii[4]+'% '+this.props.radii[5]+'% '+this.props.radii[6]+'% '+this.props.radii[7]+'%'
    } : {display: 'none'};
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
        <img className="blogImg" src={this.props.imgPath} alt="cull" style={imageStyle}/>
      </div>
    );
  }
}

export default Territory;
