import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, StickyNote, ListTodo, Columns, Calendar, BarChart3, Timer, Settings, ChevronLeft } from 'lucide-react';
import useSettingsStore from '../../stores/useSettingsStore';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/notes', icon: StickyNote, label: 'Notes' },
  { to: '/tasks', icon: ListTodo, label: 'Tasks' },
  { to: '/kanban', icon: Columns, label: 'Kanban' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/focus', icon: Timer, label: 'Focus' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const sidebarOpen = useSettingsStore((s) => s.sidebarOpen);
  const toggleSidebar = useSettingsStore((s) => s.toggleSidebar);

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 240 : 72 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="h-screen sticky top-0 bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-slate-800 flex flex-col z-30"
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200 dark:border-slate-800">
        {sidebarOpen && <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">NexusFlow</span>}
        <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 transition">
          <ChevronLeft size={20} className={cn('transition', !sidebarOpen && 'rotate-180')} />
        </button>
      </div>
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group',
                isActive ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-800',
                !sidebarOpen && 'justify-center'
              )
            }
          >
            <item.icon size={20} />
            {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      {sidebarOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-slate-800 text-xs text-gray-400">
          NexusFlow v1.0
        </div>
      )}
    </motion.aside>
  );
}
