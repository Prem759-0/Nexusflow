import Card from '../components/ui/Card';
import { StickyNote, ListTodo, Timer, TrendingUp } from 'lucide-react';
import useTaskStore from '../stores/useTaskStore';
import useNoteStore from '../stores/useNoteStore';
import useFocusStore from '../stores/useFocusStore';
import FocusTimerWidget from '../components/widgets/FocusTimer';
import ProductivityChart from '../components/widgets/ProductivityChart';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function Dashboard() {
  const tasks = useTaskStore((s) => s.tasks);
  const notes = useNoteStore((s) => s.notes);
  const sessions = useFocusStore((s) => s.sessions);
  const activeTasks = tasks.filter(t => t.status === 'active').length;
  const completedToday = useMemo(() => {
    const today = new Date().toISOString().slice(0,10);
    return tasks.filter(t => t.status === 'completed' && t.dueDate === today).length;
  }, [tasks]);
  const totalFocus = sessions.reduce((acc, s) => acc + s.duration, 0);

  const stats = [
    { label: 'Active Tasks', value: activeTasks, icon: ListTodo, color: 'text-indigo-500' },
    { label: 'Notes', value: notes.length, icon: StickyNote, color: 'text-purple-500' },
    { label: 'Focus Minutes', value: totalFocus, icon: Timer, color: 'text-emerald-500' },
    { label: 'Completed Today', value: completedToday, icon: TrendingUp, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        Good evening, Alex
      </motion.h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-white/10 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ProductivityChart />
        </div>
        <FocusTimerWidget />
      </div>
    </div>
  );
}
