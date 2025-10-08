
// Fix: Add side-effect import to extend JSX namespace for react-three-fiber elements.
import '@react-three/fiber';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';

import TreeOfKnowledge from './TreeOfKnowledge';
import Starfield from './Starfield';
import SectionContent from './SectionContent';
import { useStore } from '../store/useStore';

const Scene: React.FC = () => {
    const groupRef = useRef<Group>(null);
    const targetRotation = useStore(state => state.targetRotation);
    const setActiveSection = useStore(state => state.setActiveSection);

    useFrame((_state, delta) => {
        if (groupRef.current) {
            // Smoothly interpolate rotation using GSAP's utility function
            groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotation, delta * 2);

            // Determine active section based on rotation
            const normalizedRotation = (groupRef.current.rotation.y % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2);
            const sectionIndex = Math.round(normalizedRotation / (Math.PI / 2)) % 4;
            
            if(useStore.getState().activeSection !== sectionIndex){
                setActiveSection(sectionIndex);
            }
        }
    });

    return (
        <>
            <fog attach="fog" args={['#000510', 10, 25]} />
            <ambientLight intensity={0.2} color="#00e7ff" />
            <pointLight position={[0, 5, 5]} intensity={1.5} color="#00e7ff" distance={20} decay={1.5} />
            <Starfield />

            <group ref={groupRef} position-y={-2}>
                <TreeOfKnowledge />
                <SectionContent />
            </group>
            
            <EffectComposer>
                <Bloom intensity={1.5} kernelSize={3} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
            </EffectComposer>
        </>
    );
};

export default Scene;