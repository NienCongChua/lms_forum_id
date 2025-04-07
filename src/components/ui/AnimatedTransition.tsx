import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTransitionProps {
  children: ReactNode;
  className?: string;
  type?: 'default' | 'fade' | 'slide' | 'scale' | 'rotate';
  background?: 'none' | 'dots' | 'grid' | 'waves' | 'gradient';
}

const variants = {
  default: {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 }
  },
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  },
  slide: {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.2 }
  },
  rotate: {
    initial: { opacity: 0, rotate: -5 },
    in: { opacity: 1, rotate: 0 },
    out: { opacity: 0, rotate: 5 }
  }
};

const transitions = {
  default: {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3
  },
  fade: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.4
  },
  slide: {
    type: 'spring',
    stiffness: 300,
    damping: 30
  },
  scale: {
    type: 'spring',
    stiffness: 400,
    damping: 30
  },
  rotate: {
    type: 'spring',
    stiffness: 200,
    damping: 25
  }
};

const backgrounds = {
  none: '',
  dots: 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[length:20px_20px]',
  grid: 'bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:20px_20px]',
  waves: 'bg-[url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'smallGrid\' width=\'30\' height=\'30\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 30 0 L 0 0 0 30\' fill=\'none\' stroke=\'%23f0f0f0\' stroke-width=\'0.5\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23smallGrid)\'/%3E%3C/svg%3E")]',
  gradient: 'bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-blue-950 dark:to-blue-900'
};

const AnimatedTransition = ({
  children,
  className = '',
  type = 'default',
  background = 'none'
}: AnimatedTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants[type]}
      transition={transitions[type]}
      className={`${backgrounds[background]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTransition;
