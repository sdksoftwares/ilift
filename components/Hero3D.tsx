'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, PerspectiveCamera, ContactShadows, Text } from '@react-three/drei'
import * as THREE from 'three'

// --- MATERIALS ---
const BlueprintMaterial = () => (
    <meshStandardMaterial
        color="#0ea5e9" // sky-500
        emissive="#0284c7"
        emissiveIntensity={2}
        toneMapped={false}
        roughness={0.2}
        metalness={0.8}
        wireframe
        transparent
        opacity={0.3}
    />
)

const SolidAccentMaterial = () => (
    <meshStandardMaterial
        color="#ef4444" // red-500
        roughness={0.4}
        metalness={0.6}
    />
)

// --- MODELS (Procedural Low-Poly Schematics) ---

function HoloForklift(props: any) {
    const group = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!group.current) return
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 + (Math.PI / 6)
    })

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
            <group ref={group} {...props}>
                {/* Chassis */}
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[1.5, 0.8, 2.5]} />
                    <BlueprintMaterial />
                </mesh>
                {/* Cabin / Overhead Guard */}
                <mesh position={[0, 1.8, -0.2]}>
                    <boxGeometry args={[1.4, 2, 1.4]} />
                    <BlueprintMaterial />
                </mesh>
                <mesh position={[0, 2.8, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.7, 0.7, 1.4, 4]} />
                    <BlueprintMaterial />
                </mesh>
                {/* Mast */}
                <mesh position={[0, 1.5, 1.4]}>
                    <boxGeometry args={[1, 3.5, 0.2]} />
                    <BlueprintMaterial />
                </mesh>
                {/* Forks */}
                <mesh position={[0.3, 0.2, 1.9]} rotation={[0.1, 0, 0]}>
                    <boxGeometry args={[0.2, 0.1, 1.5]} />
                    <SolidAccentMaterial />
                </mesh>
                <mesh position={[-0.3, 0.2, 1.9]} rotation={[0.1, 0, 0]}>
                    <boxGeometry args={[0.2, 0.1, 1.5]} />
                    <SolidAccentMaterial />
                </mesh>
                {/* Wheels */}
                <mesh position={[0.8, 0.3, 0.8]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                    <BlueprintMaterial />
                </mesh>
                <mesh position={[-0.8, 0.3, 0.8]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                    <BlueprintMaterial />
                </mesh>
                <mesh position={[0.8, 0.3, -0.8]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                    <BlueprintMaterial />
                </mesh>
                <mesh position={[-0.8, 0.3, -0.8]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                    <BlueprintMaterial />
                </mesh>
            </group>
        </Float>
    )
}

function HoloStacker(props: any) {
    const group = useRef<THREE.Group>(null)
    useFrame((state) => {
        if (!group.current) return
        group.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.3 - (Math.PI / 6)
    })

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <group ref={group} {...props}>
                {/* Body */}
                <mesh position={[0, 0.8, 0]}>
                    <boxGeometry args={[1, 1.6, 1]} />
                    <BlueprintMaterial />
                </mesh>
                {/* Mast */}
                <mesh position={[0, 1.5, 0.6]}>
                    <boxGeometry args={[0.8, 3, 0.1]} />
                    <BlueprintMaterial />
                </mesh>
                {/* Base Legs */}
                <mesh position={[0.35, 0.1, 1.2]} rotation={[0.05, 0, 0]}>
                    <boxGeometry args={[0.15, 0.1, 1.5]} />
                    <BlueprintMaterial />
                </mesh>
                <mesh position={[-0.35, 0.1, 1.2]} rotation={[0.05, 0, 0]}>
                    <boxGeometry args={[0.15, 0.1, 1.5]} />
                    <BlueprintMaterial />
                </mesh>
                {/* Forks (Red) */}
                <mesh position={[0.2, 0.5, 1.2]}>
                    <boxGeometry args={[0.15, 0.05, 1.2]} />
                    <SolidAccentMaterial />
                </mesh>
                <mesh position={[-0.2, 0.5, 1.2]}>
                    <boxGeometry args={[0.15, 0.05, 1.2]} />
                    <SolidAccentMaterial />
                </mesh>
            </group>
        </Float>
    )
}

function GridPlane() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[100, 100, 50, 50]} />
            <meshStandardMaterial
                wireframe
                color="#1e293b"
                transparent
                opacity={0.3}
            />
        </mesh>
    )
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={45} />

            {/* Cinematic Studio Lighting */}
            <ambientLight intensity={0.5} />
            <spotLight
                position={[10, 10, 5]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                color="#38bdf8" // light blue axis
                castShadow
            />
            <spotLight
                position={[-10, 5, -5]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                color="#ef4444" // red axis
            />
            <pointLight position={[0, -2, 0]} intensity={1} color="#ffffff" distance={5} />

            {/* Atmosphere */}
            <Sparkles
                count={200}
                scale={[20, 20, 10]}
                size={3}
                speed={0.5}
                opacity={0.5}
                color="#ffffff"
            />

            {/* Equipment Models */}
            {/* Forklift centered slightly right */}
            <HoloForklift position={[4, -1, 0]} scale={0.8} />

            {/* Stacker to the left */}
            <HoloStacker position={[-4, -0.5, 1]} scale={0.8} />

            <GridPlane />
            <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.5} far={10} color="#000000" />

            {/* Background Fog */}
            <fog attach="fog" args={['#020617', 5, 25]} />
        </>
    )
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 select-none">
            <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 10], fov: 45 }}>
                <Scene />
            </Canvas>
        </div>
    )
}
