import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isPointer, setIsPointer] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target;
      if (target) {
        const computed = window.getComputedStyle(target);
        setIsPointer(computed.cursor === 'pointer');
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      <motion.div
        animate={{ scale: isPointer ? 1.5 : 1, opacity: isPointer ? 0.8 : 0.4 }}
        className="w-6 h-6 bg-white rounded-full -ml-3 -mt-3"
      />
    </motion.div>
  );
}
