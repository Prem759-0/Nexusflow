import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  StickyNote,
  ListTodo,
  Columns,
  Calendar,
  BarChart3,
  Timer,
  Settings,
  ChevronLeft,
  Hexagon,
} from 'lucide-react';
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
      animate={{ width: sidebarOpen ? 256 : 80 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="h-screen sticky top-0 glass border-r border-white/20 dark:border-dark-700/50 flex flex-col z-30 backdrop-blur-2xl"
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/20 dark:border-dark-700/50">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <Hexagon size={24} className="text-primary-500" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary-500 to-purple-500 bg-clip-text text-transparent">
              NexusFlow
            </span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:bg-white/20 dark:hover:bg-dark-700/50 transition-colors"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft
            size={18}
            className={cn('transition-transform', !sidebarOpen && 'rotate-180')}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                isActive
                  ? 'sidebar-link font-medium'
                  : 'text-gray-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-dark-700/40',
                !sidebarOpen && 'justify-center'
              )
            }
          >
            <item.icon size={20} className="flex-shrink-0" />
            {sidebarOpen && (
              <span className="text-sm whitespace-nowrap">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {sidebarOpen && (
        <div className="p-4 border-t border-white/20 dark:border-dark-700/50 text-xs text-gray-400 dark:text-slate-500">
          NexusFlow v1.0 · Premium
        </div>
      )}
    </motion.aside>
  );
}
