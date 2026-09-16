'use client';

import { useEffect, useRef, useState } from 'react';

export default function ParticleImage({ src, width = 300, height = 400, className }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Scale canvas for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let particles = [];
    let animationFrameId;
    let mouse = { x: -1000, y: -1000, radius: 60 };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      // 1. Draw image to offscreen canvas to extract pixel data
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      
      // Calculate aspect ratio to fit image nicely
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      }

      offscreen.width = width;
      offscreen.height = height;
      offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // 2. Sample pixels to create particles
      // Step determines density (higher = fewer particles = better performance)
      const step = 4;
      
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const i = (y * width + x) * 4;
          const alpha = data[i + 3];
          
          // Only create particles for non-transparent pixels
          if (alpha > 10) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const color = `rgba(${r}, ${g}, ${b}, ${alpha / 255})`;
            
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              baseX: x,
              baseY: y,
              color: color,
              size: step * 0.8,
              vx: (Math.random() - 0.5) * 10,
              vy: (Math.random() - 0.5) * 10,
              friction: Math.random() * 0.04 + 0.88,
              ease: Math.random() * 0.05 + 0.02
            });
          }
        }
      }
      
      setIsLoaded(true);

      // 3. Animation Loop
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          
          // Mouse interaction (repulsion)
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            
            // Push away from mouse
            p.vx -= Math.cos(angle) * force * 5;
            p.vy -= Math.sin(angle) * force * 5;
          }
          
          // Spring force towards base position
          p.vx += (p.baseX - p.x) * p.ease;
          p.vy += (p.baseY - p.y) * p.ease;
          
          // Apply friction
          p.vx *= p.friction;
          p.vy *= p.friction;
          
          // Update position
          p.x += p.vx;
          p.y += p.vy;
          
          // Draw
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
        
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animate();
    };

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('mousemove', handleMouseMove);
      currentContainer.addEventListener('mouseleave', handleMouseLeave);
      // Support touch as well
      currentContainer.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          const rect = currentContainer.getBoundingClientRect();
          mouse.x = e.touches[0].clientX - rect.left;
          mouse.y = e.touches[0].clientY - rect.top;
        }
      });
      currentContainer.addEventListener('touchend', handleMouseLeave);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
        currentContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [src, width, height]);

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        cursor: 'crosshair',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 2s ease'
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}
