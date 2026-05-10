import { useState } from 'react';
import useSettingsStore from '../stores/useSettingsStore';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const accents = ['indigo', 'emerald', 'rose', 'amber'];

export default function Settings() {
  const { accent, setAccent, focusDuration, shortBreak, longBreak, setFocusSettings, theme, toggleTheme } = useSettingsStore();
  const [fDur, setFDur] = useState(focusDuration);
  const [sBreak, setSBreak] = useState(shortBreak);
  const [lBreak, setLBreak] = useState(longBreak);

  const handleSaveTimers = () => {
    setFocusSettings(fDur, sBreak, lBreak);
    toast.success('Timer settings saved');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-8">
      <h2 className="text-2xl font-bold">Settings</h2>
      <Card>
        <h3 className="font-semibold mb-4">Appearance</h3>
        <div className="flex items-center justify-between mb-4">
          <span>Dark Mode</span>
          <button onClick={toggleTheme} className={`relative w-12 h-6 rounded-full transition ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-300'}`}>
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${theme === 'dark' ? 'translate-x-6' : ''}`} />
          </button>
        </div>
        <div>
          <span className="block mb-2 text-sm">Accent Color</span>
          <div className="flex gap-3">
            {accents.map((a) => (
              <button
                key={a}
                onClick={() => setAccent(a)}
                className={`w-8 h-8 rounded-full bg-${a}-500 ring-2 ring-offset-2 transition ${accent === a ? 'ring-black dark:ring-white' : 'ring-transparent'}`}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card>
        <h3 className="font-semibold mb-4">Focus Timer</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Focus (min)</label>
            <input type="number" value={fDur} onChange={(e) => setFDur(+e.target.value)} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm mb-1">Short Break</label>
            <input type="number" value={sBreak} onChange={(e) => setSBreak(+e.target.value)} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm mb-1">Long Break</label>
            <input type="number" value={lBreak} onChange={(e) => setLBreak(+e.target.value)} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg" />
          </div>
        </div>
        <Button className="mt-4" onClick={handleSaveTimers}>Save</Button>
      </Card>
    </motion.div>
  );
}
