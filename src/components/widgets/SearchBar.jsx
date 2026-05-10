import { Search } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = 'Search...' }) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 300);

  useState(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative max-w-lg">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>
  );
}
