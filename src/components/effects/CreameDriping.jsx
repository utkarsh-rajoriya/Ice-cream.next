'use client';

import React, { useRef, useEffect } from 'react';

const hexToHSL = (hex) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length === 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  r /= 255; g /= 255; b /= 255;
  const cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
  let h = 0, s = 0, l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
};

const CreameDriping = ({ 
  color = "#EC4899", // Default Pink
  speed = 1.5,       // Flow speed
  onComplete         // Optional callback when animation ends
}) => {
  const canvasRef = useRef(null);
  
  // Convert prop color to HSL once
  const { h, s, l } = hexToHSL(color);

  const stateRef = useRef({
    shapes: [],
    width: 0,
    height: 0,
    ySpeed: 1,
    animationFrameId: null,
    isFinished: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;
    state.isFinished = false; // Reset state on effect run

    // --- Configuration ---
    const LAYER_COUNT = 5; 
    const POINT_COUNT = 15; // Smoothness

    // --- Helper: Create Shape Layers ---
    const createShapes = () => {
      state.shapes = [];
      
      for (let index = 0; index < LAYER_COUNT; index++) {
        const shape = {
          points: [],
          // Opacity: Back layers slightly transparent, Front layer solid (1)
          alpha: index === 0 ? 1 : 1 - (index / (LAYER_COUNT + 2)), 
          // Color: Back layers are darker to create depth
          layerHue: h, 
          layerSat: s,
          layerLight: Math.max(l - (index * 8), 10), // Reduce lightness for back layers
        };

        const segmentWidth = state.width / (POINT_COUNT - 1);

        for (let i = 0; i < POINT_COUNT + 2; i++) {
          // Start Y: Higher up so they drop in from above
          const yStart = -100 + (Math.random() * 150) - (index * 80); 
          const rad = Math.random() * 40;

          shape.points.push({
            x: i * segmentWidth, 
            y: yStart,
            oy: yStart,          
            rad: rad,
            angle: Math.PI * Math.random(),
            speed: ((Math.PI / 180) + ((Math.PI / 180) * Math.random())) * 0.5
          });
        }
        state.shapes.push(shape);
      }
      state.shapes.reverse(); // Draw back layers first
    };

    // --- Draw Function ---
    const draw = () => {
      if (state.isFinished) return;

      // Clear canvas
      ctx.clearRect(0, 0, state.width, state.height);
      
      let shapesFinishedCount = 0;

      state.shapes.forEach((shape) => {
        // 1. Render
        drawDripShape(shape);

        // 2. Physics & Bounds Check
        let minLayerY = Infinity; 

        shape.points.forEach((point) => {
          point.angle += point.speed; 
          // Move point down + wobble
          point.y = point.oy + (Math.sin(point.angle) * point.rad);
          point.oy += state.ySpeed * speed; // Gravity falls forever

          if (point.y < minLayerY) minLayerY = point.y;
        });

        // Check if this specific layer has fully passed the bottom of the screen
        if (minLayerY > state.height) {
            shapesFinishedCount++;
        }
      });

      // Stop Condition: If all layers are past the bottom height
      if (shapesFinishedCount === state.shapes.length) {
        state.isFinished = true;
        cancelAnimationFrame(state.animationFrameId);
        if(onComplete) onComplete();
      } else {
        state.animationFrameId = requestAnimationFrame(draw);
      }
    };

    // --- Render Path ---
    const drawDripShape = (shape) => {
      ctx.fillStyle = `hsla(${shape.layerHue}, ${shape.layerSat}%, ${shape.layerLight}%, ${shape.alpha})`;
      
      ctx.beginPath();
      ctx.moveTo(0, 0); // Top Left
      ctx.lineTo(shape.points[0].x, shape.points[0].y);

      // Curves
      for (let i = 0; i < shape.points.length - 2; i++) {
        const p1 = shape.points[i];
        const p2 = shape.points[i + 1];
        const xc = (p1.x + p2.x) / 2;
        const yc = (p1.y + p2.y) / 2;
        ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
      }

      const last = shape.points[shape.points.length - 2];
      const veryLast = shape.points[shape.points.length - 1];
      ctx.quadraticCurveTo(last.x, last.y, veryLast.x, veryLast.y);

      ctx.lineTo(state.width, 0); // Top Right
      ctx.lineTo(0, 0); // Close Path
      ctx.fill();
    };

    // --- Resize ---
    const handleResize = () => {
      const parent = canvas.parentElement;
      if(parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        state.width = canvas.width;
        state.height = canvas.height;
        state.ySpeed = 1 * (state.height / 300);
        createShapes();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    draw(); 

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(state.animationFrameId);
    };
  }, [color, speed, h, s, l, onComplete]);

  return (
    <canvas 
      ref={canvasRef} 
      className="block w-full h-full pointer-events-none"
    />
  );
};

export default CreameDriping;