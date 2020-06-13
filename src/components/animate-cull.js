import React, { Component } from "react";
import Tone from 'tone';
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import timeLoop from "./timeloop";

//16 is the windowSize in blob.js
const binWidth = (44100/(2*16));
//*******************
//in fragment shader function lookup: the 0.05 multiplying bins.z and the 0.0 multiplying the second bins.z can be modulated to intensify the effect
//*******************
const shaders = Shaders.create({
  fftGloop: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform vec2 mouse;
uniform float time, level;
uniform vec3 bins;
vec2 lookup (vec2 offset, float amp2) {
  return mod(
    uv + amp2 * bins.z*0.05 * vec2(
      cos(bins.x*(uv.x+offset.x)+time),
      sin(bins.y*(uv.y+offset.x)+time))
      + vec2(
        bins.z*0.0 * time/10.0,
        0.0),
    vec2(1.0));
}
void main() {
  float dist = distance(uv, mouse);
  float amp2 = pow(1.0 - dist, 2.0);
  float colorSeparation = 0.02 * mix(amp2, 1.0, 0.5);
  vec2 orientation = vec2(1.0, 0.0);
  vec4 cull = vec4(vec3(
    texture2D(t, lookup(colorSeparation * orientation, amp2)).r,
    texture2D(t, lookup(-colorSeparation * orientation, amp2)).g,
    texture2D(t, lookup(vec2(0.0), amp2)).b),
    1.0);
  if(0.25<(cull.r-cull.g)){
    cull.a *= abs(sin(3.1415926538*level/0.5));
  }
  if(0.25<(cull.b-cull.r)){
    cull.a *= abs(sin(3.1415926538*level/0.5 - 0.25));
  }
  if(0.25<(cull.g-cull.b)){
    cull.a *= abs(sin(3.1415926538*level/0.5 - 0.5));
  }
  gl_FragColor = cull;
}
` }
});

function getBinLevels(fftIn){
  var bins = [];
  for(let i=0; i<fftIn.length; i++) {
    bins[i] = Math.pow(10, fftIn[i]/20) * 0.01 * binWidth * (i+1);
  }
  var low = bins.slice(0, 5).reduce(function(a, b){
        return a + b;
    }, 0);

  var mid = bins.slice(5, 10).reduce(function(a, b){
        return a + b;
    }, 0);

  var high = bins.slice(10, 15).reduce(function(a, b){
        return a + b;
    }, 0);
    console.log([low/5, mid/5, high/5]);
  return [low/5, mid/5, high/5];
}

const Cull = timeLoop(({ children: t, time, mouse, meter, fft }) =>
  <Node
    shader={shaders.fftGloop}
    uniforms={{
      t,
      time: time / 1000, // seconds is better for float precision
      mouse,
      level: Math.pow(10.0, meter.getLevel()/20.0),
      bins: getBinLevels(fft.getValue())
    }}
  />);

  // time: time / 1000, // seconds is better for float precision
  // mouse,
  // freq: 10 + 2 * Math.sin(0.0007*time),
  // amp: 0.05 + Math.max(0, 0.03*Math.cos(0.001 * time)),
  // moving: 0,
  // level: Math.pow(10.0, meter.getLevel()/20.0),
  // bins: getBinLevels(fft.getValue())

export default class AnimateCull extends Component {
  constructor(props){
    super(props);
    this.state = {
      mouse: [ 0.5, 0.5 ]
    }
  }

  render() {
    return (
        <Surface width={this.props.diameter} height={this.props.diameter}>
          <Cull mouse={this.state.mouse} meter={this.props.meter} fft={this.props.fft}>
            {this.props.canvasImg}
          </Cull>
        </Surface>
    );
  }
};
