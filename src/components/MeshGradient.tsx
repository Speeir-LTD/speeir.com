"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0,1);}`;

const FRAG = `
precision mediump float;
uniform float u_t;
uniform vec2 u_res;

vec3 perm(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}

float snoise(vec2 v){
  const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1,0):vec2(0,1);
  vec4 x12=x0.xyxy+C.xxzz;
  x12.xy-=i1;
  i=mod(i,289.0);
  vec3 p=perm(perm(i.y+vec3(0,i1.y,1))+i.x+vec3(0,i1.x,1));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m;m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-.5;
  vec3 ox=floor(x+.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float t=u_t*.18;

  vec3 white=vec3(1.0,.98,1.0);
  vec3 lav=vec3(.85,.82,.92);
  vec3 pur1=vec3(.631,.373,.863);
  vec3 pur2=vec3(.58,.28,.78);

  // Large slow-moving blobs for the base shape
  float b1=snoise(uv*1.2+vec2(t*.6,t*.4))*.5+.5;
  float b2=snoise(uv*1.0+vec2(-t*.5,t*.7))*.5+.5;

  // Distort UV for swirl effect
  vec2 duv=uv;
  duv.x+=snoise(uv*1.5+vec2(t*.3,0.0))*.1;
  duv.y+=snoise(uv*1.5+vec2(0.0,t*.4))*.1;

  // Detail noise layers on distorted coords
  float n1=snoise(duv*1.8+vec2(t*.7,t*.5))*.5+.5;
  float n2=snoise(duv*1.4+vec2(-t*.6,t*.3))*.5+.5;
  float n3=snoise(duv*2.2+vec2(t*.4,-t*.5))*.5+.5;

  // Start with white/lavender base
  vec3 c=mix(white,lav,.4);

  // Blend in purple blobs — dialed back
  c=mix(c,pur1,smoothstep(.35,.7,b1)*.55);
  c=mix(c,pur2,smoothstep(.45,.75,n1)*.35);

  // White streaks
  c=mix(c,white,smoothstep(.4,.8,b2)*.85);
  c=mix(c,white,smoothstep(.45,.85,n2)*.6);

  // Gentle purple edges
  c=mix(c,pur1,smoothstep(.6,.9,n3)*.25);

  // Subtle vignette
  float vig=1.0-.15*length(uv-vec2(.5));
  c*=vig;

  // Grain
  float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
  c+=(grain-.5)*.03;

  gl_FragColor=vec4(c,1);
}
`;

export function MeshGradient({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;

    const gl = cvs.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const pgm = gl.createProgram()!;
    gl.attachShader(pgm, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(pgm, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(pgm);
    gl.useProgram(pgm);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(pgm, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uT = gl.getUniformLocation(pgm, "u_t");
    const uRes = gl.getUniformLocation(pgm, "u_res");

    let id: number;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 1.5);
      const { width, height } = cvs.parentElement!.getBoundingClientRect();
      cvs.width = width * dpr;
      cvs.height = height * dpr;
      gl.viewport(0, 0, cvs.width, cvs.height);
      gl.uniform2f(uRes, cvs.width, cvs.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (t: number) => {
      gl.uniform1f(uT, prefersReduced ? 0 : t * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      id = requestAnimationFrame(draw);
    };

    id = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
