
// Fix: Add side-effect import to extend JSX namespace for react-three-fiber elements.
import '@react-three/fiber';
import React from 'react';
import { useStore } from '../store/useStore';
import { SECTION_DATA } from '../constants';
import InteractiveElement from './InteractiveElement';
import { Html } from '@react-three/drei';
import HolographicPanel from './HolographicPanel';

const SectionContent: React.FC = () => {
    const activeSection = useStore(state => state.activeSection);
    
    return (
        <>
            {SECTION_DATA.map((section, index) => (
                <group key={section.id} visible={activeSection === index}>
                    {section.items.map((item, itemIndex) => (
                         <InteractiveElement 
                            key={`${section.id}-${itemIndex}`}
                            item={item}
                            isClickable={section.id === 'our-work'}
                         />
                    ))}
                </group>
            ))}

            {/* Special case for Contact section panel */}
            <Html 
                position={[0, 0.5, 3]} 
                transform 
                occlude
                style={{
                    transition: 'opacity 0.5s',
                    opacity: activeSection === 3 ? 1 : 0,
                    pointerEvents: activeSection === 3 ? 'auto' : 'none'
                }}
            >
                <HolographicPanel className="w-80 p-6">
                    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                    <p className="mb-2">Email: info@synapse.digital</p>
                    <p className="mb-2">Phone: +1 (555) 123-4567</p>
                    <p>Social: @SynapseDigital</p>
                </HolographicPanel>
            </Html>
        </>
    );
};

export default SectionContent;
