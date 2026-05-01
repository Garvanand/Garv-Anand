'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const CORE_COUNT = 3000;
const RADIUS = 12;

function SynergyCore() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hovered, setHover] = useState(false);
  const pointer = useRef(new THREE.Vector3());

  // Generate sphere cluster mathematically
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < CORE_COUNT; i++) {
       // Spiral / Fibonacci sphere layout for organic brain-like feel
       const phi = Math.acos(-1 + (2 * i) / CORE_COUNT);
       const theta = Math.sqrt(CORE_COUNT * Math.PI) * phi;
       // Add variance
       const r = RADIUS + (Math.random() - 0.5) * 4;
       
       const x = r * Math.cos(theta) * Math.sin(phi);
       const y = r * Math.sin(theta) * Math.sin(phi);
       const z = r * Math.cos(phi);
       
       temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Slow cinematic rotation globally
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;

    // Pointer interactivity tracking (creates repulsion)
    const t = state.clock.getElapsedTime();
    pointer.current.set(
      (state.pointer.x * state.viewport.width) / 2,
      (state.pointer.y * state.viewport.height) / 2,
      0
    );

    // Update instances
    particles.forEach((particle, i) => {
      // Base oscillation
      const oscillation = Math.sin(t * 2 + i) * 0.2;
      
      const px = particle.x + Math.sin(t + i * 0.1) * oscillation;
      const py = particle.y + Math.cos(t + i * 0.1) * oscillation;
      const pz = particle.z + Math.sin(t + i * 0.1) * oscillation;

      let vec = new THREE.Vector3(px, py, pz);

      // Repel from mouse
      const distance = pointer.current.distanceTo(vec);
      if (distance < 5) {
        const repulsion = (5 - distance) * 0.5;
        const dir = vec.clone().sub(pointer.current).normalize();
        vec.add(dir.multiplyScalar(repulsion));
      }

      dummy.position.copy(vec);
      // Scale varies by position
      const scale = 0.5 + Math.sin(t * 3 + i) * 0.5;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[undefined, undefined, CORE_COUNT]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial 
        color={hovered ? "#00ffff" : "#0099ff"} 
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default function NeuralCoreScene() {
  return (
    <div className="w-full h-screen absolute top-0 left-0">
      <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
        <fog attach="fog" args={['#020617', 15, 45]} />
        <ambientLight intensity={0.5} />
        <SynergyCore />
      </Canvas>
    </div>
  );
}
