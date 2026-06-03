import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const lerp = THREE.MathUtils.lerp
const clamp = THREE.MathUtils.clamp
const MODEL_URL = import.meta.env.BASE_URL + 'models/porsche-911.glb'
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const easeIn = (t) => t * t * t

// ---- top-down drive path (world units on the y=0 ground plane) ----
// camera looks down from above-behind: -z = far (screen top), +z = near (screen bottom)
const Z_TOP = -4.6
const Z_BOT = 6.5
const Z_EXIT = 13
const X_AMP = 3.6
const X_ENTER = 11
const WAVES = 2.6
const CAR_SCALE = 6.1
const YAW_OFFSET = Math.PI // tuned so the nose leads the travel direction

const weaveX = (s) => Math.sin(s * Math.PI * WAVES) * X_AMP
const zAt = (s) => lerp(Z_TOP, Z_BOT, s)

function pathAt(p) {
  if (p < 0.1) {
    const k = easeOut(clamp(p / 0.1, 0, 1))
    return { x: lerp(X_ENTER, weaveX(0), k), z: lerp(Z_TOP - 3, zAt(0), k), sc: lerp(0.8, 1, k) }
  }
  if (p < 0.85) {
    const s = (p - 0.1) / 0.75
    return { x: weaveX(s), z: zAt(s), sc: 1 }
  }
  const s = clamp((p - 0.85) / 0.15, 0, 1)
  return { x: lerp(weaveX(1), 0, s), z: lerp(zAt(1), Z_EXIT, easeIn(s)), sc: lerp(1, 0.92, s) }
}

// ---------- procedural soft smoke texture ----------
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

const SMOKE_N = 110

function Rig({ progress }) {
  const car = useRef(null)
  const invalidate = useThree((s) => s.invalidate)
  const { scene } = useGLTF(MODEL_URL)

  const fit = useMemo(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = false
        o.receiveShadow = false
        o.frustumCulled = false
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

  // ---- smoke pool (world space) ----
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
      uniforms: { uTex: { value: tex }, uSize: { value: 42 } },
      vertexShader: `
        attribute float aLife;
        varying float vLife;
        uniform float uSize;
        void main(){
          vLife = aLife;
          // orthographic: constant pixel size that grows with the puff's life
          gl_PointSize = uSize * (0.5 + aLife * 2.2);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform sampler2D uTex;
        varying float vLife;
        void main(){
          float a = texture2D(uTex, gl_PointCoord).a * (1.0 - vLife) * 0.6;
          if (a < 0.01) discard;
          gl_FragColor = vec4(vec3(0.76, 0.74, 0.69), a);
        }`,
    })
  }, [])

  const spawn = (x, z, rx, rz) => {
    smoke.seed = (smoke.seed + 1) % SMOKE_N
    const i = smoke.seed
    smoke.pos[i * 3] = x + (Math.random() - 0.5) * 0.5
    smoke.pos[i * 3 + 1] = 0.15 + Math.random() * 0.2
    smoke.pos[i * 3 + 2] = z + (Math.random() - 0.5) * 0.5
    smoke.vel[i * 3] = rx * 1.1 + (Math.random() - 0.5) * 0.6
    smoke.vel[i * 3 + 1] = 0.2 + Math.random() * 0.25
    smoke.vel[i * 3 + 2] = rz * 1.1 + (Math.random() - 0.5) * 0.6
    smoke.age[i] = 0
    smoke.max[i] = 1.2 + Math.random() * 1.0
    smoke.life[i] = 0
  }

  const prev = useRef(0)
  const tail = useRef(0)

  // Demand rendering: only render while the scroll position is changing
  // (plus a short tail so the smoke can settle). No idle GPU usage.
  useEffect(() => {
    invalidate()
    const unsub = progress.on('change', () => {
      tail.current = 80
      invalidate()
    })
    return unsub
  }, [progress, invalidate])

  useFrame((state, delta) => {
    if (!car.current) return
    const dt = Math.min(delta, 0.05)
    const p = progress && progress.get ? progress.get() : 0
    const pos = pathAt(p)
    const ahead = pathAt(Math.min(p + 0.004, 1))
    let dx = ahead.x - pos.x
    let dz = ahead.z - pos.z
    const dl = Math.hypot(dx, dz) || 1
    dx /= dl
    dz /= dl
    const yaw = Math.atan2(dx, dz) + YAW_OFFSET

    car.current.position.set(pos.x, 0, pos.z)
    car.current.rotation.set(p > 0.85 ? -((p - 0.85) / 0.15) * 0.22 : 0, yaw, 0)
    car.current.scale.setScalar(CAR_SCALE * pos.sc)

    // smoke trailing behind the car
    const speed = Math.abs(p - prev.current) / Math.max(dt, 0.0001)
    prev.current = p
    const boost = p > 0.85 ? 6 : 0
    const n = Math.min(8, Math.round(speed * 110 + boost))
    for (let e = 0; e < n; e++) spawn(pos.x - dx * 0.5, pos.z - dz * 0.5, -dx, -dz)

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

    // keep rendering for a short tail after scrolling stops (smoke fade-out)
    if (tail.current > 0) {
      tail.current -= 1
      invalidate()
    }
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
      frameloop="demand"
      orthographic
      dpr={[1, 1.2]}
      camera={{ position: [0, 16, 6], zoom: 60, near: 0.1, far: 120 }}
      onCreated={({ camera }) => {
        // high-angle bird's-eye: looking down at the ground plane
        camera.lookAt(0, 0, 0)
        camera.updateProjectionMatrix()
      }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 12, 3]} intensity={2.6} color="#fff4df" />
      <directionalLight position={[-6, 9, -3]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[2, 8, 7]} intensity={1.0} color="#c8a96a" />
      <Environment resolution={128}>
        <Lightformer intensity={3.2} position={[0, 6, 1]} rotation={[Math.PI / 2, 0, 0]} scale={[14, 1, 1]} color="#ffffff" />
        <Lightformer intensity={2.2} position={[0, 5, 4]} scale={[12, 4, 1]} color="#fff7e6" />
        <Lightformer intensity={1.6} position={[-6, 3, -2]} scale={[6, 6, 1]} color="#c8a96a" />
        <Lightformer intensity={1.0} position={[6, 3, -3]} scale={[6, 6, 1]} color="#9fb0c0" />
      </Environment>
      <Rig progress={progress} />
    </Canvas>
  )
}
