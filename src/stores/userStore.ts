import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  profile: { name: string; email: string; };
  settings: { theme: 'light' | 'dark'; notifications: boolean; };
  stats: { totalVisits: number; projectsCreated: number; };
  updateProfile: (updates: Partial<any>) => void;
  updateSettings: (updates: Partial<any>) => void;
  incrementVisits: () => void;
  incrementProjects: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: { name: 'Guest', email: '' },
      settings: { theme: 'light', notifications: true },
      stats: { totalVisits: 0, projectsCreated: 0 },
      updateProfile: (updates) => set((state: any) => ({ profile: { ...state.profile, ...updates } })),
      updateSettings: (updates) => set((state: any) => ({ settings: { ...state.settings, ...updates } })),
      incrementVisits: () => set((state: any) => ({ stats: { ...state.stats, totalVisits: state.stats.totalVisits + 1 } })),
      incrementProjects: () => set((state: any) => ({ stats: { ...state.stats, projectsCreated: state.stats.projectsCreated + 1 } })),
    }),
    { name: '${REPO_NAME}-user' }
  )
);
