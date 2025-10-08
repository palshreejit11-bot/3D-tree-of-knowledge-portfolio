import React from 'react';
import { useStore } from '../store/useStore';
import HolographicPanel from './HolographicPanel';

const ProjectDetail: React.FC = () => {
    const { expandedProject, setExpandedProject } = useStore();

    if (!expandedProject) return null;

    return (
        <div 
            className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" 
            onClick={() => setExpandedProject(null)}
            aria-modal="true"
            role="dialog"
        >
            <HolographicPanel 
                className="w-full max-w-2xl p-6 md:p-8 relative animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={() => setExpandedProject(null)} 
                    className="absolute top-2 right-4 text-3xl font-bold text-cyan-200 hover:text-white transition-colors"
                    aria-label="Close project details"
                >
                    &times;
                </button>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-100">{expandedProject.text}</h2>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                    {expandedProject.image && (
                         <img 
                            src={expandedProject.image} 
                            alt={expandedProject.text} 
                            className="w-full md:w-1/2 h-auto object-cover rounded-md border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20" 
                         />
                    )}
                    <p className="text-left text-cyan-200 md:text-lg">
                        {expandedProject.description}
                    </p>
                </div>
            </HolographicPanel>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ProjectDetail;
