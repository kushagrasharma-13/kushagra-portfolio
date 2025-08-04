'use client';

import * as THREE from 'three';
import { useStore } from '@/lib/store';
import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';

// Separate static label component that doesn't move with group rotation
function StaticSkillLabel({ position, label, hovered, showInside }: { position: [number, number, number], label: string, hovered: boolean, showInside: boolean }) {
  // If showing inside, position at the sphere center, otherwise above it
  const labelPosition: [number, number, number] = showInside
    ? [position[0], position[1], position[2]]
    : [position[0], position[1] + .8, position[2]];

  return (
    <Html
      position={labelPosition}
      center
      distanceFactor={showInside ? 10 : 10} // Smaller text when inside
      occlude={false}
      transform={false}
      sprite={true}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: showInside ? 15 : 10, // Higher z-index when inside
      }}
    >
      <div
        className={`
          ${showInside ? 'px-3 py-2' : 'px-3 py-2'}
          bg-gray-900/90 
          backdrop-blur-sm 
          border border-gray-700/50 
          rounded-lg 
          text-white 
          ${showInside ? 'text-m' : 'text-m'}
          font-medium 
          whitespace-nowrap
          shadow-lg
          transition-all 
          duration-300
          ${hovered ? 'scale-110 bg-blue-900/90 border-blue-500/50' : ''}
        `}
      >
        {label}
      </div>
    </Html>
  );
}

export default function SkillNode({ position, label }: { position: [number, number, number], label: string }) {
  const [hovered, setHovered] = useState(false);
  const setActiveNode = useStore((state) => state.setActiveNode);
  const activeNode = useStore((state) => state.activeNode); // Get current active node

  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  // Colors for hover and default states
  const hoverColor = new THREE.Color('#60a5fa');
  const defaultColor = new THREE.Color('#2563eb');

  // Determine if this is the active skill node (showing project nodes)
  const isActiveSkillNode = activeNode === label;
  const showLabelInside = isActiveSkillNode;

  // This hook runs on every frame to handle animations smoothly
  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    // Continuous floating animation (only affects the mesh, not the group)
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;

    // Continuous subtle rotation
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.005;

    // Animate scale on hover
    const targetScale = hovered ? 1.5 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // Animate color on hover
    const targetColor = hovered ? hoverColor : defaultColor;
    materialRef.current.color.lerp(targetColor, 0.1);
    materialRef.current.emissive.lerp(targetColor, 0.1);

    // Continuous pulsing effect on emissive intensity
    const baseIntensity = hovered ? 3 : 2;
    const pulseIntensity = Math.sin(time * 2) * 0.5 + baseIntensity;
    materialRef.current.emissiveIntensity = pulseIntensity;

    // REMOVED: group rotation so labels don't rotate
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setActiveNode(label);
  };

  return (
    <>
      <group ref={groupRef} position={position}>
        <mesh
          ref={meshRef}
          position={[0, 0, 0]} // Mesh starts at group center, floating animation moves it
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={() => setHovered(false)}
          onClick={handleClick}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            ref={materialRef}
            color={defaultColor}
            emissive={defaultColor}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* COMPLETELY SEPARATE static label that doesn't rotate with the group */}
      <StaticSkillLabel
        position={position}
        label={label}
        hovered={hovered}
        showInside={showLabelInside}
      />
    </>
  );
}