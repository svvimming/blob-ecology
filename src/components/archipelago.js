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
        "release" : 0.7,
      }),
      isZoomed: false,
      islands: new Array(this.props.amount).fill(0)
    };
    this.timer = null;
  }

  initializePlayer() {
      this.state.env.toMaster();
      this.state.env.connect(this.props.gain);
      this.state.player.connect(this.state.env);
  }

  componentWillUnmount(){
    this.state.player.dispose();
    this.state.env.dispose();
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
            x={this.props.x}
            y={this.props.y}
            classList={this.props.classList}
            density={this.props.density}
            width={this.props.w}
            height={this.props.h}
            imgW={this.props.imgW}
            imgH={this.props.imgH}
            onHoverSelect={this.handlePlayer}
            />
        ))}
      </span>
    );
  }
}

export default Archipelago;
