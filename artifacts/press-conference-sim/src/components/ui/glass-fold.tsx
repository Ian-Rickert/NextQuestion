import { useEffect, useRef } from "react";

export interface GlassFoldProps {
  /** The body of each glass pane. */
  color1?: string;
  /** The background. */
  color2?: string;
  /** The lit edges. */
  color3?: string;
  /** Animation speed. Zero freezes it. */
  speed?: number;
  /** How tightly the folds are packed. */
  scale?: number;
  /** Film grain, from 0 to 0.5. */
  noise?: number;
  className?: string;
}

const VERTEX = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;

  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform float u_scale;
  uniform float u_noise;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  float grain(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec2 centered(vec2 uv) {
    vec2 p = uv - 0.5;
    p.x *= u_resolution.x / max(u_resolution.y, 1.0);
    return p;
  }

  mat2 rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }

  vec3 shade(vec2 uv, float time) {
    vec2 q = rot(0.6) * centered(uv) * 2.0 * u_scale;
    float t = time * 0.6;
    float pixel = 2.0 * u_scale / max(u_resolution.y, 1.0);
    vec3 color = mix(
      u_color2,
      u_color2 * 0.45,
      clamp(length(centered(uv)) * 1.3, 0.0, 1.0)
    );

    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float bend = mod(fi, 2.0) * 2.0 - 1.0;
      float crease = (fi - 2.5) * 0.4
        + 0.26 * sin(q.x * (1.05 + 0.12 * fi) + fi * 1.9 + t * (0.25 + 0.05 * fi))
        + 0.1 * bend * q.x * q.x;
      float s = q.y - crease;
      float pane = smoothstep(-pixel, pixel, s);
      float back = max(s, 0.0);
      float body = exp(-back * 1.7);
      float fresnel = exp(-back * 8.0);
      float rim = exp(-back * 80.0);
      float inner = exp(-pow((back - 0.045) / 0.014, 2.0));
      float bloom = exp(-abs(s) * 20.0);
      vec3 tint = mix(
        u_color1,
        u_color3,
        clamp(fresnel * 0.6 + 0.08 + 0.14 * sin(fi * 2.1 + q.x * 0.8 + t * 0.2), 0.0, 1.0)
      );
      vec3 light = tint * pane * (body * 0.42 + fresnel * 0.4)
        + u_color3 * (pane * (rim * 0.6 + inner * 0.12) + bloom * 0.1);
      color += light * (1.0 - color);
    }

    return clamp(color, 0.0, 1.0);
  }

  void main() {
    vec3 color = shade(vUv, u_time);
    if (u_noise > 0.001) {
      float g = grain(vUv * 200.0 + u_time * 0.1);
      color *= 1.0 - u_noise * 0.4 + u_noise * g * 0.4;
    }
    gl_FragColor = vec4(color, 1.0);
  }
`;

function hexToVec3(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  const expanded = value.length === 3
    ? value.split("").map((character) => character + character).join("")
    : value;
  const color = Number.parseInt(expanded, 16);
  return [
    ((color >> 16) & 255) / 255,
    ((color >> 8) & 255) / 255,
    (color & 255) / 255,
  ];
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function GlassFold({
  color1 = "#1e3cc8",
  color2 = "#06081e",
  color3 = "#96d7ff",
  speed = 0.5,
  scale = 1,
  noise = 0.12,
  className,
}: GlassFoldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const latestProps = useRef({ color1, color2, color3, speed, scale, noise });
  latestProps.current = { color1, color2, color3, speed, scale, noise };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    if (!buffer) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      time: gl.getUniformLocation(program, "u_time"),
      color1: gl.getUniformLocation(program, "u_color1"),
      color2: gl.getUniformLocation(program, "u_color2"),
      color3: gl.getUniformLocation(program, "u_color3"),
      scale: gl.getUniformLocation(program, "u_scale"),
      noise: gl.getUniformLocation(program, "u_noise"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
      const height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
    };

    let elapsed = 0;
    let previousFrame: number | null = null;
    let frame = 0;

    const draw = (now: number) => {
      const props = latestProps.current;
      if (previousFrame !== null) {
        elapsed += Math.min((now - previousFrame) / 1000, 0.1) * props.speed;
      }
      previousFrame = now;

      resize();
      gl.uniform1f(uniforms.time, elapsed);
      gl.uniform3fv(uniforms.color1, hexToVec3(props.color1));
      gl.uniform3fv(uniforms.color2, hexToVec3(props.color2));
      gl.uniform3fv(uniforms.color3, hexToVec3(props.color3));
      gl.uniform1f(uniforms.scale, props.scale);
      gl.uniform1f(uniforms.noise, props.noise);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = (now: number) => {
      draw(now);
      if (!reducedMotion) frame = window.requestAnimationFrame(animate);
    };
    if (reducedMotion) draw(0);
    else frame = window.requestAnimationFrame(animate);

    const observer = new ResizeObserver(() => {
      if (reducedMotion) draw(performance.now());
    });
    observer.observe(canvas);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
