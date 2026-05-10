import Card from '../components/ui/Card';
import { StickyNote, ListTodo, Timer, TrendingUp, Sparkles } from 'lucide-react';
import useTaskStore from '../stores/useTaskStore';
import useNoteStore from '../stores/useNoteStore';
import useFocusStore from '../stores/useFocusStore';
import FocusTimerWidget from '../components/widgets/FocusTimer';
import ProductivityChart from '../components/widgets/ProductivityChart';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const tasks = useTaskStore((s) => s.tasks);
  const notes = useNoteStore((s) => s.notes);
  const sessions = useFocusStore((s) => s.sessions);
  const activeTasks = tasks.filter((t) => t.status === 'active').length;
  const completedToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return tasks.filter(
      (t) => t.status === 'completed' && t.dueDate === today
    ).length;
  }, [tasks]);
  const totalFocus = sessions.reduce((acc, s) => acc + s.duration, 0);

  const stats = [
    { label: 'Active Tasks', value: activeTasks, icon: ListTodo, color: 'text-primary-500' },
    { label: 'Notes', value: notes.length, icon: StickyNote, color: 'text-purple-500' },
    { label: 'Focus Minutes', value: totalFocus, icon: Timer, color: 'text-emerald-500' },
    { label: 'Completed Today', value: completedToday, icon: TrendingUp, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Sparkles className="text-primary-500" size={28} />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
          Good evening, Alex
        </h1>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <Card className="flex items-center gap-5 hover:shadow-glass-lg">
              <div className={`p-3 rounded-xl bg-white/30 dark:bg-slate-800/50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts & Timer */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ProductivityChart />
        </div>
        <FocusTimerWidget />
      </div>
    </div>
  );
}
