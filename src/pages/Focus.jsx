import FocusTimerWidget from '../components/widgets/FocusTimer';
import { motion } from 'framer-motion';

export default function Focus() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto pt-10">
      <h2 className="text-2xl font-bold mb-8 text-center">Deep Focus</h2>
      <FocusTimerWidget />
    </motion.div>
  );
}
