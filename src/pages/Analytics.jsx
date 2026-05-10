import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import useTaskStore from '../stores/useTaskStore';
import useFocusStore from '../stores/useFocusStore';
import Card from '../components/ui/Card';
import { motion } from 'framer-motion';

const COLORS = ['#6366f1', '#10b981', '#f59e0b'];

export default function Analytics() {
  const tasks = useTaskStore((s) => s.tasks);
  const sessions = useFocusStore((s) => s.sessions);

  const taskStatusData = useMemo(() => {
    const active = tasks.filter(t => t.status === 'active').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    return [
      { name: 'Active', value: active },
      { name: 'Completed', value: completed },
      { name: 'Archived', value: 0 },
    ];
  }, [tasks]);

  const focusData = useMemo(() => {
    const last7 = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0,10);
      const mins = sessions.filter(s => s.date === key).reduce((sum, s) => sum + s.duration, 0);
      return { date: key.slice(5), minutes: mins };
    }).reverse();
    return last7;
  }, [sessions]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Task Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={taskStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Focus Sessions (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={focusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="minutes" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </motion.div>
  );
}
