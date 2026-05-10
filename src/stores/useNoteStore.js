import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const generateId = () => Math.random().toString(36).substr(2, 9);

const mockNotes = [
  { id: generateId(), title: 'Meeting notes', content: 'Discussed Q2 roadmap, AI features.', tags: ['work', 'meeting'], pinned: true, createdAt: '2026-05-09', updatedAt: '2026-05-09' },
  { id: generateId(), title: 'Recipe ideas', content: 'Try new smoothie combinations.', tags: ['personal'], pinned: false, createdAt: '2026-05-08', updatedAt: '2026-05-08' },
  { id: generateId(), title: 'Book list', content: 'Atomic Habits, Deep Work, Design of Everyday Things', tags: ['learning'], pinned: false, createdAt: '2026-05-07', updatedAt: '2026-05-07' },
];

const useNoteStore = create(
  persist(
    (set) => ({
      notes: mockNotes,
      addNote: (note) =>
        set((state) => ({
          notes: [
            ...state.notes,
            { ...note, id: generateId(), pinned: false, createdAt: new Date().toISOString().slice(0,10), updatedAt: new Date().toISOString().slice(0,10) },
          ],
        })),
      updateNote: (id, updates) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString().slice(0,10) } : n
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
      togglePin: (id) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
        })),
    }),
    { name: 'nexusflow-notes' }
  )
);
export default useNoteStore;
