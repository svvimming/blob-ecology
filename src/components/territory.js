import React, { Component } from "react";
import Sketch from "react-p5";
import cull1 from "../assets/cull/cull 1.png";
import cull5 from "../assets/cull/cull 5.png";
import cull6 from "../assets/cull/cull 6.png";
import cull11 from "../assets/cull/cull 11.png";
import cull22 from "../assets/cull/cull 22.png";
import cull24 from "../assets/cull/cull 24.png";
const images = [cull1, cull5, cull6, cull11, cull22, cull24];

export default class Territory extends Component {
  x = 50;
  y = 50;
  source;


  preload = p5 => {
    this.source = p5.loadImage(images[this.props.imgIndex]);
    // console.log(this.source);
  }
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(this.props.diameter+this.x, this.props.diameter+this.y).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };
  draw = p5 => {
    p5.background(this.source);
    // p5.stroke(255, 0, 0, 40);
    // p5.strokeWeight(this.x);
    // p5.ellipse(this.x, this.y, 70, 70);
    // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
    // this.x++;
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
