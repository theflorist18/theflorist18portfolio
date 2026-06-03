import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

const lerp = THREE.MathUtils.lerp

// ---- procedural sports-car (fastback / 911-ish side profile, extruded) ----
function Car({ progress }) {
  const group = useRef(null)
  const wheels = useRef([])

  const bodyGeo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-2.0, 0.12)
    s.quadraticCurveTo(-2.2, 0.42, -1.7, 0.5) // front nose
    s.lineTo(-1.0, 0.54) // hood
    s.quadraticCurveTo(-0.6, 0.56, -0.3, 1.0) // windshield -> roof
    s.lineTo(0.42, 1.04) // roof
    s.quadraticCurveTo(1.2, 1.0, 1.7, 0.55) // fastback slope
    s.lineTo(1.92, 0.5) // rear deck
    s.quadraticCurveTo(2.16, 0.46, 2.0, 0.12) // tail down
    s.lineTo(-2.0, 0.12) // underbody
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 1.7,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.07,
      bevelSegments: 4,
      steps: 1,
    })
    geo.translate(0, 0, -0.85) // center on Z
    geo.computeVertexNormals()
    return geo
  }, [])

  const wheelGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.46, 0.46, 0.34, 30)
    g.rotateX(Math.PI / 2) // axle along Z
    return g
  }, [])
  const hubGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.17, 0.17, 0.36, 18)
    g.rotateX(Math.PI / 2)
    return g
  }, [])

  const wheelPositions = [
    [-1.18, 0.12, 0.74],
    [-1.18, 0.12, -0.74],
    [1.2, 0.12, 0.74],
    [1.2, 0.12, -0.74],
  ]

  useFrame((state) => {
    if (!group.current) return
    const p = progress && progress.get ? progress.get() : 0.5
    const t = state.clock.elapsedTime
    const x = lerp(-3.6, 3.6, p)
    group.current.position.x = x
    group.current.position.y = Math.sin(t * 1.3) * 0.03 // idle bob
    group.current.rotation.y = lerp(0.7, -0.25, p) // turn 3/4-front -> side as it passes
    const spin = -x / 0.46 // roll with travel
    for (const w of wheels.current) if (w) w.rotation.z = spin
  })

  return (
    <group ref={group} scale={0.92}>
      {/* body — clearcoat car paint */}
      <mesh geometry={bodyGeo}>
        <meshPhysicalMaterial
          color="#2b261d"
          metalness={0.65}
          roughness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.12}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* glass cabin band */}
      <mesh position={[0.08, 0.79, 0]}>
        <boxGeometry args={[0.98, 0.3, 1.66]} />
        <meshStandardMaterial color="#05070a" metalness={0.35} roughness={0.06} />
      </mesh>

      {/* thin gold beltline accents */}
      <mesh position={[0, 0.5, 0.86]}>
        <boxGeometry args={[3.5, 0.012, 0.012]} />
        <meshStandardMaterial color="#c8a96a" metalness={1} roughness={0.25} emissive="#3a2f18" />
      </mesh>
      <mesh position={[0, 0.5, -0.86]}>
        <boxGeometry args={[3.5, 0.012, 0.012]} />
        <meshStandardMaterial color="#c8a96a" metalness={1} roughness={0.25} emissive="#3a2f18" />
      </mesh>

      {/* wheels */}
      {wheelPositions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh
            ref={(el) => (wheels.current[i] = el)}
            geometry={wheelGeo}
          >
            <meshStandardMaterial color="#0c0c0d" metalness={0.2} roughness={0.7} />
          </mesh>
          <mesh geometry={hubGeo}>
            <meshStandardMaterial color="#c8a96a" metalness={1} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* headlights */}
      {[0.55, -0.55].map((z) => (
        <mesh key={z} position={[-1.9, 0.5, z]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#fff0cf" emissive="#ffe6b0" emissiveIntensity={2.2} />
        </mesh>
      ))}
      {/* taillight bar */}
      <mesh position={[2.04, 0.5, 0]}>
        <boxGeometry args={[0.04, 0.12, 1.2]} />
        <meshStandardMaterial color="#d8bd84" emissive="#c8a96a" emissiveIntensity={1.4} />
      </mesh>
    </group>
  )
}

export default function Car3DScene({ progress }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0.4, 1.05, 6.4], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 4]} intensity={2.2} color="#fff4df" />
      <directionalLight position={[-8, 6, -6]} intensity={2.8} color="#ffffff" />{/* rim / back */}
      <directionalLight position={[-5, 2, 6]} intensity={1.0} color="#c8a96a" />{/* gold front fill */}

      {/* studio reflections WITHOUT any HDR file — built from light cards */}
      <Environment resolution={256}>
        {/* sharp overhead streak -> reflection line across the paint */}
        <Lightformer intensity={4} position={[0, 5, 1]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 0.7, 1]} color="#ffffff" />
        <Lightformer intensity={2.6} position={[0, 4, 3]} scale={[9, 3, 1]} color="#fff7e6" />
        <Lightformer intensity={1.6} position={[-5, 1.5, -2]} scale={[6, 6, 1]} color="#c8a96a" />
        <Lightformer intensity={1.0} position={[5, 1, -3]} scale={[6, 6, 1]} color="#9fb0c0" />
        <Lightformer intensity={1.4} position={[0, -2, 2]} scale={[9, 2, 1]} color="#2a2620" />
      </Environment>

      <Car progress={progress} />

      <ContactShadows position={[0, -0.36, 0]} opacity={0.55} scale={14} blur={2.6} far={3.2} resolution={512} color="#000000" />
    </Canvas>
  )
}
