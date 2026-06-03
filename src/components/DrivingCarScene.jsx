import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const lerp = THREE.MathUtils.lerp
const clamp = THREE.MathUtils.clamp
const MODEL_URL = import.meta.env.BASE_URL + 'models/porsche-911.glb'

const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const easeIn = (t) => t * t * t

// ---------- soft smoke sprite texture (procedural, no asset) ----------
function smokeTexture() {
  const s = 64
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.45, 'rgba(255,255,255,0.4)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const tex = new THREE.CanvasTexture(c)
  tex.needsUpdate = true
  return tex
}

const SMOKE_N = 120

function Rig({ progress }) {
  const car = useRef(null)
  const { scene } = useGLTF(MODEL_URL)

  // normalize model to unit length, recenter, and tame heavy glass materials
  const fit = useMemo(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = false
        o.receiveShadow = false
        const m = o.material
        if (m && m.transmission > 0) {
          m.transmission = 0
          m.transparent = false
          m.color = new THREE.Color('#0a0a0c')
          m.metalness = 0.2
          m.roughness = 0.08
          m.envMapIntensity = 1.6
        }
      }
    })
    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    const s = 1 / Math.max(size.x, size.y, size.z)
    return { s, offset: [-center.x, -center.y, -center.z] }
  }, [scene])

  // ---- smoke pool ----
  const smoke = useMemo(() => {
    const life = new Float32Array(SMOKE_N)
    for (let i = 0; i < SMOKE_N; i++) life[i] = 1
    return {
      pos: new Float32Array(SMOKE_N * 3),
      life,
      vel: new Float32Array(SMOKE_N * 3),
      age: new Float32Array(SMOKE_N),
      max: new Float32Array(SMOKE_N),
      seed: 0,
    }
  }, [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(smoke.pos, 3))
    g.setAttribute('aLife', new THREE.BufferAttribute(smoke.life, 1))
    return g
  }, [smoke])

  const mat = useMemo(() => {
    const tex = smokeTexture()
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      uniforms: { uTex: { value: tex }, uSize: { value: 130 } },
      vertexShader: `
        attribute float aLife;
        varying float vLife;
        uniform float uSize;
        void main(){
          vLife = aLife;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * (0.4 + aLife * 2.0) * (1.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform sampler2D uTex;
        varying float vLife;
        void main(){
          float a = texture2D(uTex, gl_PointCoord).a;
          a *= (1.0 - vLife) * 0.6;
          if (a < 0.01) discard;
          gl_FragColor = vec4(vec3(0.76, 0.74, 0.69), a);
        }`,
    })
  }, [])

  const emit = (x, y, intensity) => {
    const count = Math.min(8, Math.round(intensity))
    for (let k = 0; k < count; k++) {
      smoke.seed = (smoke.seed + 1) % SMOKE_N
      const i = smoke.seed
      smoke.pos[i * 3] = x + (Math.random() - 0.5) * 0.4
      smoke.pos[i * 3 + 1] = y + (Math.random() - 0.5) * 0.3
      smoke.pos[i * 3 + 2] = -0.3 - Math.random() * 0.5
      smoke.vel[i * 3] = (Math.random() - 0.5) * 0.5
      smoke.vel[i * 3 + 1] = 0.25 + Math.random() * 0.5 // drift up -> trails behind a descending car
      smoke.vel[i * 3 + 2] = -0.1 - Math.random() * 0.3
      smoke.age[i] = 0
      smoke.max[i] = 1.3 + Math.random() * 1.1
      smoke.life[i] = 0
    }
  }

  const prev = useRef(0)

  useFrame((state, dt) => {
    if (!car.current) return
    const vp = state.viewport
    const halfW = vp.width / 2
    const halfH = vp.height / 2
    const p = progress && progress.get ? progress.get() : 0
    const t = state.clock.elapsedTime

    const base = vp.width * 0.3 // car ~30% of viewport width
    const BASE_YAW = -Math.PI / 2 // side / 3-4 view, facing left

    let x, y, yaw, roll = 0, pitch = 0, scaleMul = 1

    if (p < 0.1) {
      const k = easeOut(clamp(p / 0.1, 0, 1))
      x = lerp(halfW * 1.55, 0, k)
      y = halfH * 0.42
      yaw = BASE_YAW
      scaleMul = lerp(0.85, 1, k)
    } else if (p < 0.85) {
      const s = (p - 0.1) / 0.75
      const wave = Math.sin(s * Math.PI * 2.6)
      const dwave = Math.cos(s * Math.PI * 2.6)
      x = wave * halfW * 0.42
      y = lerp(halfH * 0.42, -halfH * 0.45, s)
      yaw = BASE_YAW + dwave * 0.32
      roll = -dwave * 0.12
    } else {
      const s = clamp((p - 0.85) / 0.15, 0, 1)
      x = lerp(Math.sin(Math.PI * 2.6) * halfW * 0.42, 0, s)
      y = lerp(-halfH * 0.45, -halfH * 2.3, easeIn(s))
      yaw = BASE_YAW
      pitch = s * 0.45
      scaleMul = lerp(1, 0.7, s)
    }

    y += Math.sin(t * 1.1) * 0.03

    car.current.position.set(x, y, 0)
    car.current.rotation.set(pitch, yaw, roll)
    car.current.scale.setScalar(base * scaleMul)

    // ---- smoke ----
    const speed = Math.abs(p - prev.current) / Math.max(dt, 0.0001) // progress / sec
    prev.current = p
    const boost = p > 0.85 ? 6 : 0
    emit(x, y, speed * 120 + boost + 0.5)

    for (let i = 0; i < SMOKE_N; i++) {
      if (smoke.age[i] < smoke.max[i]) {
        smoke.age[i] += dt
        smoke.pos[i * 3] += smoke.vel[i * 3] * dt
        smoke.pos[i * 3 + 1] += smoke.vel[i * 3 + 1] * dt
        smoke.pos[i * 3 + 2] += smoke.vel[i * 3 + 2] * dt
        smoke.life[i] = Math.min(1, smoke.age[i] / smoke.max[i])
      } else {
        smoke.life[i] = 1
      }
    }
    geo.attributes.position.needsUpdate = true
    geo.attributes.aLife.needsUpdate = true
  })

  return (
    <>
      <group ref={car}>
        <group scale={fit.s}>
          <primitive object={scene} position={fit.offset} />
        </group>
      </group>
      <points geometry={geo} material={mat} frustumCulled={false} />
    </>
  )
}
useGLTF.preload(MODEL_URL)

export default function DrivingCarScene({ progress }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 4]} intensity={2.4} color="#fff4df" />
      <directionalLight position={[-8, 6, -6]} intensity={2.4} color="#ffffff" />
      <directionalLight position={[-5, 2, 6]} intensity={1.0} color="#c8a96a" />
      <Environment resolution={128}>
        <Lightformer intensity={3.5} position={[0, 5, 1]} rotation={[Math.PI / 2, 0, 0]} scale={[12, 0.8, 1]} color="#ffffff" />
        <Lightformer intensity={2.4} position={[0, 4, 3]} scale={[10, 3, 1]} color="#fff7e6" />
        <Lightformer intensity={1.6} position={[-6, 1.5, -2]} scale={[6, 6, 1]} color="#c8a96a" />
        <Lightformer intensity={1.0} position={[6, 1, -3]} scale={[6, 6, 1]} color="#9fb0c0" />
      </Environment>
      <Rig progress={progress} />
    </Canvas>
  )
}
