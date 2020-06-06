import React, { Component } from "react";
import Sketch from "react-p5";

export default class Territory extends Component {
  x = 50;
  y = 50;

  setup = (p5, canvasParentRef) => {
    let canvas = p5.createCanvas(this.props.diameter, this.props.diameter).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };
  draw = p5 => {
    p5.background(0);
    p5.ellipse(this.x, this.y, 70, 70);
    // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
    this.x++;
  };

  render() {
    return <Sketch  setup={this.setup} draw={this.draw} />;
  }
}

// preload={this.preload}
// preload = p5 => {
//   source = p5.loadImage(imagePath);
// }

// canvas.position(this.props.diameter/2, this.props.diameter/2);
