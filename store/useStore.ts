
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  targetRotation: number;
  setTargetRotation: (rotation: number) => void;
  activeSection: number;
  setActiveSection: (section: number) => void;
}

export const useStore = create<AppState>()(
  devtools(
    (set) => ({
      targetRotation: 0,
      setTargetRotation: (rotation) => set({ targetRotation: rotation }),
      activeSection: 0,
      setActiveSection: (section) => set({ activeSection: section }),
    }),
    { name: 'TreeOfKnowledgeStore' }
  )
);
