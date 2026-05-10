// Similar structure: list with drag to reorder, filter by priority/status, search, add/edit modal.
// I'll give a condensed but functional version.
import { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, GripVertical, Trash2, CheckCircle, Circle } from 'lucide-react';
import useTaskStore from '../stores/useTaskStore';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Tasks() {
  const { tasks, addTask, updateTask, deleteTask, reorderTasks } = useTaskStore();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const listTasks = tasks.filter(t => t.column === 'todo' || t.column === 'in-progress' || t.column === 'done' ? true : false);
  // simplified: treat all tasks as list, column = status
  const filtered = useMemo(() => {
    return listTasks.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'all' || t.status === filterStatus;
      return matchSearch && matchStatus;
    }).sort((a,b) => a.order - b.order);
  }, [tasks, search, filterStatus]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderTasks('list', result.source.index, result.destination.index);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = { title: form.title.value, priority: form.priority.value, dueDate: form.dueDate.value };
    if (editTask) {
      updateTask(editTask.id, data);
      toast.success('Task updated');
    } else {
      addTask({ ...data, status: 'active', column: 'todo' });
      toast.success('Task added');
    }
    setNewTaskOpen(false);
    setEditTask(null);
  };

  const toggleComplete = (task) => {
    updateTask(task.id, { status: task.status === 'completed' ? 'active' : 'completed', column: task.status === 'completed' ? 'todo' : 'done' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={() => setNewTaskOpen(true)}><Plus size={16} /> Add Task</Button>
      </div>
      <div className="flex gap-3 items-center">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." className="px-4 py-2 bg-white dark:bg-slate-800 border rounded-xl" />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 bg-white dark:bg-slate-800 border rounded-xl">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
              {filtered.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`glass rounded-xl p-4 flex items-center gap-4 ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                    >
                      <div {...provided.dragHandleProps} className="text-gray-400"><GripVertical size={18} /></div>
                      <button onClick={() => toggleComplete(task)}>
                        {task.status === 'completed' ? <CheckCircle className="text-green-500" size={20} /> : <Circle className="text-gray-300" size={20} />}
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>{task.title}</p>
                        <p className="text-xs text-gray-500">Due {task.dueDate} · {task.priority}</p>
                      </div>
                      <button onClick={() => { setEditTask(task); }} className="text-xs underline">Edit</button>
                      <button onClick={() => { deleteTask(task.id); toast.success('Task deleted'); }} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {filtered.length === 0 && <EmptyState title="No tasks" description="Add your first task" />}
      <Modal isOpen={newTaskOpen || !!editTask} onClose={() => { setNewTaskOpen(false); setEditTask(null); }} title={editTask ? 'Edit Task' : 'New Task'}>
        <form onSubmit={handleSave} className="space-y-4">
          <input name="title" defaultValue={editTask?.title} placeholder="Task title" required className="w-full p-2 bg-transparent border-b outline-none" />
          <select name="priority" defaultValue={editTask?.priority || 'medium'} className="w-full p-2 bg-transparent border rounded-lg">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input name="dueDate" type="date" defaultValue={editTask?.dueDate || new Date().toISOString().slice(0,10)} className="w-full p-2 bg-transparent border rounded-lg" />
          <Button type="submit" className="w-full">{editTask ? 'Update' : 'Add Task'}</Button>
        </form>
      </Modal>
    </div>
  );
}
