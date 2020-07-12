import React from 'react';
import Tone from 'tone';
import Island from './island';

class Archipelago extends React.Component {
  constructor(props){
    super(props);
    this.initializePlayer = this.initializePlayer.bind(this);
    this.handlePlayer = this.handlePlayer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      player: new Tone.Player({
      "url" : this.props.audioPath,
      "onload" : this.initializePlayer,
      "loop" : true,
      "fadeIn" : 0,
      "fadeOut" : 0
    }),
      env: new Tone.AmplitudeEnvelope({
        "attack" : 0.1,
        "decay" : 0.1,
        "sustain" : 1.0,
        "release" : 0.3,
      }),
      isZoomed: false,
      islands: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
    this.timer = null;
  }

  initializePlayer() {
      this.state.env.toMaster();
      this.state.env.connect(this.props.gain);
      this.state.player.connect(this.state.env);
  }

  handlePlayer() {
    clearTimeout(this.timer);
    // this.state.player.start();
    this.state.player.start(0, Math.random()*this.state.player.buffer.duration);
    this.state.env.triggerAttack();
    this.timer = setTimeout(() => {
      this.state.env.triggerRelease();
    }, 750);
  }

  handleClick(){
    this.setState({
      isZoomed: !this.state.isZoomed
    });
  }

  render(props) {

    return(
      <span>
        {this.state.islands.map((element, index) => (
            <Island
            key={'island'+index}
            left={this.props.left}
            top={this.props.top}
            density={100}
            width={40}
            height={40}
            onHoverSelect={this.handlePlayer}
            />
        ))}
      </span>
    );
  }
}

export default Archipelago;
