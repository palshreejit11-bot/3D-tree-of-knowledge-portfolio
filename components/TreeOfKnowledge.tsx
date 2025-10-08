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

    const [pointsGeometry, originalPositions] = useMemo(() => {
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
            // Store a clone of the original positions for stable animation
            return [geometry, mergedPositions.clone()];
        }
        
        return [geometry, null];
    }, [gltf]);

    useFrame(({ clock }) => {
        if (pointsRef.current && originalPositions) {
            const material = pointsRef.current.material as THREE.PointsMaterial;
            const positions = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
            const time = clock.getElapsedTime();

            // Subtle breathing glow effect
            material.opacity = 0.7 + Math.sin(time * 0.5) * 0.3;

            // Subtle swirling particle animation to make the tree feel alive
            for (let i = 0; i < positions.count; i++) {
                const originalX = originalPositions.getX(i);
                const originalY = originalPositions.getY(i);
                const originalZ = originalPositions.getZ(i);
                
                const yOffset = Math.sin(time * 0.3 + originalX * 0.5) * 0.03;
                const xOffset = Math.cos(time * 0.2 + originalZ * 0.5) * 0.03;

                positions.setY(i, originalY + yOffset);
                positions.setX(i, originalX + xOffset);
            }
            positions.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef} geometry={pointsGeometry} scale={[4, 4, 4]}>
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
