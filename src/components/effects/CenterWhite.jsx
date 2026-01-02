'use client';

import React, { useId } from 'react';
import { motion } from 'motion/react';

const ExplosionReveal = ({ onComplete }) => {
  const maskId = useId(); 

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-50">
      <svg
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id={maskId}>
            {/* The opaque background */}
            <rect width="100%" height="100%" fill="white" />
            
            {/* The transparent hole (Explosion) */}
            <motion.circle
              cx="50%"
              cy="50%"
              fill="black"
              initial={{ r: 0 }}
              animate={{ r: "150%" }}
              transition={{
                duration: 1.2,
                ease: [0.77, 0, 0.175, 1],
                delay: 0.2
              }}
              onAnimationComplete={onComplete}
            />
          </mask>
        </defs>

        {/* The White Overlay Layer */}
        <rect
          width="100%"
          height="100%"
          fill="white"
          mask={`url(#${maskId})`}
        />
      </svg>
    </div>
  );
};

export default ExplosionReveal;