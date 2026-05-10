import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import useFocusStore from '../../stores/useFocusStore';
import useSettingsStore from '../../stores/useSettingsStore';

export default function FocusTimerWidget() {
  const { isRunning, timeLeft, mode, toggleRunning, setTimeLeft, addSession, setMode } = useFocusStore();
  const { focusDuration, shortBreak, longBreak } = useSettingsStore();
  const intervalRef = useRef(null);
  const totalSeconds = mode === 'focus' ? focusDuration * 60 : mode === 'shortBreak' ? shortBreak * 60 : longBreak * 60;
  const progress = 1 - timeLeft / totalSeconds;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      addSession(totalSeconds / 60, mode);
      toggleRunning();
      // Switch to break if focus, etc.
      if (mode === 'focus') setMode('shortBreak');
      else setMode('focus');
      setTimeLeft(mode === 'focus' ? shortBreak * 60 : focusDuration * 60);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const reset = () => {
    toggleRunning(false);
    setTimeLeft(totalSeconds);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const secsLeft = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${secsLeft.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 glass rounded-2xl">
      <h3 className="text-lg font-semibold mb-4">Focus Timer</h3>
      <div className="flex flex-col items-center">
        <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
          <circle cx="80" cy="80" r="70" fill="none" className="text-gray-200 dark:text-gray-700" stroke="currentColor" strokeWidth="8" />
          <motion.circle
            cx="80" cy="80" r="70" fill="none" className="text-indigo-500" stroke="currentColor" strokeWidth="8"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={2 * Math.PI * 70 * (1 - progress)}
            strokeLinecap="round"
            initial={false}
            animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - progress) }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="text-4xl font-mono font-bold mt-4">{formatTime(timeLeft)}</div>
        <div className="flex gap-3 mt-4">
          <button onClick={toggleRunning} className="p-2 neo rounded-full hover:scale-105 transition">
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button onClick={reset} className="p-2 neo rounded-full hover:scale-105 transition">
            <RotateCcw size={20} />
          </button>
        </div>
        <div className="flex gap-2 mt-4 text-xs">
          {['focus', 'shortBreak', 'longBreak'].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setTimeLeft(m === 'focus' ? focusDuration*60 : m==='shortBreak' ? shortBreak*60 : longBreak*60); }}
              className={`px-3 py-1 rounded-full transition ${mode === m ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              {m === 'focus' ? 'Focus' : m === 'shortBreak' ? 'Short Break' : 'Long Break'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
