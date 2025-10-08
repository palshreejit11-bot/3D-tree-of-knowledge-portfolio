import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { InteractiveItem } from '../types';

interface AppState {
  targetRotation: number;
  setTargetRotation: (rotation: number) => void;
  activeSection: number;
  setActiveSection: (section: number) => void;
  expandedProject: InteractiveItem | null;
  setExpandedProject: (project: InteractiveItem | null) => void;
}

export const useStore = create<AppState>()(
  devtools(
    (set) => ({
      targetRotation: 0,
      setTargetRotation: (rotation) => set({ targetRotation: rotation }),
      activeSection: 0,
      setActiveSection: (section) => set({ activeSection: section }),
      expandedProject: null,
      setExpandedProject: (project) => set({ expandedProject: project }),
    }),
    { name: 'TreeOfKnowledgeStore' }
  )
);
