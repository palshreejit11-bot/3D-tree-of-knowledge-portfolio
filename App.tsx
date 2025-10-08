
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import gsap from 'gsap';

import Scene from './components/Scene';
import { useStore } from './store/useStore';
import { SECTION_DATA } from './constants';
import ProjectDetail from './components/ProjectDetail';
import CameraRig from './components/CameraRig';

const App: React.FC = () => {
    const mainTitleRef = useRef<HTMLDivElement>(null);
    const activeSection = useStore(state => state.activeSection);
    const expandedProject = useStore(state => state.expandedProject);
    
    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (useStore.getState().expandedProject) return;

            const currentRotation = useStore.getState().targetRotation;
            const newRotation = currentRotation - event.deltaY * 0.002;
            useStore.getState().setTargetRotation(newRotation);
        };

        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, []);

    useEffect(() => {
        const { title, subtitle } = SECTION_DATA[activeSection] || SECTION_DATA[0];
        if(mainTitleRef.current){
            gsap.to(mainTitleRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                onComplete: () => {
                    const titleEl = mainTitleRef.current?.querySelector('h1');
                    const subtitleEl = mainTitleRef.current?.querySelector('p');
                    if(titleEl) titleEl.innerText = title;
                    if(subtitleEl) subtitleEl.innerText = subtitle;
                    gsap.to(mainTitleRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3
                    });
                }
            })
        }
    }, [activeSection]);


    return (
        <>
            <div className={`w-full h-full transition-filter duration-300 ${expandedProject ? 'blur-sm' : 'blur-none'}`}>
                <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
                    <Suspense fallback={null}>
                        <CameraRig />
                        <Scene />
                    </Suspense>
                </Canvas>
                <div 
                    ref={mainTitleRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[12rem] md:-translate-y-[15rem] text-center pointer-events-none w-full px-4"
                >
                    <div className="holographic rounded-lg inline-block p-4 md:p-6 max-w-lg">
                        <h1 className="text-3xl md:text-5xl font-bold text-cyan-200 tracking-widest uppercase">
                           {SECTION_DATA[0].title}
                        </h1>
                        <p className="text-md md:text-lg text-cyan-300 mt-2">
                           {SECTION_DATA[0].subtitle}
                        </p>
                    </div>
                </div>
            </div>
            <Loader />
            <ProjectDetail />
        </>
    );
};

export default App;