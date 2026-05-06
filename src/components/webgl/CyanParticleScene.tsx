'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function CyanPoints() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  // Generate sparse random point cloud
  const positions = useMemo(() => {
    const count = 600;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 12;  // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;   // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;   // z
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();

    // Slow ambient rotation
    pointsRef.current.rotation.y = t * 0.04;
    pointsRef.current.rotation.x = t * 0.02;

    // Mouse parallax — subtle reactive drift
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      (mouse.x * viewport.width) * 0.04,
      0.03
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      (mouse.y * viewport.height) * 0.04,
      0.03
    );
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00D4FF"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export default function CyanParticleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: false, alpha: true }}
    >
      <CyanPoints />
    </Canvas>
  );
}
