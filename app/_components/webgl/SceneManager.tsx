'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

// An animated neural background component
function NeuralBackground() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      // Gentle pulsating and rotation
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Calculate random points for the "neural nodes"
  const count = 1000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 20;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SceneManager() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#030712]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <fog attach="fog" args={['#030712', 5, 25]} />
        <ambientLight intensity={0.2} />
        <NeuralBackground />
        {/* Floating datastream particles */}
        <Sparkles count={500} scale={20} size={1} speed={0.4} opacity={0.3} color="#0066ff" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate speed={0.2} />
      </Canvas>
    </div>
  );
}
