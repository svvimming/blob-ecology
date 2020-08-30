import React from 'react';
// import Draggable from 'react-draggable';
import Tone from 'tone';

class Oblong extends React.Component {
  constructor(props){
    super(props);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.initializePlayer = this.initializePlayer.bind(this);
    this.state = {
      isPlaying: false,
      isLoaded: false,
      player: new Tone.Player({
      "url" : this.props.audioPath,
      "onload" : this.initializePlayer,
      "loop" : true,
      "retrigger": true,
      "fadeIn" : 0,
      "fadeOut" : 0
    }),
      env: new Tone.AmplitudeEnvelope({
        "attack" : 0.1,
        "decay" : 0.2,
        "sustain" : 1.0,
        "release" : 0.7,
      })
    };
  }

  initializePlayer() {
      this.state.env.toMaster();
      this.state.env.connect(this.props.gain);
      this.state.player.connect(this.state.env);
      this.setState({
        isLoaded: true
      });
  }

  componentWillUnmount(){
    this.state.player.dispose();
    this.state.env.dispose();
  }

  handleMouseClick() {
      if(this.state.isPlaying){
        this.state.env.triggerRelease();
        this.setState({
          isPlaying: !this.state.isPlaying
        });
      } else {
        this.state.player.start(0, this.props.startTime*this.state.player.buffer.duration);
        this.state.env.triggerAttack();
        this.setState({
          isPlaying: !this.state.isPlaying
        });
      }
  }

  render(props) {
    const view = this.state.isLoaded ? " " : "byebye";
    const animation = this.state.isPlaying ? "oblong-light" : " ";
    return(
          <div
            className={"abso oblong handle "+this.props.classList+view}
            style={{left: this.props.x+'px', top: this.props.y+'px'}}
            onClick={this.handleMouseClick}
            >
            <img
            className={animation}
            style={{width: this.props.width+'px', height: this.props.height+'px'}}
            src={this.props.imgPath}
            alt="okie"></img>
          </div>
    );
  }
}

export default Oblong;

// <Draggable handle=".handle">
//         </Draggable>
