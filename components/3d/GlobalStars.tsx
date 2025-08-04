'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';

function AnimatedStars() {
  const starsRef = useRef<THREE.Points>(null!);

  useFrame(() => {
    if (starsRef.current) {
      // This creates a slow, constant rotation of the starfield
      starsRef.current.rotation.x += 0.00005;
      starsRef.current.rotation.y += 0.000075;
    }
  });

  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />;
}

export default function GlobalStars() {
  return (
    // This div places the canvas behind all other content
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <AnimatedStars />
      </Canvas>
    </div>
  );
}