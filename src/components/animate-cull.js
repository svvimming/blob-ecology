import React, { Component } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import timeLoop from "./timeloop";

//16 is the windowSize in blob.js
const binWidth = (44100/(2*16));
const movements = [0.05, 0.05, 1.0, 0.2, 0.3, 0.5];
const shaders = Shaders.create({
  fftGloop: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform float time, level, throb;
uniform vec3 bins;
vec2 lookup (vec2 offset, float amp2) {
  return mod(
    uv + amp2 * bins.z*throb * vec2(
      cos(bins.x*(uv.x+offset.x)+time),
      sin(bins.y*(uv.y+offset.x)+time)),
    vec2(1.0));
}
void main() {
  vec2 cent = vec2(0.5, 0.5);
  float dist = distance(uv, cent);
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
  var low = bins.slice(0, 5).reduce(function(a, b){return a + b;}, 0);
  var mid = bins.slice(5, 10).reduce(function(a, b){return a + b;}, 0);
  var high = bins.slice(10, 15).reduce(function(a, b){return a + b;}, 0);
  return [low/5, mid/5, high/5];
}

const Cull = timeLoop(({ children: t, time, meter, fft, throb }) =>
  <Node
    shader={shaders.fftGloop}
    uniforms={{
      t,
      time: time / 1000, // seconds is better for float precision
      level: Math.pow(10.0, meter.getLevel()/20.0),
      bins: getBinLevels(fft.getValue()),
      throb: throb
    }}
  />);

export default class AnimateCull extends Component {
  render() {
    return (
        <Surface width={this.props.diameter} height={this.props.diameter}>
          <Cull meter={this.props.meter} fft={this.props.fft} throb={movements[Math.floor(Math.random()*movements.length)]}>
            {this.props.canvasImg}
          </Cull>
        </Surface>
    );
  }
};
