'use client';

import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';

// Helper function to truncate long titles
function truncateTitle(title: string, maxLength: number = 25): string {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength) + '...';
}

// Helper function to split title into multiple lines
function splitTitle(title: string, maxWordsPerLine: number = 3): string[] {
  const words = title.split(' ');
  const lines: string[] = [];

  for (let i = 0; i < words.length; i += maxWordsPerLine) {
    lines.push(words.slice(i, i + maxWordsPerLine).join(' '));
  }

  return lines;
}

// This component now accepts a 'title' prop
export default function ProjectNode({ position, slug, title }: { position: [number, number, number], slug: string, title: string }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const { scale } = useSpring({ scale: hovered ? 1.5 : 1 });

  useFrame(({ clock }) => {
    if (!meshRef.current || !groupRef.current) return;

    const elapsedTime = clock.getElapsedTime();

    // Continuous gentle bobbing animation (only for the mesh, not the group)
    meshRef.current.position.z = Math.sin(elapsedTime * 2) * 0.1;

    // Continuous gentle rotation
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.008;

    // FIX 2: Pause the orbiting animation when the user is hovering over the node
    if (hovered) return;

    // Smaller orbital radius so nodes stay closer to the skill planet
    const radius = 1.2; // Fixed smaller radius instead of calculating from position
    const initialAngle = Math.atan2(position[1], position[0]);

    // Update the group position for orbiting (this moves both sphere and label together)
    groupRef.current.position.x = Math.cos(elapsedTime * 0.5 + initialAngle) * radius;
    groupRef.current.position.y = Math.sin(elapsedTime * 0.5 + initialAngle) * radius;
    groupRef.current.position.z = position[2]; // Keep original Z position
  });

  const handleClick = () => {
    setTimeout(() => {
      router.push(`/projects/${slug}`);
    }, 100);
  };

  // Split title into lines for better display
  const titleLines = splitTitle(title, 2);
  const shortTitle = truncateTitle(title, 15); // Short version for non-hovered state

  return (
    <group ref={groupRef} position={[0, 0, 0]}> {/* Start at origin, let useFrame handle positioning */}
      <a.mesh
        ref={meshRef}
        position={[0, 0, 0]} // Mesh stays at group center
        scale={scale}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? '#fde047' : '#facc15'}
          emissive={hovered ? '#f59e0b' : '#facc15'}
          emissiveIntensity={hovered ? 2 : 1}
          toneMapped={false}
        />
      </a.mesh>

      {/* Static label that moves with the group - now always visible */}
      <Html
        position={[0, 0.7, 0]} // Good position above sphere
        center
        distanceFactor={6} // Good size for readability
        occlude={false}
        transform={false}
        sprite={true}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1, // Lower z-index than skill nodes
        }}
      >
        <div
          className={`
            px-3 py-2 
            bg-gray-800/90 
            backdrop-blur-sm 
            border border-yellow-400/30 
            rounded-md 
            text-white 
            text-sm
            font-normal
            min-w-[120px]
            max-w-[180px]
            text-center
            shadow-md
            transition-all 
            duration-300
            ${hovered ? 'scale-105 bg-yellow-900/90 border-yellow-300/50 font-medium' : ''}
          `}
        >
          <div className="leading-tight">
            {hovered ? (
              // Show full title with line breaks when hovered
              titleLines.map((line, index) => (
                <div key={index} className="whitespace-nowrap text-sm">
                  {line}
                </div>
              ))
            ) : (
              // Show truncated title when not hovered
              <div className="whitespace-nowrap text-sm">
                {shortTitle}
              </div>
            )}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {hovered ? 'Click to view →' : ''}
          </div>
        </div>
      </Html>
    </group>
  );
}