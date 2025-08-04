'use client';

import * as THREE from 'three';
import { useStore } from '@/lib/store';
import { useFrame } from '@react-three/fiber';

// Define the positions for each node, matching the homepage
const nodePositions: { [key: string]: THREE.Vector3 } = {
  'LLM & Generative AI': new THREE.Vector3(-5, 2, 0),
  'Computer Vision': new THREE.Vector3(5, 2, 0),
  'Backend & Cloud': new THREE.Vector3(-3, -3, -2),
  'Data Science & Analytics': new THREE.Vector3(3, -3, -2),
};
const defaultCameraPosition = new THREE.Vector3(0, 0, 15);
const defaultLookAt = new THREE.Vector3(0, 0, 0);

export default function CameraAnimator() {
  const activeNode = useStore((state) => state.activeNode);

  useFrame((state) => {
    let targetPosition = defaultCameraPosition;
    let targetLookAt = defaultLookAt;

    if (activeNode && nodePositions[activeNode]) {
      // FIX: Increased the z-distance from 5 to 8 to pull the camera back.
      // This prevents the planets from being too zoomed in or clipped.
      targetPosition = nodePositions[activeNode].clone().add(new THREE.Vector3(0, 0, 8));
      targetLookAt = nodePositions[activeNode];
    }

    // Smoothly animate camera to target position
    state.camera.position.lerp(targetPosition, 0.025);
    // Smoothly make camera look at the correct target
    state.camera.lookAt(targetLookAt);
    state.camera.updateProjectionMatrix();
  });

  return null; // This component doesn't render anything itself
}