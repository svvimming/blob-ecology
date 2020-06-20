import React from 'react';
import Tone from 'tone';
// import soundfile from '../assets/arp.mp3'

class Territory extends React.Component {
  constructor(props){
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.initializePlayer = this.initializePlayer.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
      }),
      isZoomed: false
    };
  }

  initializePlayer() {
      this.state.env.toMaster();
      this.state.env.connect(this.props.gain);
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

  handleClick(){
    this.setState({
      isZoomed: !this.state.isZoomed
    })
  }

  render(props) {
    const orientation = this.state.loaded ? {
            backgroundPosition: '-'+this.props.x+'px -'+this.props.y+'px',
            width: this.props.diameter+'px',
            height: this.props.diameter+'px',
            left: this.props.x+'px',
            top: this.props.y+'px',
          } : {display: 'none'};

    return(
      <div
        className={"blob"}
        style={orientation}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        >

      </div>
    );
  }
}

export default Territory;
