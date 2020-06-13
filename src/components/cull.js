import React, { Component } from "react";
import Tone from 'tone';
import Sketch from "react-p5";

const smoothing = 0.3;
const windowSize = 64;


export default class Cull extends Component {
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
  cullShader;
  source;
  ssIndex = 0;
  imgBufs = [];
  windowSine = 3;

  preload = p5 => {
    this.cullShader = p5.loadShader(process.env.PUBLIC_URL + '/assets/vertexFFT.vert', process.env.PUBLIC_URL + '/assets/fragmentFFT.frag');
    this.source = p5.loadImage(this.props.canvasImg);
  }
  setup = (p5, canvasParentRef) => {
    p5.frameRate(20);
    p5.createCanvas(this.props.diameter+this.x, this.props.diameter+this.y, p5.WEBGL).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    p5.noStroke();
  };
  draw = p5 => {
    p5.clear();
    var dBfs = this.state.meter.getLevel();
    var level = Math.round(( Math.pow(10, dBfs/20) + Number.EPSILON) *100) / 100;

    this.cullShader.setUniform('cullTex', this.source);
    this.cullShader.setUniform('ampFloat', level);
    this.cullShader.setUniform('bins', [1.0, 1.0, 1.0]);

    p5.shader(this.cullShader);
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
