import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  leftIcon,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50';

  const variants = {
    primary:
      'bg-primary-600 hover:bg-primary-700 text-white shadow-glow hover:shadow-glow-lg',
    secondary: 'glass hover:bg-white/40 dark:hover:bg-slate-800/40',
    ghost: 'hover:bg-white/20 dark:hover:bg-slate-800/40',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {leftIcon}
      {children}
    </motion.button>
  );
}
