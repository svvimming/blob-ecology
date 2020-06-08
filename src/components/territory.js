import React, { Component } from "react";
import Sketch from "react-p5";

export default class Territory extends Component {
  x = 50;
  y = 50;
  source;

  preload = p5 => {
    this.source = p5.loadImage(this.props.imgPath);
  }
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(this.props.diameter+this.x, this.props.diameter+this.y).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };
  draw = p5 => {
    p5.background(this.source);
  };

  render() {
    return <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />;
  }
}

// preload={this.preload}
// preload = p5 => {
//   source = p5.loadImage(imagePath);
// }

// canvas.position(this.props.diameter/2, this.props.diameter/2);
