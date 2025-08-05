'use client';

import Link from 'next/link';
import * as THREE from 'three';
import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect, useCallback } from 'react';

// Data Imports
import projectsData from '@/data/projects.json';

// Component Imports
import SkillNode from '@/components/3d/SkillNode';
import ProjectNode from '@/components/3d/ProjectNode';
import CameraAnimator from '@/components/3d/CameraAnimator';

// State Management
import { useStore } from '@/lib/store';

// --- CONFIGURATION ---
const skillCategories = [
    { label: 'LLM & Generative AI', position: [-5, 2, 0] as [number, number, number] },
    { label: 'Computer Vision', position: [5, 2, 0] as [number, number, number] },
    { label: 'Backend & Cloud', position: [-3, -3, -2] as [number, number, number] },
    { label: 'Data Science & Analytics', position: [3, -3, -2] as [number, number, number] },
];

const nodePositions: { [key: string]: THREE.Vector3 } = {
    'LLM & Generative AI': new THREE.Vector3(-5, 2, 0),
    'Computer Vision': new THREE.Vector3(5, 2, 0),
    'Backend & Cloud': new THREE.Vector3(-3, -3, -2),
    'Data Science & Analytics': new THREE.Vector3(3, -3, -2),
};

// --- 3D SUB-COMPONENTS ---

function AnimatedStars() {
    const starsRef = useRef<any>(null);

    useFrame((state, delta) => {
        if (starsRef.current) {
            starsRef.current.rotation.x += delta * 0.01;
            starsRef.current.rotation.y += delta * 0.015;
        }
    });

    return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />;
}

function ProjectGroup() {
    const activeNode = useStore((state) => state.activeNode);

    if (!activeNode) return null;

    const relevantProjects = projectsData.filter(p => p.category === activeNode);

    return (
        <group position={nodePositions[activeNode]?.toArray()}>
            {relevantProjects.map((project, index) => {
                const angle = (index / relevantProjects.length) * Math.PI * 2;
                const radius = 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return <ProjectNode key={project.slug} slug={project.slug} title={project.title} position={[x, y, 0]} />;
            })}
        </group>
    );
}

// WebGL Context Recovery Component
function ContextRecovery({ onContextLost }: { onContextLost: () => void }) {
    const { gl } = useThree();

    useEffect(() => {
        const handleContextLost = (event: Event) => {
            event.preventDefault();
            console.warn('WebGL context lost - attempting recovery');
            onContextLost();
        };

        const handleContextRestored = () => {
            console.log('WebGL context restored');
            gl.setSize(gl.domElement.width, gl.domElement.height);
        };

        const canvas = gl.domElement;
        canvas.addEventListener('webglcontextlost', handleContextLost);
        canvas.addEventListener('webglcontextrestored', handleContextRestored);

        return () => {
            canvas.removeEventListener('webglcontextlost', handleContextLost);
            canvas.removeEventListener('webglcontextrestored', handleContextRestored);
        };
    }, [gl, onContextLost]);

    return null;
}

// Scene Content Component
function SceneContent({ onContextLost }: { onContextLost: () => void }) {
    const activeNode = useStore((state) => state.activeNode);
    const [isInteracting, setIsInteracting] = useState(false);
    const controlsRef = useRef<any>(null);

    useEffect(() => {
        if (controlsRef.current) {
            controlsRef.current.enabled = !activeNode;
        }
    }, [activeNode]);

    return (
        <>
            <ContextRecovery onContextLost={onContextLost} />
            <color attach="background" args={['#030712']} />
            <CameraAnimator />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <AnimatedStars />

            <OrbitControls
                ref={controlsRef}
                enableZoom={false}
                enablePan={false}
                autoRotate={!isInteracting}
                autoRotateSpeed={0.4}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
            />

            {skillCategories.map(skill => (
                <SkillNode key={skill.label} position={skill.position} label={skill.label} />
            ))}

            <ProjectGroup />
        </>
    );
}

// --- MAIN SCENE COMPONENT ---
export default function Scene() {
    const setActiveNode = useStore((state) => state.setActiveNode);
    const activeNode = useStore((state) => state.activeNode);
    const [hasError, setHasError] = useState(false);
    const [contextLost, setContextLost] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const handleBackClick = useCallback(() => setActiveNode(null), [setActiveNode]);

    const handleContextLost = useCallback(() => {
        setContextLost(true);
        setRetryCount(prev => prev + 1);
        setTimeout(() => setContextLost(false), 1000);
    }, []);

    const handleRetry = useCallback(() => {
        setHasError(false);
        setContextLost(false);
        setRetryCount(prev => prev + 1);
    }, []);

    if (retryCount > 3) {
        return (
            <div className="relative h-[100vh] w-full bg-[#030712] flex items-center justify-center text-center px-4">
                <div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">Kushagra Sharma</h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">AI Engineer specializing in building intelligent systems.</p>
                    <Link href="/projects" className="px-8 py-3 bg-blue-600/80 text-white font-semibold rounded-lg">View My Work</Link>
                    <p className="text-sm text-gray-500 mt-4">3D experience temporarily unavailable</p>
                </div>
            </div>
        );
    }

    if (hasError || contextLost) {
        return (
            <div className="relative h-[100vh] w-full bg-[#030712] flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold mb-2">{contextLost ? 'Recovering 3D Scene...' : 'Loading...'}</h2>
                    <p className="text-gray-300 mb-4">Please wait a moment</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-[100vh] w-full bg-[#030712]">
            <button
                onClick={handleBackClick}
                className={`absolute top-20 left-4 z-20 px-4 py-2 bg-gray-700/50 backdrop-blur-sm rounded-lg transition-opacity duration-500 text-white ${activeNode ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                Back to Overview
            </button>
            <Canvas
                key={retryCount}
                camera={{ position: [0, 0, 15], fov: 45 }}
                gl={{ antialias: true, alpha: false, powerPreference: "default" }}
                onError={() => setHasError(true)}
            >
                <SceneContent onContextLost={handleContextLost} />
            </Canvas>
            <div className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center pointer-events-none transition-opacity duration-500 ${activeNode ? 'opacity-0' : 'opacity-100'}`}>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">Kushagra Sharma</h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">AI Engineer specializing in building intelligent systems, from large language model applications to computer vision diagnostics.</p>
                <div className="mt-8 flex justify-center gap-4 pointer-events-auto">
                    <Link href="/projects" className="px-8 py-3 bg-blue-600/80 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-blue-500/80 transition-colors">
                        View My Work
                    </Link>
                </div>
            </div>
        </div>
    );
}
