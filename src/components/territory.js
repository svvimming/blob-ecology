import React, { Component } from "react";
import Tone from 'tone';
import Sketch from "react-p5";
const smoothing = 0.3;
const windowSize = 64;

export default class Territory extends Component {
  constructor(props){
    super(props);
    this.state = {
      follower: new Tone.Follower(smoothing),
      meter: new Tone.Meter(),
      gain: new Tone.Gain(4.0),
      fft: new Tone.FFT(windowSize)
    }
  }

  componentDidMount() {
    this.state.follower.connect(this.state.meter);
    this.state.gain.connect(this.state.fft);
    this.state.gain.connect(this.state.follower);
    this.props.envNode.connect(this.state.gain);
  }

  x = 50;
  y = 50;
  source;

  preload = p5 => {
    this.source = p5.loadImage(this.props.canvasImg);
  }
  setup = (p5, canvasParentRef) => {
    p5.frameRate(30);
    p5.createCanvas(this.props.diameter+this.x, this.props.diameter+this.y).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };
  draw = p5 => {
    p5.clear();
    var dBfs = this.state.meter.getLevel();
    var level = Math.round(( Math.pow(10, dBfs/20) + Number.EPSILON) *100) / 100;
    p5.textSize(32);
    p5.text(level, 100, 100);
  };

  render() {
    return <Sketch className="p5canvas" preload={this.preload} setup={this.setup} draw={this.draw} />;
  }
}

// preload={this.preload}
// preload = p5 => {
//   source = p5.loadImage(imagePath);
// }

// canvas.position(this.props.diameter/2, this.props.diameter/2);
