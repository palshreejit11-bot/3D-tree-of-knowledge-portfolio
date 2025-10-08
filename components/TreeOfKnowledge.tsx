// Fix: Add side-effect import to extend JSX namespace for react-three-fiber elements.
import '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// Fix: Import BufferGeometryUtils from its correct module path.
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// A free model by baronwatts, converted to Draco for smaller size.
const TREE_MODEL_URL = 'https://raw.githubusercontent.com/palshreejit11-bot/my-3d-assets/main/3D%20Holo%20Knowledge%20Tree.glb';

const TreeOfKnowledge: React.FC = () => {
    const gltf = useGLTF(TREE_MODEL_URL);
    const pointsRef = useRef<THREE.Points>(null);

    const pointsGeometry = useMemo(() => {
        const scene = gltf.scene.clone();
        const geometry = new THREE.BufferGeometry();
        const positions: THREE.Float32BufferAttribute[] = [];
        
        scene.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh) {
                positions.push(mesh.geometry.attributes.position as THREE.Float32BufferAttribute);
            }
        });

        if (positions.length > 0) {
            // Fix: Use the imported BufferGeometryUtils instead of accessing it through THREE.
            // Fix: Correctly use `mergeAttributes` from `BufferGeometryUtils` as `mergeBufferAttributes` is deprecated/renamed.
            const mergedPositions = BufferGeometryUtils.mergeAttributes(positions);
            geometry.setAttribute('position', mergedPositions);
        }
        
        return geometry;
    }, [gltf]);

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            const material = pointsRef.current.material as THREE.PointsMaterial;
            // Subtle breathing glow effect
            material.opacity = 0.7 + Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
        }
    });

    return (
        <points ref={pointsRef} geometry={pointsGeometry} scale={[0.8, 0.8, 0.8]}>
            <pointsMaterial 
                color="#00e7ff" 
                size={0.015} 
                sizeAttenuation 
                transparent 
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// Preload the model for faster initial load
useGLTF.preload(TREE_MODEL_URL);

export default TreeOfKnowledge;