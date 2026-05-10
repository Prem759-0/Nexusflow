import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid'; // I'll avoid uuid, use a simple ID generator

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialTasks = [
  { id: generateId(), title: 'Design dashboard wireframes', description: '', priority: 'high', dueDate: '2026-05-15', status: 'active', column: 'todo', order: 0 },
  { id: generateId(), title: 'Review PR #42', description: 'Check new API integration', priority: 'medium', dueDate: '2026-05-14', status: 'active', column: 'in-progress', order: 0 },
  { id: generateId(), title: 'Update README', description: '', priority: 'low', dueDate: '2026-05-20', status: 'completed', column: 'done', order: 0 },
  { id: generateId(), title: 'Prepare presentation', description: 'Slide deck for team meeting', priority: 'high', dueDate: '2026-05-16', status: 'active', column: 'todo', order: 1 },
];

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { ...task, id: generateId(), order: state.tasks.filter(t => t.column === task.column).length, status: 'active' },
          ],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
      reorderTasks: (column, startIndex, endIndex) => {
        set((state) => {
          const columnTasks = state.tasks.filter(t => t.column === column).sort((a,b) => a.order - b.order);
          const [removed] = columnTasks.splice(startIndex, 1);
          columnTasks.splice(endIndex, 0, removed);
          const reordered = columnTasks.map((t, idx) => ({ ...t, order: idx }));
          const otherTasks = state.tasks.filter(t => t.column !== column);
          return { tasks: [...otherTasks, ...reordered] };
        });
      },
      moveTask: (taskId, sourceCol, destCol, newIndex) => {
        set((state) => {
          const task = state.tasks.find(t => t.id === taskId);
          if (!task) return state;
          const updated = { ...task, column: destCol, status: destCol === 'done' ? 'completed' : 'active' };
          // Remove from source reorder
          let sourceTasks = state.tasks.filter(t => t.column === sourceCol && t.id !== taskId).sort((a,b) => a.order - b.order);
          sourceTasks = sourceTasks.map((t, idx) => ({ ...t, order: idx }));
          // Insert into dest
          let destTasks = state.tasks.filter(t => t.column === destCol).sort((a,b) => a.order - b.order);
          destTasks.splice(newIndex, 0, { ...updated, order: newIndex });
          destTasks = destTasks.map((t, idx) => ({ ...t, order: idx }));
          const rest = state.tasks.filter(t => t.column !== sourceCol && t.column !== destCol);
          return { tasks: [...rest, ...sourceTasks, ...destTasks] };
        });
      },
    }),
    { name: 'nexusflow-tasks' }
  )
);
export default useTaskStore;
