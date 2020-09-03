import React, { Component } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import timeLoop from "./timeloop";

//16 is the windowSize in blob.js
const binWidth = (44100/(2*16));
const squiggly = Shaders.create({
  fftGloop: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform sampler2D t;
    uniform float time, throb;

    void main() {

      vec2 ij = vec2(uv.x, uv.y);

      ij.x += cos(time + uv.x * 10.0) * 0.05 * throb;
      ij.y -= sin(time + uv.y * 11.0) * 0.04 * throb;

      vec4 img = vec4(texture2D(t, ij));

      gl_FragColor = img;
    }
` }
});

const culling = Shaders.create({
  fftGloop: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform sampler2D t;
    uniform vec2 mouse;
    uniform float time, level, throb;
    uniform vec3 bins;
    vec2 lookup (vec2 offset, float amp2) {
      return uv + amp2 * bins.z*throb * vec2(cos(bins.x*(uv.x+offset.x)+time), sin(bins.y*(uv.y+offset.x)+time));
    }
    void main() {
      float dist = distance(uv, mouse*0.5);
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
      cull.a *= 1.0 - pow((0.5*sin((2.0*uv.x*3.1415926538)+(3.1415926538/2.0))+0.5), 10.0);
      cull.a *= 1.0 - pow((0.5*sin((2.0*uv.y*3.1415926538)+(3.1415926538/2.0))+0.5), 10.0);

      gl_FragColor = cull;
    }
` }
});

// const squiggly = Shaders.create({
//   fftGloop: {
//     frag: GLSL`
//     precision highp float;
//     varying vec2 uv;
//     uniform sampler2D t;
//     uniform float time;
//
//     float rand(float n){
//       return fract(sin(n) * 43758.5453123);
//     }
//     float noise(float p){
//     	float fl = floor(p);
//       float fc = fract(p);
//     	return mix(rand(fl), rand(fl + 1.0), fc);
//     }
//
//     void main(){
//         vec2 ij = vec2(uv.x, uv.y);
//         ij.x += 0.2 * sin(time + ij.y * 4.0);
//         float numLines = 15. + ij.y * 0.4;
//         float colNoise = noise(0.6 * ij.x * numLines);
//         float colStripes = 0.5 + 0.5 * sin(ij.x * numLines * 0.75);
//         float col = mix(colNoise, colStripes, 0.5 + 0.5 * sin(time));
//         float aA = 1./(2560.0 * 0.005) ;
//         col = smoothstep(0.5 - aA, 0.5 + aA, col);
//         vec4 img = vec4(texture2D(t, ij));
//     	gl_FragColor = vec4(vec3(col),1.0);
//     }
// ` }
// });


const shaders = [culling, squiggly];

function getBinLevels(fftIn){
  var bins = [];
  for(let i=0; i<fftIn.length; i++) {
    bins[i] = Math.pow(10, fftIn[i]/20) * 0.001 * binWidth * (i+1);
  }
  var low = bins.slice(0, 5).reduce(function(a, b){return a + b;}, 0);
  var mid = bins.slice(5, 10).reduce(function(a, b){return a + b;}, 0);
  var high = bins.slice(10, 15).reduce(function(a, b){return a + b;}, 0);
  return [high/5, mid/5, Math.max(low/5, 0.1)];
}

const Cullshader = timeLoop(({ children: t, time, mouse, meter, fft, throb }) =>
  <Node
    shader={culling.fftGloop}
    uniforms={{
      t,
      time: time / 10000,
      mouse,
      bins: getBinLevels(fft.getValue()),
      level: 0.05 + Math.max(0, 0.03*Math.cos(0.001 * time)),
      throb: throb,
    }}
  />);

  const SquidgeShader = timeLoop(({ children: t, time, throb}) =>
    <Node
      shader={squiggly.fftGloop}
      uniforms={{ t, time: time / 1000, throb: throb }}
    />);

export default class Cull extends Component {
  constructor(props){
    super(props);
    this.state = {
    mouse: [0.5, 0.5],
    shader: this.props.shaderNo
    }
  }

  render() {
    const styling = {left: this.props.x+'px', top: this.props.y+'px'};
    const {mouse} = this.state;
    if (this.state.shader === 0) {
      var shaderType = (
        <Cullshader
        mouse={mouse}
        meter={this.props.meter}
        fft={this.props.fft}
        throb={this.props.movement}
        >
          {this.props.canvasImg}
        </Cullshader>
      );
    } else if (this.state.shader === 1) {
      var shaderType = (
        <SquidgeShader
        throb={0.15}
        >
          {this.props.canvasImg}
        </SquidgeShader>
      );
    }
    return (
      <div className={"abso "+this.props.classList} style={styling}>
        <Surface width={this.props.width} height={this.props.height} onMouseMove={this.onMouseMove}>
          {shaderType}
        </Surface>
      </div>
    );
  }
  onMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    this.setState({
      mouse: [
        (e.clientX - rect.left) / rect.width,
        (rect.bottom - e.clientY) / rect.height,
      ]
    });
  }
};


//FOR USING WITH FFT & TONE
// level: Math.pow(10.0, meter.getLevel()/20.0),
// bins: getBinLevels(fft.getValue()),
// throb: throb

// bins: [0.0, 0.0, 0.1],
