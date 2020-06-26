import React from 'react';
import Tone from 'tone';
import AnimateCull from './animate-cull';

class AnimateTerritory extends React.Component {
  constructor(props){
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.initializePlayer = this.initializePlayer.bind(this);
    this.newBufferStart = this.newBufferStart.bind(this);
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
      isZoomed: false,
      start: 0.0
    };
    this.timer = null;
  }

  initializePlayer() {
      this.state.env.toMaster();
      this.state.env.connect(this.props.gain);
      this.state.player.connect(this.state.env);
      this.setState({
        loaded: true
      });
  }

  newBufferStart() {
    this.setState({
      start: Math.random()*this.state.player.buffer.duration
    });
  }

  handleMouseHover() {
    this.state.player.start(0, this.state.start);
    this.state.env.triggerAttack();
    if(this.timer != null){
      clearTimeout(this.timer);
    }
  }

  handleMouseLeave() {
    this.state.env.triggerRelease();
    this.timer = setTimeout(() => this.newBufferStart(), 2000);
  }

  handleClick(){
    this.setState({
      isZoomed: !this.state.isZoomed
    })
  }

  render(props) {
    if(this.state.isZoomed){
      var orientation = this.state.loaded ? {
          width: this.props.diameter+'px',
          height: this.props.diameter+'px',
          left: this.props.x+'px',
          top: this.props.y+'px',
          transform: 'scale(15.0)',
          zIndex: '100',
          borderRadius: ' '+this.props.radii[0]+'% '+this.props.radii[1]+'% '+this.props.radii[2]+'% '+this.props.radii[3]+'% / '+this.props.radii[4]+'% '+this.props.radii[5]+'% '+this.props.radii[6]+'% '+this.props.radii[7]+'%'
        } : {display: 'none'};
      } else {
        var orientation = this.state.loaded ? {
            width: this.props.diameter+'px',
            height: this.props.diameter+'px',
            left: this.props.x+'px',
            top: this.props.y+'px',
            borderRadius: ' '+this.props.radii[0]+'% '+this.props.radii[1]+'% '+this.props.radii[2]+'% '+this.props.radii[3]+'% / '+this.props.radii[4]+'% '+this.props.radii[5]+'% '+this.props.radii[6]+'% '+this.props.radii[7]+'%'
          } : {display: 'none'};
      }
    return(
      <div
        className={"blob "+this.props.color}
        style={orientation}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        >
        <AnimateCull
        diameter={this.props.diameter}
        canvasImg={this.props.imgPath}
        meter={this.props.meter}
        fft={this.props.fft}
        />
      </div>
    );
  }
}

export default AnimateTerritory;
