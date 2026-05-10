import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// We'll use a simple custom hook that listens for key combos
export function useKeyboardShortcuts(shortcuts) {
  useEffect(() => {
    const handler = (e) => {
      shortcuts.forEach(({ key, ctrl, action }) => {
        if (
          e.key.toLowerCase() === key.toLowerCase() &&
          (ctrl ? (e.ctrlKey || e.metaKey) : true) &&
          !e.repeat
        ) {
          e.preventDefault();
          action();
        }
      });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [shortcuts]);
}
