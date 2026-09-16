'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * ParticleImage — a mystical dust-to-portrait animation.
 * 
 * Tiny luminous motes drift in darkness, then slowly coalesce 
 * into the silhouette of an image. Particles glow, breathe, 
 * and scatter when the cursor passes through them.
 */
export default function ParticleImage({ src, className }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Resize-aware dimensions
  const getDimensions = useCallback(() => {
    const el = containerRef.current;
    if (!el) return { w: 300, h: 400 };
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

    let particles = [];
    let frameId;
    let mouse = { x: -9999, y: -9999, radius: 80 };
    let startTime = 0;
    const GATHER_DURATION = 4000; // ms — how long the initial gathering takes

    // Proxy external images for CORS
    const isExternal = src.startsWith('http');
    const proxiedSrc = isExternal
      ? `/api/proxy-image?url=${encodeURIComponent(src)}`
      : src;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = proxiedSrc;

    img.onload = () => {
      // ── 1. Extract pixel data at canvas size ──
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

      // ── 2. Sparse sampling → luminous particles ──
      // Much sparser than before: every 6th pixel → fewer, 
      // more distinct particles that read as individual motes.
      const step = 6;
      const maxParticles = 6000; // hard cap for performance
      const candidates = [];

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4;
          const a = data[i + 3];
          if (a < 20) continue;

          const r = data[i], g = data[i + 1], b = data[i + 2];
          // Calculate luminance to bias towards brighter areas
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          candidates.push({ x, y, r, g, b, a, lum });
        }
      }

      // If too many, keep a random subset biased towards bright areas
      let selected = candidates;
      if (selected.length > maxParticles) {
        // Sort by luminance descending, keep top portion + random sample of rest
        selected.sort((a, b) => b.lum - a.lum);
        const keep = Math.floor(maxParticles * 0.6);
        const bright = selected.slice(0, keep);
        const rest = selected.slice(keep);
        // Shuffle rest and take what we need
        for (let i = rest.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [rest[i], rest[j]] = [rest[j], rest[i]];
        }
        selected = [...bright, ...rest.slice(0, maxParticles - keep)];
      }

      // Create particles from selected points
      for (const pt of selected) {
        // Random spawn position — scattered far from the image
        const angle = Math.random() * Math.PI * 2;
        const dist = w * 0.6 + Math.random() * w * 0.8;
        const spawnX = w / 2 + Math.cos(angle) * dist;
        const spawnY = h / 2 + Math.sin(angle) * dist;

        // Slight color shift for variety (mystical feel)
        const hueShift = (Math.random() - 0.5) * 15;
        const rr = Math.min(255, Math.max(0, pt.r + hueShift));
        const gg = Math.min(255, Math.max(0, pt.g + hueShift * 0.5));
        const bb = Math.min(255, Math.max(0, pt.b + hueShift));

        particles.push({
          // Current position (starts scattered)
          x: spawnX,
          y: spawnY,
          // Target position in the portrait
          baseX: pt.x,
          baseY: pt.y,
          // Velocity
          vx: 0,
          vy: 0,
          // Visual
          r: rr, g: gg, b: bb,
          baseAlpha: (pt.a / 255) * (0.4 + pt.lum * 0.6),
          alpha: 0, // fades in
          size: 1.2 + Math.random() * 1.5, // tiny circles, not big squares
          glowSize: 3 + Math.random() * 4,
          // Physics
          friction: 0.92 + Math.random() * 0.04,
          ease: 0.015 + Math.random() * 0.025,
          // Animation offsets
          delay: Math.random() * 2000, // stagger the gathering
          breathPhase: Math.random() * Math.PI * 2,
          breathSpeed: 0.001 + Math.random() * 0.002,
          driftX: (Math.random() - 0.5) * 0.3,
          driftY: (Math.random() - 0.5) * 0.3,
        });
      }

      startTime = performance.now();
      setIsLoaded(true);

      // ── 3. Render loop ──
      const animate = (now) => {
        const elapsed = now - startTime;

        // Dark background with slight trail effect (ghostly afterimages)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // ── Gathering progress (0 → 1) with individual delay ──
          const pElapsed = Math.max(0, elapsed - p.delay);
          const progress = Math.min(1, pElapsed / GATHER_DURATION);
          // Smooth ease-out curve
          const eased = 1 - Math.pow(1 - progress, 3);

          // Fade alpha in over time
          p.alpha = p.baseAlpha * Math.min(1, pElapsed / 1500);

          // ── Mouse repulsion ──
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          const mouseR = mouse.radius;

          if (distSq < mouseR * mouseR) {
            const dist = Math.sqrt(distSq);
            const force = (mouseR - dist) / mouseR;
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 6;
            p.vy -= Math.sin(angle) * force * 6;
          }

          // ── Breathing / idle drift (even when settled) ──
          const breathX = Math.sin(now * p.breathSpeed + p.breathPhase) * 0.6;
          const breathY = Math.cos(now * p.breathSpeed * 0.8 + p.breathPhase) * 0.6;

          // ── Spring towards target (strength grows with eased progress) ──
          const targetX = p.baseX + breathX + p.driftX;
          const targetY = p.baseY + breathY + p.driftY;
          p.vx += (targetX - p.x) * p.ease * eased;
          p.vy += (targetY - p.y) * p.ease * eased;

          // Friction
          p.vx *= p.friction;
          p.vy *= p.friction;

          // Update
          p.x += p.vx;
          p.y += p.vy;

          // ── Draw: glowing circle ──
          if (p.alpha < 0.01) continue;

          // Outer glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.glowSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.08})`;
          ctx.fill();

          // Inner bright core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.7})`;
          ctx.fill();

          // Bright white center speck (star-like)
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.3})`;
          ctx.fill();
        }

        frameId = requestAnimationFrame(animate);
      };

      frameId = requestAnimationFrame(animate);
    };

    // ── Event handlers ──
    const container = containerRef.current;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
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
        background: 'black',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
