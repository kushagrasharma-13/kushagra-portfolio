'use client';

import { useRef } from 'react';
import { Suspense } from 'react';
import { a, useSpring } from '@react-spring/three';
import { Canvas, useFrame } from '@react-three/fiber';

function BrainModel({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<any>(null);

  const props = useSpring({
    scale: isHovered ? 1.1 : 1,
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    // @ts-ignore
    <a.mesh ref={meshRef} scale={props.scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#a78bfa"
        metalness={0.6}
        roughness={0.3}
        wireframe
      />
    </a.mesh>
  );
}

export default function AboutScene({ isHovered }: { isHovered: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 35 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 5]} intensity={3} />
        <BrainModel isHovered={isHovered} />
      </Suspense>
    </Canvas>
  );
}