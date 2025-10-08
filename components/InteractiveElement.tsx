// Fix: Add side-effect import to extend JSX namespace for react-three-fiber elements.
import '@react-three/fiber';
import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Html } from '@react-three/drei';
import * as THREE from 'three';
import HolographicPanel from './HolographicPanel';
import { InteractiveItem } from '../types';
import { useStore } from '../store/useStore';

interface InteractiveElementProps {
    item: InteractiveItem;
    isClickable: boolean;
}

const InteractiveElement: React.FC<InteractiveElementProps> = ({ item, isClickable }) => {
    const [isHovered, setHovered] = useState(false);
    const meshRef = useRef<THREE.Mesh>(null);
    const setExpandedProject = useStore(state => state.setExpandedProject);

    const isLeft = item.position[0] < 0;

    useEffect(() => {
        document.body.style.cursor = isHovered && isClickable ? 'pointer' : 'auto';
        return () => { document.body.style.cursor = 'auto' };
    }, [isHovered, isClickable]);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.MeshStandardMaterial;
            material.emissiveIntensity = isHovered 
                ? 2 + Math.sin(clock.getElapsedTime() * 5)
                : 0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.25;
        }
    });

    const handleClick = () => {
        if (isClickable) {
            setExpandedProject(item);
        }
    };

    return (
        <group position={item.position as [number, number, number]}>
            <Icosahedron
                ref={meshRef}
                args={[0.15, 0]}
                scale={1.5}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={handleClick}
            >
                <meshStandardMaterial 
                    color="#ffd700" 
                    emissive="#ffaa00" 
                    emissiveIntensity={1.5} 
                    toneMapped={false}
                />
            </Icosahedron>
            <Html 
                position={[isLeft ? 0.3 : -0.3, 0, 0]} // Position panel to the side
                style={{ 
                    transition: 'opacity 0.3s, transform 0.3s',
                    opacity: isHovered ? 1 : 0,
                    transform: `scale(${isHovered ? 1 : 0.95}) ${isLeft ? 'translateX(50%)' : 'translateX(-50%)'}`,
                    pointerEvents: 'none',
                    width: 'max-content'
                }}
            >
                <HolographicPanel>
                    {item.text}
                </HolographicPanel>
            </Html>
        </group>
    );
};

export default InteractiveElement;