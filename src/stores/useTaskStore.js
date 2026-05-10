import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      listOrder: initialTasks.map(t => t.id), // order for list view

      addTask: (task) =>
        set((state) => {
          const id = task.id || generateId();
          const newTask = { ...task, id, order: state.tasks.filter(t => t.column === task.column).length, status: 'active' };
          return {
            tasks: [...state.tasks, newTask],
            listOrder: [...state.listOrder, id],
          };
        }),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
          listOrder: state.listOrder.filter(tid => tid !== id),
        })),

      // Kanban columns (unchanged)
      reorderTasks: (column, startIndex, endIndex) => {
        set((state) => {
          const columnTasks = state.tasks.filter(t => t.column === column).sort((a, b) => a.order - b.order);
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
          let sourceTasks = state.tasks.filter(t => t.column === sourceCol && t.id !== taskId).sort((a, b) => a.order - b.order);
          sourceTasks = sourceTasks.map((t, idx) => ({ ...t, order: idx }));
          let destTasks = state.tasks.filter(t => t.column === destCol).sort((a, b) => a.order - b.order);
          destTasks.splice(newIndex, 0, { ...updated, order: newIndex });
          destTasks = destTasks.map((t, idx) => ({ ...t, order: idx }));
          const rest = state.tasks.filter(t => t.column !== sourceCol && t.column !== destCol);
          return { tasks: [...rest, ...sourceTasks, ...destTasks] };
        });
      },

      // List reorder
      reorderList: (startIndex, endIndex) =>
        set((state) => {
          const newList = [...state.listOrder];
          const [removed] = newList.splice(startIndex, 1);
          newList.splice(endIndex, 0, removed);
          return { listOrder: newList };
        }),
    }),
    { name: 'nexusflow-tasks' }
  )
);

export default useTaskStore;
