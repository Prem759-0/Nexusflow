import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFocusStore = create(
  persist(
    (set, get) => ({
      sessions: [], // { date, duration, type }
      isRunning: false,
      mode: 'focus', // 'focus' | 'shortBreak' | 'longBreak'
      timeLeft: 25 * 60, // seconds
      addSession: (duration, type) =>
        set((state) => ({
          sessions: [...state.sessions, { date: new Date().toISOString().slice(0,10), duration, type }],
        })),
      resetTimer: (duration) => set({ timeLeft: duration * 60, isRunning: false }),
      setTimeLeft: (t) => set({ timeLeft: t }),
      toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),
      setMode: (mode) => set({ mode }),
    }),
    { name: 'nexusflow-focus' }
  )
);
export default useFocusStore;
