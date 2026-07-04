import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 6000

const vertexShader = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform float uPixelRatio;
attribute float aScale;
attribute float aSeed;
varying float vGlow;

// simplex-ish flow via layered sines (cheap, smooth, no texture fetch)
vec3 flow(vec3 p, float t) {
  float x = sin(p.y * 0.8 + t * 0.35 + aSeed) + sin(p.z * 1.1 - t * 0.22);
  float y = sin(p.z * 0.9 + t * 0.28) + sin(p.x * 0.7 + t * 0.4 + aSeed);
  float z = sin(p.x * 1.2 - t * 0.31) + sin(p.y * 0.6 + t * 0.25);
  return vec3(x, y, z) * 0.35;
}

void main() {
  vec3 p = position + flow(position, uTime);

  // mouse repulsion in view space
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec2 toMouse = mv.xy - uMouse * 6.0;
  float d = length(toMouse);
  float push = smoothstep(2.2, 0.0, d);
  mv.xy += normalize(toMouse + 0.0001) * push * 1.4;

  vGlow = push;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aScale * uPixelRatio * (30.0 / -mv.z) * (1.0 + push * 1.5);
}
`

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vGlow;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.05, d);
  vec3 color = mix(uColorA, uColorB, vGlow);
  gl_FragColor = vec4(color, alpha * 0.85);
}
`

function Particles() {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()
  const mouse = useRef(new THREE.Vector2(99, 99))

  const { positions, scales, seeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const scales = new Float32Array(COUNT)
    const seeds = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      // disc distribution with depth, denser toward center
      const r = Math.pow(Math.random(), 0.6) * 7
      const theta = Math.random() * Math.PI * 2
      positions[i * 3] = Math.cos(theta) * r * 1.6
      positions[i * 3 + 1] = Math.sin(theta) * r * 0.9
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
      scales[i] = 0.5 + Math.random() * 1.5
      seeds[i] = Math.random() * Math.PI * 2
    }
    return { positions, scales, seeds }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColorA: { value: new THREE.Color('#4c4f8f') },
      uColorB: { value: new THREE.Color('#22e0ff') },
    }),
    []
  )

  useFrame((state) => {
    if (!mat.current) return
    mat.current.uniforms.uTime.value = state.clock.elapsedTime
    // normalized pointer, smoothed
    mouse.current.lerp(state.pointer, 0.06)
    mat.current.uniforms.uMouse.value.set(
      (mouse.current.x * viewport.width) / 12,
      (mouse.current.y * viewport.height) / 12
    )
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ParticleField() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true }}
      frameloop={reducedMotion ? 'demand' : 'always'}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Particles />
    </Canvas>
  )
}
