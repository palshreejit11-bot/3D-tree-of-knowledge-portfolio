
// Fix: Add side-effect import to extend JSX namespace for react-three-fiber elements.
import '@react-three/fiber';
import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import HolographicPanel from './HolographicPanel';

interface InteractiveElementProps {
    position: [number, number, number];
    content: string;
}

const InteractiveElement: React.FC<InteractiveElementProps> = ({ position, content }) => {
    const [isHovered, setHovered] = useState(false);
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.MeshStandardMaterial;
            material.emissiveIntensity = isHovered 
                ? 2 + Math.sin(clock.getElapsedTime() * 5) * 1 
                : 0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.25;
        }
    });

    return (
        <group position={position}>
            <Sphere
                ref={meshRef}
                args={[0.15, 16, 16]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <meshStandardMaterial 
                    color="#00e7ff" 
                    emissive="#00e7ff" 
                    emissiveIntensity={0.5} 
                    toneMapped={false}
                />
            </Sphere>
            <Html 
                position={[0, 0.3, 0]}
                center
                style={{ 
                    transition: 'opacity 0.3s, transform 0.3s',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'scale(1)' : 'scale(0.9)',
                    pointerEvents: 'none',
                    width: 'max-content'
                }}
            >
                <HolographicPanel>
                    {content}
                </HolographicPanel>
            </Html>
        </group>
    );
};

export default InteractiveElement;
