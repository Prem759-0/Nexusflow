import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Command } from 'lucide-react';

const commands = [
  { name: 'Dashboard', path: '/', shortcut: 'G D' },
  { name: 'Notes', path: '/notes', shortcut: 'G N' },
  { name: 'Tasks', path: '/tasks', shortcut: 'G T' },
  { name: 'Kanban', path: '/kanban', shortcut: 'G K' },
  { name: 'Calendar', path: '/calendar', shortcut: 'G C' },
  { name: 'Analytics', path: '/analytics', shortcut: 'G A' },
  { name: 'Focus Timer', path: '/focus', shortcut: 'G F' },
  { name: 'Settings', path: '/settings', shortcut: 'G S' },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const filtered = commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
      const handler = (e) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/30 dark:bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass dark:bg-dark-800/90 dark:border-dark-700/50 rounded-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="flex items-center p-4 border-b border-white/10 dark:border-dark-700/50">
              <Search size={18} className="text-gray-400 dark:text-slate-500 mr-2" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="bg-transparent flex-1 outline-none text-sm dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500"
              />
              <kbd className="text-xs text-gray-400 dark:text-slate-500 bg-white/5 dark:bg-dark-700/50 px-2 py-0.5 rounded">esc</kbd>
            </div>
            <ul className="max-h-64 overflow-auto p-2">
              {filtered.map((cmd) => (
                <li key={cmd.path}>
                  <button
                    onClick={() => { navigate(cmd.path); onClose(); }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 dark:hover:bg-dark-700/40 transition text-left"
                  >
                    <span>{cmd.name}</span>
                    <span className="text-xs text-gray-400 dark:text-slate-500">{cmd.shortcut}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm text-gray-400 dark:text-slate-500">No results found.</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
