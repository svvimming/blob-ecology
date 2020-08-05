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
