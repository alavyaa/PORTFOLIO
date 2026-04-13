// src/components/LotusScene.jsx — FINAL FIXED (keeps original model look)
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, Sparkles, useGLTF, Html, useProgress } from '@react-three/drei'
import * as THREE from 'three'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{
        color: '#d4af37',
        fontFamily: 'Cinzel, serif',
        fontSize: '12px',
        letterSpacing: '0.3em',
        textAlign: 'center',
      }}>
        <div style={{ marginBottom: 8 }}>LOADING LOTUS</div>
        <div style={{
          width: 120, height: 2,
          background: 'rgba(212,175,55,0.2)',
          borderRadius: 99, overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`, height: '100%',
            background: 'linear-gradient(90deg, #d4af37, #00e5ff)',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>
    </Html>
  )
}

function LotusModel({ onHover }) {
  const groupRef = useRef()
  const { scene } = useGLTF('/models/lotus.glb')
  const [model, setModel] = useState(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!scene) return

    const clone = scene.clone(true)

    // ── KEY FIX: Don't replace materials, ENHANCE them ──
    clone.traverse((child) => {
      if (!child.isMesh) return

      child.frustumCulled = false
      child.castShadow = true

      // If the model has materials, enhance them
      const enhanceMaterial = (mat) => {
        if (!mat) return mat

        // Keep the original material type and all its maps/textures
        // Just boost visibility properties

        // Make sure it renders on both sides
        mat.side = THREE.DoubleSide

        // If material is too dark, brighten it
        if (mat.color) {
          const hsl = {}
          mat.color.getHSL(hsl)
          // If the color is very dark (lightness < 0.15), brighten it
          if (hsl.l < 0.15) {
            mat.color.setHSL(hsl.h, hsl.s, 0.4)
          }
        }

        // Add golden emissive glow to existing material
        if ('emissive' in mat) {
          mat.emissive = new THREE.Color('#d4af37')
          mat.emissiveIntensity = 0.15
        }

        // Boost metalness slightly for golden sheen
        if ('metalness' in mat) {
          mat.metalness = Math.max(mat.metalness, 0.2)
        }

        // Ensure not fully transparent
        if (mat.transparent && mat.opacity < 0.3) {
          mat.opacity = 0.9
        }

        // Make sure it's not culled
        mat.depthWrite = true
        mat.depthTest = true

        // Ensure maps are working
        if (mat.map) {
          mat.map.encoding = THREE.sRGBEncoding
          mat.map.needsUpdate = true
        }

        mat.needsUpdate = true
        return mat
      }

      if (Array.isArray(child.material)) {
        child.material = child.material.map(enhanceMaterial)
      } else {
        child.material = enhanceMaterial(child.material)
      }
    })

    // ── Auto-center and auto-scale ──
    const box = new THREE.Box3().setFromObject(clone)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    // Center at origin
    clone.position.sub(center)

    // Scale to fit nicely in view
    const targetSize = 2.2
    if (maxDim > 0) {
      const scaleFactor = targetSize / maxDim
      clone.scale.multiplyScalar(scaleFactor)
    }

    setModel(clone)

    return () => {
      clone.traverse((child) => {
        if (!child.isMesh) return
        child.geometry?.dispose()
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material]
        mats.forEach((m) => {
          Object.values(m).forEach((v) => {
            if (v?.isTexture) v.dispose()
          })
          m.dispose()
        })
      })
    }
  }, [scene])

  useFrame(({ clock }) => {
    if (!groupRef.current || !model) return
    const t = clock.elapsedTime

    // Slow rotation
    groupRef.current.rotation.y = t * 0.1

    // Gentle breathe
    const s = 1 + Math.sin(t * 0.7) * 0.02
    groupRef.current.scale.set(s, s, s)

    // Pulse emissive on meshes
    model.traverse((child) => {
      if (!child.isMesh) return
      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material]
      mats.forEach((mat) => {
        if ('emissiveIntensity' in mat) {
          mat.emissiveIntensity =
            0.1 + Math.sin(t * 1.0) * 0.08
        }
      })
    })
  })

  if (!model) return null

  return (
    <group ref={groupRef}>
      <primitive
        object={model}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          onHover?.(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          onHover?.(false)
        }}
      />

      {/* Warm key light — above front */}
      <pointLight
        position={[0, 3, 3]}
        color="#ffffff"
        intensity={hovered ? 5 : 3}
        distance={10}
        decay={2}
      />

      {/* Gold fill — behind */}
      <pointLight
        position={[0, 0, -3]}
        color="#d4af37"
        intensity={2}
        distance={8}
        decay={2}
      />

      {/* Teal rim — below */}
      <pointLight
        position={[0, -2, 0]}
        color="#00e5ff"
        intensity={1.5}
        distance={6}
        decay={2}
      />

      {/* Left fill */}
      <pointLight
        position={[-3, 1, 1]}
        color="#ffffff"
        intensity={1}
        distance={6}
        decay={2}
      />

      {/* Right fill */}
      <pointLight
        position={[3, 1, 1]}
        color="#ffffff"
        intensity={1}
        distance={6}
        decay={2}
      />

      {/* Gold sparkles */}
      <Sparkles
        count={35}
        scale={3.5}
        size={4}
        speed={0.3}
        opacity={hovered ? 0.7 : 0.45}
        color="#d4af37"
      />

      {/* Teal sparkles */}
      <Sparkles
        count={18}
        scale={2.5}
        size={2}
        speed={0.2}
        opacity={0.22}
        color="#00e5ff"
      />
    </group>
  )
}

// ── Time-loom rings (ORIGINAL STYLE from first version) ──────
function TimeLoomRings() {
  const ringsRef = useRef([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ringsRef.current.forEach((ring, i) => {
      if (!ring) return
      const dir = i % 2 === 0 ? 1 : -1
      ring.rotation.y = t * (0.15 + i * 0.07) * dir
      ring.rotation.x = Math.sin(t * 0.2 + i) * 0.06
    })
  })

  return (
    <>
      {[1.0, 1.4, 1.8].map((radius, i) => (
        <group key={i} ref={(el) => (ringsRef.current[i] = el)}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.006, 8, 80]} />
            <meshPhysicalMaterial
              color="#d4af37"
              emissive="#d4af37"
              emissiveIntensity={0.5 - i * 0.1}
              roughness={0.2}
              metalness={0.95}
              transparent
              opacity={0.5 - i * 0.1}
            />
          </mesh>
        </group>
      ))}
    </>
  )
}

// ── Main scene export ────────────────────────────────────────
export default function LotusScene() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: 'auto' }}>
      <Canvas
        camera={{ position: [0, 0.8, 4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          powerPreference: 'high-performance',
          outputEncoding: THREE.sRGBEncoding,
        }}
        shadows={false}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        {/* Strong ambient — no part of model should be black */}
        <ambientLight intensity={1.2} color="#ffffff" />

        {/* Key directional light */}
        <directionalLight position={[3, 5, 5]} intensity={1.5} color="#ffffff" />

        {/* Teal accent from behind */}
        <directionalLight position={[-2, 2, -4]} intensity={0.6} color="#00e5ff" />

        <React.Suspense fallback={<Loader />}>
          <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
            <LotusModel onHover={setHovered} />
            <TimeLoomRings />
          </Float>

          {/* Sunset gives warm tones that match gold theme */}
          <Environment preset="sunset" />
        </React.Suspense>

        {/* Push fog far back so model is never obscured */}
        <fog attach="fog" args={['#1a1a1a', 12, 28]} />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/lotus.glb')