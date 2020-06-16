import React from 'react';
import Territory from './territory';
import AnimateCull from './animate-cull';
import Tone from 'tone';

class Blob extends React.Component {
  constructor(props){
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.playBuf = this.playBuf.bind(this);
    this.state = {
      isHovering: false,
      wasRendered: this.props.renderDefault,
      player: null,
      env: null
    };
  }

  UNSAFE_componentWillReceiveProps(){
    this.setState({
      isHovering: false,
      wasRendered: this.props.renderDefault,
      player: null,
      env: null
    });
  }

  playBuf() {
      this.state.env.connect(this.props.gain);
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
            	"attack" : 0.1,
            	"decay" : 0.2,
            	"sustain" : 1,
            	"release" : 20,
            }),
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

  handleClick() {
    this.props.onBlobSelect(this.props.x, this.props.y);
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

      if (this.state.isHovering && !this.props.zoomedOut){
        var interior = (
                          <AnimateCull
                          meter={this.props.meter}
                          fft={this.props.fft}
                          canvasImg={this.props.imgPath}
                          diameter={this.props.diameter}/>
                      );
      } else {
        var interior = <img className="blogImg" src={this.props.imgPath} alt="cull" style={imageStyle}/>;
      }

    return(
      <div
        className={"blob "+this.props.color}
        style={orientation}
        onMouseOver={this.handleMouseHover}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        >
        { this.state.wasRendered && interior}
      </div>
    );
  }
}

export default Blob;
