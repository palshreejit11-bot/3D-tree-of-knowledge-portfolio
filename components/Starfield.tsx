
// Fix: Add side-effect import to extend JSX namespace for react-three-fiber elements.
import '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Starfield: React.FC = () => {
    const pointsRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const count = 5000;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 40;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }, []);

    useFrame((_state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.01;
            pointsRef.current.rotation.x += delta * 0.005;
        }
    });

    return (
        <points ref={pointsRef} geometry={particles}>
            <pointsMaterial 
                size={0.02} 
                color="#00e7ff" 
                sizeAttenuation 
                transparent 
                opacity={0.3} 
            />
        </points>
    );
};

export default Starfield;
