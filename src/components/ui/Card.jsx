import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function Card({ children, className, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } : {}}
      className={cn('glass rounded-2xl p-6 transition-shadow', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
