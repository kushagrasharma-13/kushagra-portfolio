// lib/store.ts
import { create } from 'zustand';

interface AppState {
    activeNode: string | null;
    setActiveNode: (nodeId: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
    activeNode: null,
    setActiveNode: (nodeId) => set({ activeNode: nodeId }),
}));