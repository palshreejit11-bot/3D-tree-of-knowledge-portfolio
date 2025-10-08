
import React from 'react';

interface HolographicPanelProps {
    children: React.ReactNode;
    className?: string;
}

const HolographicPanel: React.FC<HolographicPanelProps> = ({ children, className = '' }) => {
    return (
        <div className={`holographic rounded-lg p-2 px-4 text-center text-sm md:text-base ${className}`}>
            {children}
        </div>
    );
};

export default HolographicPanel;
