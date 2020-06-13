//@flow
import React, { Component } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
const shaders = Shaders.create({
  Cull: {
  frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
void main() {
gl_FragColor = texture2D(t, uv);
}
` },
});

export const Cull = ({ children: t }) =>
  <Node shader={shaders.Cull} uniforms={{ t }} />;

export default class Example extends Component {
  render() {
    return (
      <Surface width={300} height={300}>
        <Cull>
          {process.env.PUBLIC_URL + '/assets/cull/cull'+Math.floor(Math.random()*6)+'.png'}
        </Cull>
      </Surface>
    );
  }
};
