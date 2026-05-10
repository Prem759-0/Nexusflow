import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2, MoreHorizontal } from 'lucide-react';
import useTaskStore from '../stores/useTaskStore';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export default function Kanban() {
  const { tasks, moveTask, addTask, deleteTask, updateTask } = useTaskStore();
  const [newTaskCol, setNewTaskCol] = useState(null);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    moveTask(draggableId, source.droppableId, destination.droppableId, destination.index);
  };

  const handleAdd = (colId, e) => {
    e.preventDefault();
    const title = e.target.title.value;
    addTask({ title, priority: 'medium', dueDate: new Date().toISOString().slice(0,10), column: colId });
    toast.success('Task added');
    setNewTaskCol(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Kanban Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(col => {
            const colTasks = tasks.filter(t => t.column === col.id).sort((a,b) => a.order - b.order);
            return (
              <div key={col.id} className="glass rounded-2xl p-4 min-h-[300px]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">{col.title} <span className="text-xs text-gray-400 ml-2">{colTasks.length}</span></h3>
                  <button onClick={() => setNewTaskCol(col.id)} className="p-1 hover:bg-white/10 rounded"><Plus size={16} /></button>
                </div>
                <Droppable droppableId={col.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 min-h-[100px]">
                      {colTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white dark:bg-slate-700 p-3 rounded-xl shadow-sm flex justify-between items-start"
                              whileHover={{ scale: 1.01 }}
                            >
                              <p className="text-sm flex-1">{task.title}</p>
                              <button onClick={() => { deleteTask(task.id); toast.success('Deleted'); }} className="text-gray-400 hover:text-red-500 ml-2"><Trash2 size={14} /></button>
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
      <Modal isOpen={!!newTaskCol} onClose={() => setNewTaskCol(null)} title="Add Task">
        <form onSubmit={(e) => handleAdd(newTaskCol, e)} className="space-y-4">
          <input name="title" placeholder="Task title" required className="w-full p-2 bg-transparent border-b outline-none" />
          <Button type="submit">Add to {columns.find(c=>c.id===newTaskCol)?.title}</Button>
        </form>
      </Modal>
    </div>
  );
}
