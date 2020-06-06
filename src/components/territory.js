import React, { Component } from "react";
import Sketch from "react-p5";
import algae from "../assets/algae.jpg";

export default class Territory extends Component {
  x = 50;
  y = 50;
  source;


  preload = p5 => {
    this.source = p5.loadImage(algae);
    // console.log(this.source);
  }
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(this.props.diameter, this.props.diameter).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };
  draw = p5 => {
    p5.background(this.source);
    p5.stroke(255, 0, 0, 40);
    p5.strokeWeight(this.x);
    p5.ellipse(this.x, this.y, 70, 70);
    // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
    this.x++;
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
