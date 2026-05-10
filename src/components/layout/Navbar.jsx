import { Sun, Moon, Search, Command } from 'lucide-react';
import useSettingsStore from '../../stores/useSettingsStore';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CommandPalette from '../ui/CommandPalette';

export default function Navbar() {
  const { theme, toggleTheme } = useSettingsStore();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-6">
        <button
          onClick={() => setPaletteOpen(true)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800"
        >
          <Search size={16} />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline text-xs ml-2 bg-white/10 px-1.5 rounded">⌘K</kbd>
        </button>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          {/* Profile placeholder */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
        </div>
      </header>
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
