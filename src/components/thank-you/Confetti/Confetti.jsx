/**
 * Confetti Component
 * Displays celebration confetti animation on thank you page
 * Uses canvas-confetti library for the animation
 */

import { useEffect, useCallback } from 'react';
import { Box } from '@mui/material';

const Confetti = ({
  duration = 3000,
  particleCount = 100,
  spread = 70,
  colors = ['#8B9A46', '#c9a227', '#1a1a2e', '#ffffff'],
  enabled = true,
}) => {
  const fireConfetti = useCallback(async () => {
    if (!enabled) return;

    try {
      const confetti = (await import('canvas-confetti')).default;

      const end = Date.now() + duration;

      // Fire confetti from both sides
      const frame = () => {
        confetti({
          particleCount: Math.floor(particleCount / 10),
          angle: 60,
          spread,
          origin: { x: 0, y: 0.6 },
          colors,
          zIndex: 9999,
        });

        confetti({
          particleCount: Math.floor(particleCount / 10),
          angle: 120,
          spread,
          origin: { x: 1, y: 0.6 },
          colors,
          zIndex: 9999,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      // Initial burst from center
      confetti({
        particleCount,
        spread: spread + 30,
        origin: { x: 0.5, y: 0.5 },
        colors,
        zIndex: 9999,
      });

      // Start continuous animation from sides
      frame();
    } catch (error) {
      console.error('Failed to load confetti:', error);
    }
  }, [duration, particleCount, spread, colors, enabled]);

  useEffect(() => {
    // Small delay to ensure page has rendered
    const timer = setTimeout(fireConfetti, 300);

    return () => clearTimeout(timer);
  }, [fireConfetti]);

  // This component doesn't render anything visible
  // The confetti is rendered on a canvas overlay by the library
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  );
};

export default Confetti;
