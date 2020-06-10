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
      // fft: new Tone.FFT(windowSize)
    }
  }

  componentDidMount() {
    this.state.follower.connect(this.state.meter);
    // this.state.gain.connect(this.state.fft);
    this.state.gain.connect(this.state.follower);
    this.props.envNode.connect(this.state.gain);
  }

  x = 50;
  y = 50;
  source;
  ssIndex = 0;
  imgBufs = [];
  windowSine = 3;

  preload = p5 => {
    this.source = p5.loadImage(process.env.PUBLIC_URL + this.props.canvasImg);
  }
  setup = (p5, canvasParentRef) => {
    p5.frameRate(20);
    p5.createCanvas(this.props.diameter+this.x, this.props.diameter+this.y).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)

    for(let j=0; j<p5.sqrt(9); j++){
        for(let i=0; i<p5.sqrt(9); i++){
          this.imgBufs[this.ssIndex] = this.source.get(
            p5.floor(i*this.source.width/p5.sqrt(9)),
            p5.floor(j*this.source.height/p5.sqrt(9)),
            p5.floor(this.source.width/p5.sqrt(9)),
            p5.floor(this.source.height/p5.sqrt(9))
          );
          this.ssIndex++;
        }
      }
  };
  draw = p5 => {
    p5.clear();
    var dBfs = this.state.meter.getLevel();
    var level = Math.round(( Math.pow(10, dBfs/20) + Number.EPSILON) *100) / 100;
    var flip = p5.constrain(level*9, 0, 8.999);

    for(let i=0; i<this.imgBufs.length; i++) {
      if(i<=flip && flip<=(i+this.windowSine)) {
        var alpha = p5.sin((p5.PI/this.windowSine)*(flip-i));
        p5.tint(255, 255*alpha);
        p5.image(this.imgBufs[i], 0, 0, p5.width, p5.height);
      }
    }
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
