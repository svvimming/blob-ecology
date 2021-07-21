import React from 'react';
import Tone from 'tone';
import Island from './island';

class Archipelago extends React.Component {
  constructor(props){
    super(props);
    this.initializePlayer = this.initializePlayer.bind(this);
    this.handlePlayer = this.handlePlayer.bind(this);
    this.archipelagoMouseData = this.archipelagoMouseData.bind(this);
    this.state = {
      isLoaded: false,
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
      islands: new Array(this.props.amount).fill(0)
    };
    this.timer = null;
    this.mouseCoords = {x: 0, y:0};
    this.mouseVec = {x:0, y: 0};
  }

  initializePlayer() {
    this.state.env.toMaster();
    this.state.env.connect(this.props.gain);
    this.state.player.connect(this.state.env);
    this.setState({
      isLoaded: true
    });
  }

  componentDidMount(){
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  handleMouseMove = (e) => {
    this.mouseVec = {x: e.pageX - this.mouseCoords.x, y: e.pageY - this.mouseCoords.y};
    this.mouseCoords = {x: e.pageX, y: e.pageY};
  }

  archipelagoMouseData() {
    return this.mouseVec;
  }

  componentWillUnmount(){
    clearTimeout(this.timer);
    this.state.env.dispose();
    this.state.player.dispose();
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

  render(props) {
    const trig = this.state.isLoaded ? this.handlePlayer : null;
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
            onHoverSelect={trig}
            mouseData={() => this.archipelagoMouseData()}
            />
        ))}
      </span>
    );
  }
}

export default Archipelago;
