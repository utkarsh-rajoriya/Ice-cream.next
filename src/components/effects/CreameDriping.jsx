'use client';

import React, { useRef, useEffect, useState } from 'react';

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
  color = "#EC4899", 
  speed = 1.5,       
  onComplete        
}) => {
  const canvasRef = useRef(null);
  
  const [staticBgColor, setStaticBgColor] = useState('transparent');
  
  // FIX: Initialize with 'transparent' instead of 'color'.
  // This ensures that on the very first load, we drip over a transparent background 
  // (revealing the Hero's pink BG), making the drip visible.
  const prevColorRef = useRef('transparent');

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
    setStaticBgColor(prevColorRef.current);
    prevColorRef.current = color;
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;
    state.isFinished = false; 

    const LAYER_COUNT = 5; 
    const POINT_COUNT = 15;

    const createShapes = () => {
      state.shapes = [];
      
      for (let index = 0; index < LAYER_COUNT; index++) {
        const shape = {
          points: [],
          alpha: index === 0 ? 1 : 1 - (index / (LAYER_COUNT + 2)), 
          layerHue: h, 
          layerSat: s,
          layerLight: Math.max(l - (index * 8), 10), 
        };

        const segmentWidth = state.width / (POINT_COUNT - 1);

        for (let i = 0; i < POINT_COUNT + 2; i++) {
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
      state.shapes.reverse(); 
    };

    const draw = () => {
      if (state.isFinished) return;

      ctx.clearRect(0, 0, state.width, state.height);
      
      let shapesFinishedCount = 0;

      state.shapes.forEach((shape) => {
        drawDripShape(shape);

        let minLayerY = Infinity; 

        shape.points.forEach((point) => {
          point.angle += point.speed; 
          point.y = point.oy + (Math.sin(point.angle) * point.rad);
          point.oy += state.ySpeed * speed;

          if (point.y < minLayerY) minLayerY = point.y;
        });

        if (minLayerY > state.height) {
            shapesFinishedCount++;
        }
      });

      if (shapesFinishedCount === state.shapes.length) {
        state.isFinished = true;
        cancelAnimationFrame(state.animationFrameId);
        if(onComplete) onComplete();
      } else {
        state.animationFrameId = requestAnimationFrame(draw);
      }
    };

    const drawDripShape = (shape) => {
      ctx.fillStyle = `hsla(${shape.layerHue}, ${shape.layerSat}%, ${shape.layerLight}%, ${shape.alpha})`;
      
      ctx.beginPath();
      ctx.moveTo(0, 0); 
      ctx.lineTo(shape.points[0].x, shape.points[0].y);

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

      ctx.lineTo(state.width, 0); 
      ctx.lineTo(0, 0); 
      ctx.fill();
    };

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
    <div 
      style={{ backgroundColor: staticBgColor }} 
      className="relative w-full h-full transition-colors duration-0"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default CreameDriping;