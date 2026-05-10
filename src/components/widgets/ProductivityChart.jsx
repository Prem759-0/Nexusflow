import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useTaskStore from '../../stores/useTaskStore';
import { format, startOfWeek, addDays, isWithinInterval } from 'date-fns';

export default function ProductivityChart() {
  const tasks = useTaskStore((s) => s.tasks.filter(t => t.status === 'completed'));
  const data = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    return Array.from({ length: 7 }).map((_, i) => {
      const day = addDays(weekStart, i);
      const count = tasks.filter(t => {
        const due = new Date(t.dueDate);
        return isWithinInterval(due, { start: day, end: addDays(day, 1) });
      }).length;
      return { day: format(day, 'EEE'), completed: count };
    });
  }, [tasks]);

  return (
    <div className="glass rounded-2xl p-6 h-64">
      <h3 className="text-lg font-semibold mb-4">Weekly Task Completion</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#9ca3af" />
          <YAxis allowDecimals={false} stroke="#9ca3af" />
          <Tooltip />
          <Bar dataKey="completed" fill="#6366f1" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
