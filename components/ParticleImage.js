'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * ParticleImage — The photograph is clearly visible. Its edges dissolve
 * into luminous dust motes that float and drift. Ambient golden particles
 * hang in the air like pollen in sunlight. Mouse scatters nearby dust.
 */
export default function ParticleImage({ src, className }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getDimensions = useCallback(() => {
    const el = containerRef.current;
    if (!el) return { w: 400, h: 530 };
    return { w: el.clientWidth, h: el.clientHeight };
  }, []);

  useEffect(() => {
    if (!src) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { w, h } = getDimensions();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    let edgeParticles = [];
    let ambientParticles = [];
    let frameId;
    let mouse = { x: -9999, y: -9999, radius: 70 };

    const isExternal = src.startsWith('http');
    const proxiedSrc = isExternal
      ? `/api/proxy-image?url=${encodeURIComponent(src)}`
      : src;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = proxiedSrc;

    img.onload = () => {
      // ── Offscreen: draw the image and sample edge pixels ──
      const off = document.createElement('canvas');
      const offCtx = off.getContext('2d', { willReadFrequently: true });
      off.width = w;
      off.height = h;

      // Cover-fit
      const ir = img.width / img.height;
      const cr = w / h;
      let dw = w, dh = h, ox = 0, oy = 0;
      if (ir > cr) { dw = h * ir; ox = (w - dw) / 2; }
      else         { dh = w / ir;  oy = (h - dh) / 2; }
      offCtx.drawImage(img, ox, oy, dw, dh);

      const imageData = offCtx.getImageData(0, 0, w, h);
      const data = imageData.data;

      // ── Create a dissolution mask ──
      // Pixels near edges have higher chance of becoming particles.
      // The mask stores a "dissolution probability" per pixel.
      const edgeThickness = Math.min(w, h) * 0.22; // how deep the dissolution reaches
      
      // Also create the "intact image" — the image with edge pixels erased
      const intactCanvas = document.createElement('canvas');
      const intactCtx = intactCanvas.getContext('2d');
      intactCanvas.width = w;
      intactCanvas.height = h;
      intactCtx.drawImage(off, 0, 0);
      const intactData = intactCtx.getImageData(0, 0, w, h);

      const step = 3; // sample density for edge particles

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          // Distance from nearest edge
          const distFromEdge = Math.min(x, y, w - x, h - y);
          
          if (distFromEdge >= edgeThickness) continue;

          // Dissolution probability: 1.0 at edge → 0.0 at edgeThickness
          const prob = 1.0 - (distFromEdge / edgeThickness);
          // Use a curve so dissolution concentrates at the very edge
          const dissolveFactor = Math.pow(prob, 1.8);
          
          if (Math.random() > dissolveFactor) continue;

          const i = (y * w + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a < 20) continue;

          // Erase this pixel region from the intact image
          for (let dy = 0; dy < step; dy++) {
            for (let dx = 0; dx < step; dx++) {
              const px = x + dx, py = y + dy;
              if (px < w && py < h) {
                const idx = (py * w + px) * 4;
                intactData.data[idx + 3] = 0; // make transparent
              }
            }
          }

          // Determine drift direction (away from center)
          const cx = w / 2, cy = h / 2;
          const angleFromCenter = Math.atan2(y - cy, x - cx);
          const driftDist = 10 + Math.random() * 40;

          // Warm up the color slightly for the glow
          const warmR = Math.min(255, r + 20);
          const warmG = Math.min(255, g + 10);
          const warmB = b;

          edgeParticles.push({
            x: x + (Math.random() - 0.5) * step,
            y: y + (Math.random() - 0.5) * step,
            baseX: x + Math.cos(angleFromCenter) * driftDist * (0.5 + Math.random()),
            baseY: y + Math.sin(angleFromCenter) * driftDist * (0.5 + Math.random()),
            vx: 0,
            vy: 0,
            r: warmR, g: warmG, b: warmB,
            alpha: (a / 255) * (0.5 + Math.random() * 0.5),
            size: 0.8 + Math.random() * 1.5,
            glowSize: 2.5 + Math.random() * 3.5,
            friction: 0.93 + Math.random() * 0.04,
            ease: 0.008 + Math.random() * 0.015,
            breathPhase: Math.random() * Math.PI * 2,
            breathSpeed: 0.0008 + Math.random() * 0.0015,
            breathAmp: 1.5 + Math.random() * 3,
          });
        }
      }

      // Write the erased image back
      intactCtx.putImageData(intactData, 0, 0);

      // ── Ambient floating dust ──
      // Sparse golden/warm motes that float across the whole image
      const ambientCount = 80 + Math.floor(Math.random() * 40);
      for (let i = 0; i < ambientCount; i++) {
        const px = Math.random() * w;
        const py = Math.random() * h;
        
        // Sample color from image at this position, warm it up
        const si = (Math.floor(py) * w + Math.floor(px)) * 4;
        const sr = data[si] || 200;
        const sg = data[si + 1] || 180;
        const sb = data[si + 2] || 140;
        
        // Shift towards warm golden
        const ar = Math.min(255, sr * 0.6 + 200 * 0.4);
        const ag = Math.min(255, sg * 0.5 + 180 * 0.5);
        const ab = Math.min(255, sb * 0.3 + 100 * 0.7);

        ambientParticles.push({
          x: px,
          y: py,
          baseX: px,
          baseY: py,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.1 - Math.random() * 0.3, // gentle upward drift
          r: ar, g: ag, b: ab,
          alpha: 0.15 + Math.random() * 0.35,
          size: 0.6 + Math.random() * 1.8,
          glowSize: 3 + Math.random() * 5,
          breathPhase: Math.random() * Math.PI * 2,
          breathSpeed: 0.0005 + Math.random() * 0.001,
          breathAmp: 2 + Math.random() * 5,
          driftSpeed: 0.1 + Math.random() * 0.3,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.002 + Math.random() * 0.004,
        });
      }

      setIsLoaded(true);

      // ── Render loop ──
      const animate = (now) => {
        ctx.clearRect(0, 0, w, h);

        // 1. Draw the intact image (center preserved, edges erased)
        ctx.drawImage(intactCanvas, 0, 0);

        // 2. Draw edge dissolution particles
        for (const p of edgeParticles) {
          // Mouse repulsion
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouse.radius * mouse.radius) {
            const dist = Math.sqrt(distSq);
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 4;
            p.vy -= Math.sin(angle) * force * 4;
          }

          // Breathing drift
          const bx = Math.sin(now * p.breathSpeed + p.breathPhase) * p.breathAmp;
          const by = Math.cos(now * p.breathSpeed * 0.7 + p.breathPhase) * p.breathAmp * 0.6;

          // Spring towards base + breath
          p.vx += (p.baseX + bx - p.x) * p.ease;
          p.vy += (p.baseY + by - p.y) * p.ease;
          p.vx *= p.friction;
          p.vy *= p.friction;
          p.x += p.vx;
          p.y += p.vy;

          if (p.alpha < 0.01) continue;

          // Outer glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.glowSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.12})`;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.8})`;
          ctx.fill();

          // Bright center
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 240, ${p.alpha * 0.4})`;
          ctx.fill();
        }

        // 3. Draw ambient floating dust
        for (const p of ambientParticles) {
          // Mouse repulsion (gentler)
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouse.radius * mouse.radius) {
            const dist = Math.sqrt(distSq);
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * force * 2;
            p.y -= Math.sin(angle) * force * 2;
          }

          // Float
          p.x += Math.sin(now * p.breathSpeed + p.breathPhase) * p.driftSpeed * 0.3;
          p.y += p.vy * 0.15;

          // Wrap around
          if (p.y < -10) p.y = h + 10;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;

          // Twinkle
          const twinkle = 0.5 + 0.5 * Math.sin(now * p.twinkleSpeed + p.twinklePhase);
          const a = p.alpha * twinkle;

          if (a < 0.02) continue;

          // Glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.glowSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${a * 0.1})`;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${a * 0.7})`;
          ctx.fill();

          // Bright speck
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 230, ${a * 0.5})`;
          ctx.fill();
        }

        frameId = requestAnimationFrame(animate);
      };

      frameId = requestAnimationFrame(animate);
    };

    // ── Events ──
    const container = containerRef.current;
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    if (container) {
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeave);
      container.addEventListener('touchmove', onTouchMove);
      container.addEventListener('touchend', onMouseLeave);
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (container) {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeave);
        container.removeEventListener('touchmove', onTouchMove);
        container.removeEventListener('touchend', onMouseLeave);
      }
    };
  }, [src, getDimensions]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'crosshair',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1.5s ease',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
