// Fix: Add side-effect import to extend JSX namespace for react-three-fiber elements.
import '@react-three/fiber';
import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// A free model by baronwatts, converted to Draco for smaller size.
const TREE_MODEL_URL = 'https://raw.githubusercontent.com/palshreejit11-bot/my-3d-assets/main/3D%20Holo%20Knowledge%20Tree.glb';

const TreeOfKnowledge: React.FC = () => {
    const { scene } = useGLTF(TREE_MODEL_URL);

    useEffect(() => {
        // Apply a holographic wireframe material to match the aesthetic
        const wireframeMaterial = new THREE.MeshBasicMaterial({ 
            color: "#00e7ff", 
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = wireframeMaterial;
            }
        });
    }, [scene]);


    return (
        <primitive 
            object={scene} 
            scale={[5, 5, 5]} 
            position-y={0} 
        />
    );
};

// Preload the model for faster initial load
useGLTF.preload(TREE_MODEL_URL);

export default TreeOfKnowledge;