import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useInView, animate } from 'framer-motion';

/**
 * Custom Cubic-Bezier easing curve: [0.22, 1, 0.36, 1]
 * Creates smooth, high-end agency physics with soft decel.
 */
export const TRANSITION_EASE = [0.22, 1, 0.36, 1];

/**
 * ScrollProgressBar: Fixed 2.5px Deep Crimson (#991B1B) progress bar at the top of the viewport.
 */
export function ScrollProgressBar({ zIndex = 100, color = '#991B1B', height = 2.5 }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        backgroundColor: color,
        transformOrigin: '0%',
        scaleX,
        zIndex,
        pointerEvents: 'none'
      }}
    />
  );
}

/**
 * FadeUp: Smooth opacity + y reveal.
 * Initial opacity floor of 0.6 ensures content is immediately legible and never gets stuck invisible.
 */
export function FadeUp({ 
  children, 
  delay = 0, 
  duration = 0.35, 
  y = 12, 
  className = '', 
  style = {},
  amount = 0.02,
  ...props 
}) {
  return (
    <motion.div
      initial={{ opacity: 0.6, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: TRANSITION_EASE
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer: Wraps container elements cleanly.
 */
export function StaggerContainer({ 
  children, 
  className = '', 
  style = {},
  ...props 
}) {
  return (
    <div
      className={className}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * StaggerItem: Bulletproof item with individual view-detection so it never stays hidden.
 */
export function StaggerItem({ 
  children, 
  delay = 0,
  y = 12, 
  duration = 0.35, 
  className = '', 
  style = {},
  amount = 0.02,
  ...props 
}) {
  return (
    <motion.div
      initial={{ opacity: 0.6, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: TRANSITION_EASE
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedCounter: Smoothly counts numbers (e.g., "12+", "50–140", "2,700+", "98.4%")
 * when scrolled into view.
 */
export function AnimatedCounter({ 
  value, 
  duration = 1.6, 
  className = '', 
  style = {} 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    // Handle string values with numbers, prefixes/suffixes, and ranges
    const str = String(value).trim();

    // Check for range like "50–140" or "50-140"
    const rangeMatch = str.match(/^(\d+)\s*[–\-]\s*(\d+)(.*)$/);
    if (rangeMatch) {
      const startNum = parseInt(rangeMatch[1], 10);
      const endNum = parseInt(rangeMatch[2], 10);
      const suffix = rangeMatch[3] || '';
      
      const controls = animate(0, 1, {
        duration,
        ease: TRANSITION_EASE,
        onUpdate: (latest) => {
          const curStart = Math.round(startNum * latest);
          const curEnd = Math.round(endNum * latest);
          setDisplayValue(`${curStart}–${curEnd}${suffix}`);
        }
      });
      return () => controls.stop();
    }

    // Check for decimal like "98.4%"
    const decimalMatch = str.match(/^([0-9.]+)(.*)$/);
    if (decimalMatch && decimalMatch[1].includes('.')) {
      const target = parseFloat(decimalMatch[1]);
      const suffix = decimalMatch[2] || '';
      const controls = animate(0, target, {
        duration,
        ease: TRANSITION_EASE,
        onUpdate: (latest) => {
          setDisplayValue(`${latest.toFixed(1)}${suffix}`);
        }
      });
      return () => controls.stop();
    }

    // Check for integer with optional commas and suffix e.g. "2,700+" or "12+ Yrs"
    const intMatch = str.match(/^([0-9,]+)(.*)$/);
    if (intMatch) {
      const cleanNum = parseInt(intMatch[1].replace(/,/g, ''), 10);
      const suffix = intMatch[2] || '';
      const hasCommas = intMatch[1].includes(',');

      const controls = animate(0, cleanNum, {
        duration,
        ease: TRANSITION_EASE,
        onUpdate: (latest) => {
          const cur = Math.round(latest);
          const formatted = hasCommas ? cur.toLocaleString('en-IN') : String(cur);
          setDisplayValue(`${formatted}${suffix}`);
        }
      });
      return () => controls.stop();
    }

    // Default fallback
    setDisplayValue(value);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {displayValue}
    </span>
  );
}

