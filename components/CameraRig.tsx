import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';

const CameraRig: React.FC = () => {
  const expandedProject = useStore(state => state.expandedProject);

  useFrame(({ camera, clock }) => {
    // Stop camera movement when a project detail modal is open
    if (expandedProject) return;

    // A very slow, continuous rotation based on elapsed time to create gentle motion
    const angle = clock.getElapsedTime() * 0.02;
    const radius = 10;
    
    // Calculate new camera position in a circle
    camera.position.x = Math.sin(angle) * radius;
    camera.position.y = 1.5; // Maintain the initial camera height
    camera.position.z = Math.cos(angle) * radius;
    
    // Ensure the camera always looks at the center of the scene
    camera.lookAt(0, 0, 0);
  });

  return null; // This component is for logic only and does not render anything
};

export default CameraRig;
