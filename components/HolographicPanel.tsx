import React from 'react';

// Fix: Extend React.HTMLAttributes<HTMLDivElement> to allow passing standard div props like onClick.
interface HolographicPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const HolographicPanel: React.FC<HolographicPanelProps> = ({ children, className = '', ...rest }) => {
    return (
        <div className={`holographic rounded-lg p-2 px-4 text-center text-sm md:text-base ${className}`} {...rest}>
            {children}
        </div>
    );
};

export default HolographicPanel;
