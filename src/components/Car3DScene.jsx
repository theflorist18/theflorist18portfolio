import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const lerp = THREE.MathUtils.lerp
const MODEL_URL = import.meta.env.BASE_URL + 'models/porsche-911.glb'

// Tuning knobs (dialed in against the actual model)
const TARGET_LEN = 4.4 // world units the longest horizontal axis should span
const ROT_Y = -Math.PI / 2 // orient model length (Z) along screen-X (driving axis)

function Porsche({ progress }) {
  const group = useRef(null)
  const { scene } = useGLTF(MODEL_URL)

  // Auto center + ground + scale so we don't depend on the model's native units.
  const fit = useMemo(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true
        o.receiveShadow = false
        // Glass/transmission materials need an extra render pass that is very
        // slow on software WebGL / weak GPUs. Convert them to cheap dark glass
        // so the car renders fast and reliably everywhere.
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
    const s = TARGET_LEN / Math.max(size.x, size.z)
    return {
      s,
      offset: [-center.x, -box.min.y, -center.z], // center XZ, sit bottom on y=0
    }
  }, [scene])

  useFrame((state) => {
    if (!group.current) return
    const p = progress && progress.get ? progress.get() : 0.5
    const t = state.clock.elapsedTime
    group.current.position.x = lerp(-3.4, 3.4, p)
    group.current.position.y = Math.sin(t * 1.2) * 0.025
    group.current.rotation.y = ROT_Y + lerp(0.55, -0.2, p) // 3/4-front -> side as it passes
  })

  return (
    <group ref={group}>
      <group scale={fit.s}>
        <primitive object={scene} position={fit.offset} />
      </group>
    </group>
  )
}
useGLTF.preload(MODEL_URL)

export default function Car3DScene({ progress }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0.4, 1.25, 7.2], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 4]} intensity={2.4} color="#fff4df" />
      <directionalLight position={[-8, 6, -6]} intensity={2.6} color="#ffffff" />{/* rim / back */}
      <directionalLight position={[-5, 2, 6]} intensity={1.0} color="#c8a96a" />{/* gold front fill */}

      {/* studio reflections WITHOUT any HDR file — built from light cards */}
      <Environment resolution={256}>
        <Lightformer intensity={4} position={[0, 5, 1]} rotation={[Math.PI / 2, 0, 0]} scale={[12, 0.8, 1]} color="#ffffff" />
        <Lightformer intensity={2.6} position={[0, 4, 3]} scale={[10, 3, 1]} color="#fff7e6" />
        <Lightformer intensity={1.6} position={[-6, 1.5, -2]} scale={[6, 6, 1]} color="#c8a96a" />
        <Lightformer intensity={1.0} position={[6, 1, -3]} scale={[6, 6, 1]} color="#9fb0c0" />
        <Lightformer intensity={1.4} position={[0, -2, 2]} scale={[10, 2, 1]} color="#2a2620" />
      </Environment>

      <Porsche progress={progress} />

      <ContactShadows position={[0, -0.02, 0]} opacity={0.6} scale={16} blur={2.6} far={4} resolution={512} color="#000000" />
    </Canvas>
  )
}
