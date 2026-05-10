import { Sun, Moon, Search, Command } from 'lucide-react';
import useSettingsStore from '../../stores/useSettingsStore';
import { useState } from 'react';
import CommandPalette from '../ui/CommandPalette';

export default function Navbar() {
  const { theme, toggleTheme } = useSettingsStore();
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 h-16 glass border-b border-white/20 dark:border-slate-700/30 flex items-center justify-between px-6 backdrop-blur-2xl">
        {/* Search trigger */}
        <button
          onClick={() => setPaletteOpen(true)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors px-3 py-1.5 rounded-xl bg-white/20 dark:bg-slate-800/50"
        >
          <Search size={16} />
          <span className="hidden sm:inline">Search anything...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-2 text-xs bg-white/30 dark:bg-slate-700/50 px-1.5 py-0.5 rounded-md">
            <Command size={12} />K
          </kbd>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-white/20 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Avatar with gradient */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 ring-2 ring-white/30 dark:ring-slate-700/30" />
        </div>
      </header>

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
