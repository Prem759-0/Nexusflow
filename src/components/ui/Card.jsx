import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function Card({ children, className, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -4,
              scale: 1.01,
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            }
          : {}
      }
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'glass rounded-2xl p-6 transition-shadow duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
