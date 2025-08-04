'use client';

import * as THREE from 'three';
import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// --- NEW, MORE DETAILED 3D MODELS ---

function LLMModel() {
  const groupRef = useRef<any>(null);
  const particlesRef = useRef<any>(null);

  const particleCount = 100;
  const particles = useMemo(() => {
    const temp = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Start particles near the center
      temp[i * 3 + 0] = (Math.random() - 0.5) * 0.2; // x
      temp[i * 3 + 1] = (Math.random() - 0.5) * 0.2; // y
      temp[i * 3 + 2] = (Math.random() - 0.5) * 0.2; // z
    }
    return temp;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Move particles outwards in a stream
        positions[i3 + 2] += 0.02;

        // Reset particles that go too far to create a continuous loop
        if (positions[i3 + 2] > 2) {
          positions[i3 + 0] = (Math.random() - 0.5) * 0.2;
          positions[i3 + 1] = (Math.random() - 0.5) * 0.2;
          positions[i3 + 2] = -2;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 16]} />
        <meshStandardMaterial color="#a78bfa" emissive="#6d28d9" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      {/* Text Token Stream */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
            count={particleCount}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#60a5fa"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// NEW, more illustrative CNN Model
function CNNModel() {
  const dataPacketRef = useRef<THREE.Mesh>(null!);
  const convLayer1Ref = useRef<THREE.Mesh>(null!);
  const convLayer2Ref = useRef<THREE.Mesh>(null!);
  const outputLayerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const loopDuration = 4; // 4 seconds for one full loop
    const progress = (t % loopDuration) / loopDuration;

    const startX = -1.5;
    const endX = 1.5;
    const currentX = startX + (endX - startX) * progress;

    if (dataPacketRef.current) {
      dataPacketRef.current.position.x = currentX;
    }

    // Function to handle layer activation glow
    const handleActivation = (layerRef: React.RefObject<any>, activationStart: number, activationEnd: number) => {
      if (layerRef.current) {
        if (progress > activationStart && progress < activationEnd) {
          layerRef.current.material.emissiveIntensity = 2;
        } else {
          layerRef.current.material.emissiveIntensity = 0;
        }
      }
    };

    handleActivation(convLayer1Ref, 0.25, 0.45);
    handleActivation(convLayer2Ref, 0.55, 0.75);
    handleActivation(outputLayerRef, 0.85, 1.0);
  });

  return (
    <group rotation={[0.5, 0.5, 0]}>
      {/* Data Packet */}
      <mesh ref={dataPacketRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#fde047" emissive="#facc15" emissiveIntensity={3} toneMapped={false} />
      </mesh>

      {/* Input Image Plane */}
      <mesh position={[-1.5, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#a78bfa" side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>
      {/* Convolutional Layers */}
      <mesh ref={convLayer1Ref} position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#8b5cf6" wireframe emissive="#8b5cf6" emissiveIntensity={0} toneMapped={false} />
      </mesh>
      <mesh ref={convLayer2Ref} position={[0.5, 0, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#6d28d9" wireframe emissive="#6d28d9" emissiveIntensity={0} toneMapped={false} />
      </mesh>
      {/* Output Layer */}
      <mesh ref={outputLayerRef} position={[1.5, 0, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0} toneMapped={false} />
      </mesh>
    </group>
  )
}


function ServerStackModel() {
  const light1Ref = useRef<any>(null);
  const light2Ref = useRef<any>(null);
  useFrame((state) => {
    // Blinking lights animation
    if (light1Ref.current) {
      light1Ref.current.material.emissiveIntensity = Math.abs(Math.sin(state.clock.elapsedTime * 3)) * 5;
    }
    if (light2Ref.current) {
      light2Ref.current.material.emissiveIntensity = Math.abs(Math.sin(state.clock.elapsedTime * 2 + 1)) * 5;
    }
  });
  return (
    <group>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.5, 0.4, 0.8]} />
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={light1Ref} position={[-0.6, 0.4, 0.41]}>
        <circleGeometry args={[0.03, 8]} />
        <meshStandardMaterial color="green" emissive="green" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[1.5, 0.4, 0.8]} />
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={light2Ref} position={[-0.6, -0.2, 0.41]}>
        <circleGeometry args={[0.03, 8]} />
        <meshStandardMaterial color="green" emissive="green" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  )
}

function BarChartModel() {
  const bar1Ref = useRef<THREE.Mesh>(null!);
  const bar2Ref = useRef<THREE.Mesh>(null!);
  const bar3Ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    // Animating bars up and down
    if (bar1Ref.current) bar1Ref.current.scale.y = Math.abs(Math.sin(state.clock.elapsedTime * 1.5)) * 0.8 + 0.2;
    if (bar2Ref.current) bar2Ref.current.scale.y = Math.abs(Math.sin(state.clock.elapsedTime * 1.2 + 1)) * 1.4 + 0.2;
    if (bar3Ref.current) bar3Ref.current.scale.y = Math.abs(Math.sin(state.clock.elapsedTime * 1.8 + 2)) * 1.0 + 0.2;
  });
  return (
    <group>
      <mesh ref={bar1Ref} position={[-0.4, 0, 0]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color="#a78bfa" />
      </mesh>
      <mesh ref={bar2Ref} position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
      <mesh ref={bar3Ref} position={[0.4, 0, 0]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color="#a78bfa" />
      </mesh>
    </group>
  )
}


// This component renders the animated 3D artifact
function ProjectArtifact({ isHovered, category }: { isHovered: boolean, category: string }) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!meshRef.current) return;

    // Animate rotation
    meshRef.current.rotation.x += isHovered ? 0.01 : 0.002;
    meshRef.current.rotation.y += isHovered ? 0.015 : 0.003;

    // Animate scale
    const targetScale = isHovered ? 1.1 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  // Return a different model based on the project category
  const getModel = () => {
    switch (category) {
      case 'LLM & Generative AI':
        return <LLMModel />;
      case 'Computer Vision':
        return <CNNModel />;
      case 'Backend & Cloud':
        return <ServerStackModel />;
      case 'Data Science & Analytics':
        return <BarChartModel />;
      default:
        return <mesh><sphereGeometry args={[1.2]} /></mesh>;
    }
  };

  return (
    <group ref={meshRef}>
      {getModel()}
    </group>
  );
}

// This is the main component that will be imported into the project page
export default function ProjectScene3D({ isHovered, category }: { isHovered: boolean, category: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 5]} intensity={3} />
        <ProjectArtifact isHovered={isHovered} category={category} />
      </Suspense>
    </Canvas>
  );
}
