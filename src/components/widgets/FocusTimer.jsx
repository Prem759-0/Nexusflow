// src/components/widgets/FocusTimer.jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import useFocusStore from '../../stores/useFocusStore';
import useSettingsStore from '../../stores/useSettingsStore';
import Card from '../ui/Card';

export default function FocusTimer() {
  const { isRunning, timeLeft, mode, toggleRunning, setTimeLeft, addSession, setMode } = useFocusStore();
  const { focusDuration, shortBreak, longBreak } = useSettingsStore();
  const intervalRef = useRef(null);

  const totalSeconds =
    mode === 'focus'
      ? focusDuration * 60
      : mode === 'shortBreak'
      ? shortBreak * 60
      : longBreak * 60;
  const progress = 1 - timeLeft / totalSeconds;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      addSession(totalSeconds / 60, mode);
      toggleRunning();
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
    <Card className="p-6 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-6">Focus Timer</h3>

      {/* Circular Progress */}
      <div className="relative w-40 h-40 mb-4">
        <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
          <circle
            cx="80" cy="80" r="70"
            fill="none"
            className="text-gray-200 dark:text-slate-700"
            stroke="currentColor"
            strokeWidth="8"
          />
          <motion.circle
            cx="80" cy="80" r="70"
            fill="none"
            className="text-primary-500"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={2 * Math.PI * 70 * (1 - progress)}
            strokeLinecap="round"
            initial={false}
            animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - progress) }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-mono font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={toggleRunning}
          className="p-3 rounded-full glass hover:bg-white/40 dark:hover:bg-slate-800/60 transition-all"
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={reset}
          className="p-3 rounded-full glass hover:bg-white/40 dark:hover:bg-slate-800/60 transition-all"
          aria-label="Reset timer"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Mode selector */}
      <div className="flex gap-1.5 text-xs">
        {['focus', 'shortBreak', 'longBreak'].map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setTimeLeft(
                m === 'focus' ? focusDuration * 60 :
                m === 'shortBreak' ? shortBreak * 60 : longBreak * 60
              );
            }}
            className={`px-3 py-1.5 rounded-full font-medium transition-all ${
              mode === m
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white/20 dark:bg-slate-800/50 hover:bg-white/30'
            }`}
          >
            {m === 'focus' ? 'Focus' : m === 'shortBreak' ? 'Short Break' : 'Long Break'}
          </button>
        ))}
      </div>
    </Card>
  );
}
