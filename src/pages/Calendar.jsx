import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useTaskStore from '../stores/useTaskStore';
import { motion } from 'framer-motion';

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const tasks = useTaskStore((s) => s.tasks);
  const dayTasks = tasks.filter(t => t.dueDate === date.toISOString().slice(0,10));

  // Custom tile content
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const count = tasks.filter(t => t.dueDate === date.toISOString().slice(0,10)).length;
      return count > 0 ? <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mx-auto mt-1" /> : null;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-bold">Calendar</h2>
      <div className="glass rounded-2xl p-6 max-w-3xl mx-auto">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={tileContent}
          className="border-none !w-full bg-transparent"
        />
      </div>
      <div className="glass rounded-2xl p-6 max-w-3xl mx-auto">
        <h3 className="font-semibold mb-3">Tasks for {date.toDateString()}</h3>
        {dayTasks.length > 0 ? (
          <ul className="space-y-2">
            {dayTasks.map(task => (
              <li key={task.id} className="flex items-center gap-2 text-sm">
                <span className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-indigo-500'}`} />
                {task.title}
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-gray-400">No tasks due.</p>}
      </div>
    </motion.div>
  );
}
