'use client'

import { Canvas } from '@react-three/fiber'
import { Sparkles, PerspectiveCamera } from '@react-three/drei'

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
            <ambientLight intensity={0.5} />

            {/* Fine-grained moving particles */}
            <Sparkles
                count={400}
                scale={[20, 10, 5]}
                size={2}
                speed={0.4}
                opacity={0.6}
                color="#ffffff"
            />

            {/* Subtle blue accent particles */}
            <Sparkles
                count={100}
                scale={[20, 10, 5]}
                size={4}
                speed={0.2}
                opacity={0.3}
                color="#38bdf8" // sky-400
            />
        </>
    )
}

export default function StarField3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas dpr={[1, 1.5]}>
                <Scene />
            </Canvas>
        </div>
    )
}
