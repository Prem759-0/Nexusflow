import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      accent: 'indigo',
      sidebarOpen: true,
      focusDuration: 25,
      shortBreak: 5,
      longBreak: 15,
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setAccent: (accent) => set({ accent }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setFocusSettings: (duration, short, long) =>
        set({ focusDuration: duration, shortBreak: short, longBreak: long }),
    }),
    { name: 'nexusflow-settings' }
  )
);
export default useSettingsStore;
