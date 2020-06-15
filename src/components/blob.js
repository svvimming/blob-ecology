import React from 'react';
import Draggable from 'react-draggable';
import Territory from './territory';
import AnimateCull from './animate-cull';
import Tone from 'tone';

const smoothing = 0.3;
const windowSize = 16; //don't change unless binWidth in animate-cull.js is changed also!

class Blob extends React.Component {
  constructor(props){
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.playBuf = this.playBuf.bind(this);
    this.state = {
      isHovering: false,
      wasRendered: false,
      player: null,
      env: null
    };
  }

  playBuf() {
      this.state.follower.connect(this.state.meter);
      this.state.gain.connect(this.state.fft);
      this.state.gain.connect(this.state.follower);
      this.state.env.connect(this.state.gain);
      this.state.env.toMaster();
      this.state.player.connect(this.state.env);
      this.state.player.start(0, Math.random()*this.state.player.buffer.duration);
      this.state.env.triggerAttack();
  }

  handleMouseHover() {
    if(this.state.player == null) {
      this.setState({
        wasRendered: true,
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
        }),
        follower: new Tone.Follower(smoothing),
        meter: new Tone.Meter(),
        gain: new Tone.Gain(4.0),
        fft: new Tone.FFT(windowSize),
        isHovering: true,
      });
    }
  }

  handleMouseLeave() {
    if (this.state.player != null) {
      this.state.env.triggerRelease();
      this.delayState();
    }
  }

  delayState() {
    setTimeout(() => {
      if(this.state.player != null){this.state.player.dispose();}
      this.setState({
        isHovering: false,
        player: null,
        env: null
    })
  }, 2000);
  }

  handleStop(x, y){
    // this.props.onPositionChange(this.props.id, x, y);
    console.log([this.props.id, x, y]);
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
    if (this.state.isHovering && !this.props.isDraggable){
      var interior = (
                        <AnimateCull
                        meter={this.state.meter}
                        fft={this.state.fft}
                        canvasImg={this.props.imgPath}
                        diameter={this.props.diameter}/>
                    );
    } else {
      var interior = <img className="blogImg" src={this.props.imgPath} alt="cull" style={imageStyle}/>;
    }

    if(this.props.isDraggable){
      var theBlob = (
        <Draggable
        defaultPosition={{x: this.props.x, y: this.props.y}}
        >
          <div
          className={"blob "+this.props.color}
          style={orientation}
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseLeave}
          >
          { this.state.wasRendered && interior}
          </div>
          </Draggable>);
    } else {
      var theBlob = (
        <div
        className={"blob "+this.props.color}
        style={orientation}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseLeave}
        >
        { this.state.wasRendered && interior}
        </div>);
    }

    return(theBlob);
  }
}

export default Blob;

// defaultPosition={{x: this.props.x, y: this.props.y}}
// onStop={this.handleStop}

// onStop={() => this.handleStop(this.position.x, this.position.y)}

// <Territory
// className="p5canvas"
// diameter={this.props.diameter}
// imgPath={this.props.imgPath}/>

// <img
// className="blogImg"
// src={this.props.imgPath}
// style={imageStyle}/>

// <Territory classname="p5canvas" diameter={this.props.diameter} canvasImg={this.props.canvasImg} envNode={this.state.env}/>
// <img className="blogImg" src={this.props.imgPath} alt="cull" style={imageStyle}/>
