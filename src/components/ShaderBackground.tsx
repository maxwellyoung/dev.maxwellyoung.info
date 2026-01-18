"use client";

import React, { useEffect, useRef } from "react";

type Uniforms = {
  seed?: number;
  colorA?: string; // css color string, converted to vec3 0..1
  colorB?: string; // css color string, converted to vec3 0..1
};

type Props = {
  className?: string;
  frag: string; // GLSL ES 1.00 fragment shader source
  uniforms?: Uniforms;
};

function parseColorToVec3(
  input: string | undefined,
  fallback: [number, number, number]
): [number, number, number] {
  if (!input) return fallback;
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return fallback;
  ctx.fillStyle = input;
  const computed = ctx.fillStyle as string;
  // Create a 1x1 canvas to parse
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const g = c.getContext("2d");
  if (!g) return fallback;
  g.fillStyle = computed;
  g.fillRect(0, 0, 1, 1);
  const data = g.getImageData(0, 0, 1, 1).data;
  return [data[0] / 255, data[1] / 255, data[2] / 255];
}

export default function ShaderBackground({
  className = "",
  frag,
  uniforms = {},
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const fpsSamples = useRef<number[]>([]);
  const detailRef = useRef<number>(1);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const glCtx = canvas.getContext("webgl");
    if (!glCtx) return;
    const gl = glCtx as WebGLRenderingContext;

    // Vertex shader (full-screen quad)
    const vsrc = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    function compileShader(type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Shader compile error:", gl.getShaderInfoLog(shader));
        }
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(vsSource: string, fsSource: string) {
      const vs = compileShader(gl.VERTEX_SHADER, vsSource);
      const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return null;
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Program link error:", gl.getProgramInfoLog(program));
        }
        return null;
      }
      return program;
    }

    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Ensure fragment shader has precision and uniforms
    // Build header with only missing declarations to avoid redefinition
    const hasPrecision = /precision\s+mediump\s+float\s*;/.test(frag);
    const hasRes = /uniform\s+vec2\s+u_resolution\s*;/.test(frag);
    const hasTime = /uniform\s+float\s+u_time\s*;/.test(frag);
    const hasMouse = /uniform\s+vec2\s+u_mouse\s*;/.test(frag);
    const hasSeed = /uniform\s+float\s+u_seed\s*;/.test(frag);
    const hasColorA = /uniform\s+vec3\s+u_colorA\s*;/.test(frag);
    const hasColorB = /uniform\s+vec3\s+u_colorB\s*;/.test(frag);
    const headerParts: string[] = [];
    if (!hasPrecision) headerParts.push("precision mediump float;");
    if (!hasRes) headerParts.push("uniform vec2 u_resolution;");
    if (!hasTime) headerParts.push("uniform float u_time;");
    if (!hasMouse) headerParts.push("uniform vec2 u_mouse;");
    if (!hasSeed) headerParts.push("uniform float u_seed;");
    if (!hasColorA) headerParts.push("uniform vec3 u_colorA;");
    if (!hasColorB) headerParts.push("uniform vec3 u_colorB;");
    const finalFrag = (headerParts.join("\n") + "\n" + frag).trim();

    const program = createProgram(vsrc, finalFrag);
    if (!program) {
      window.removeEventListener("resize", resize);
      return;
    }
    gl.useProgram(program);

    // Quad buffer
    const positionLoc = gl.getAttribLocation(program, "a_position");
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // 2 triangles covering the screen
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uSeed = gl.getUniformLocation(program, "u_seed");
    const uColorA = gl.getUniformLocation(program, "u_colorA");
    const uColorB = gl.getUniformLocation(program, "u_colorB");
    const uDetail = gl.getUniformLocation(program, "u_detail");

    const seed = uniforms.seed ?? Math.random() * 1000;
    const colorA = parseColorToVec3(uniforms.colorA, [0.8, 0.9, 1.0]);
    const colorB = parseColorToVec3(uniforms.colorB, [0.6, 0.7, 0.9]);

    let mouseX = 0,
      mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = canvas.height / dpr - e.clientY;
    };
    window.addEventListener("mousemove", onMouse);

    const start = performance.now();
    let last = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouseX * dpr, mouseY * dpr);
      gl.uniform1f(uSeed, seed);
      gl.uniform3f(uColorA, colorA[0], colorA[1], colorA[2]);
      gl.uniform3f(uColorB, colorB[0], colorB[1], colorB[2]);
      if (uDetail) gl.uniform1f(uDetail, detailRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      // FPS monitoring and dynamic detail if shader supports it
      const dt = now - last;
      last = now;
      const fps = 1000 / Math.max(1, dt);
      const arr = fpsSamples.current;
      arr.push(fps);
      if (arr.length > 30) arr.shift();
      const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
      if (uDetail) {
        if (avg < 26 && detailRef.current > 0.5) detailRef.current = 0.5;
        else if (avg < 20 && detailRef.current > 0.35) detailRef.current = 0.35;
        else if (avg > 45 && detailRef.current < 1.0) detailRef.current = 1.0;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [frag, uniforms]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={["pointer-events-none fixed inset-0 z-0", className].join(" ")}
    />
  );
}
