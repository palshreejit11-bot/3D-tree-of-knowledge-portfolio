
// Fix: Add side-effect import to extend JSX namespace for react-three-fiber elements.
import '@react-three/fiber';
import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
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

    useEffect(() => {
        if (isHovered && isClickable) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'auto';
        }
        return () => { document.body.style.cursor = 'auto' };
    }, [isHovered, isClickable]);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.MeshStandardMaterial;
            material.emissiveIntensity = isHovered 
                ? 2 + Math.sin(clock.getElapsedTime() * 5) * 1 
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
            <Sphere
                ref={meshRef}
                args={[0.15, 16, 16]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={handleClick}
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
                    {item.text}
                </HolographicPanel>
            </Html>
        </group>
    );
};

export default InteractiveElement;
