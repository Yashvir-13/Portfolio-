"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FireflyParticles = ({ count = 50 }) => {
    const mesh = useRef<THREE.Points>(null!);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
        }
        return positions;
    }, [count]);

    const particlesSpeed = useMemo(() => {
        const speeds = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            speeds[i] = Math.random() * 0.02 + 0.005;
        }
        return speeds;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;

        const positions = mesh.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            // Move upwards
            positions[i * 3 + 1] += particlesSpeed[i];

            // Reset if too high
            if (positions[i * 3 + 1] > 10) {
                positions[i * 3 + 1] = -10;
                positions[i * 3] = (Math.random() - 0.5) * 20;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            }

            // Gentle sway
            positions[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.01;
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#D4C48B" // Soft Gold
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default function Fireflies() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <FireflyParticles count={40} />
            </Canvas>
        </div>
    );
}
