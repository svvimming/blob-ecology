import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import Tone from 'tone';

class Oblong extends React.Component {
  constructor(props){
    super(props);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.initializePlayer = this.initializePlayer.bind(this);
    this.state = {
      loaded: false,
      player: new Tone.Player({
      "url" : this.props.audioPath,
      "onload" : this.initializePlayer,
      "loop" : false,
      "retrigger": false,
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
      this.state.env.connect(this.props.gain);
      this.state.player.connect(this.state.env);
      this.setState({
        loaded: true
      });
  }

  handleMouseClick() {
    // 0, Math.random()*this.state.player.buffer.duration
      this.state.player.start();
      this.state.env.triggerAttack();
  }

  handleMouseLeave() {
    this.state.env.triggerRelease();
  }

  render(props) {
    const ready = this.state.loaded ? {display: 'initial'} : {display: 'none'};
    return(
      <Draggable handle=".handle">
        <div className="handle">
          <div
            className={this.props.styleClass}
            style={ready}
            onClick={this.handleMouseClick}
            onMouseLeave={this.handleMouseLeave}
            >
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Oblong;
