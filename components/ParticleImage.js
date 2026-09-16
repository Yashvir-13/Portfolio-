'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ParticleImage — Mystical materialization effect.
 *
 * Phase 1 (0–5s): Luminous dust scattered everywhere slowly converges
 *   toward the image shape. The crisp photograph crossfades in underneath
 *   so it looks like particles are assembling into a sharp picture.
 * Phase 2 (5s+): Image fully visible, edges dissolved into floating
 *   particles that drift outward beyond the frame. Ambient golden motes
 *   hang in the air. Mouse scatters nearby particles.
 *
 * The canvas is oversized so edge particles can float outside the image
 * boundary into the surrounding page.
 */
export default function ParticleImage({ src, className }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');

    const imgW = container.clientWidth;
    const imgH = container.clientHeight;

    // Canvas extends beyond the image area so edge particles can float outside
    const pad = 80;
    const cW = imgW + pad * 2;
    const cH = imgH + pad * 2;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cW * dpr;
    canvas.height = cH * dpr;
    ctx.scale(dpr, dpr);

    // Particles live in canvas-space where (pad, pad) is the image origin.
    let convergeParticles = []; // assemble the image, then fade out
    let edgeParticles = [];     // persistent edge dissolution
    let ambientParticles = [];  // floating golden dust
    let frameId;
    let mouse = { x: -9999, y: -9999, radius: 80 };
    let startTime = 0;

    const BUILD_DURATION = 5000;  // ms — image materializes over this period
    const FADE_OVERLAP   = 2500;  // ms — particles start fading before image is fully in

    // Proxy external images for CORS
    const isExternal = src.startsWith('http');
    const proxiedSrc = isExternal
      ? `/api/proxy-image?url=${encodeURIComponent(src)}`
      : src;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = proxiedSrc;

    img.onload = () => {
      // ── Offscreen: draw image and sample pixels ──
      const off = document.createElement('canvas');
      const offCtx = off.getContext('2d', { willReadFrequently: true });
      off.width = imgW;
      off.height = imgH;

      // Cover-fit
      const ir = img.width / img.height;
      const cr = imgW / imgH;
      let dw = imgW, dh = imgH, ox = 0, oy = 0;
      if (ir > cr) { dw = imgH * ir; ox = (imgW - dw) / 2; }
      else         { dh = imgW / ir;  oy = (imgH - dh) / 2; }
      offCtx.drawImage(img, ox, oy, dw, dh);

      const imageData = offCtx.getImageData(0, 0, imgW, imgH);
      const data = imageData.data;

      // ── Convergence particles ──
      // These sample the image sparsely. They start scattered and converge
      // toward their pixel positions over BUILD_DURATION.
      // They fade out as the crisp image crossfades in underneath.
      const convStep = 5;
      const maxConv = 5000;
      const convCandidates = [];

      for (let y = 0; y < imgH; y += convStep) {
        for (let x = 0; x < imgW; x += convStep) {
          const i = (y * imgW + x) * 4;
          if (data[i + 3] < 20) continue;
          const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          convCandidates.push({ x, y, r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3], lum });
        }
      }

      // Keep a manageable subset
      let selected = convCandidates;
      if (selected.length > maxConv) {
        for (let i = selected.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [selected[i], selected[j]] = [selected[j], selected[i]];
        }
        selected = selected.slice(0, maxConv);
      }

      for (const pt of selected) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.max(imgW, imgH) * (0.5 + Math.random() * 1.2);
        convergeParticles.push({
          // Scattered spawn (canvas-space)
          x: pad + imgW / 2 + Math.cos(angle) * dist,
          y: pad + imgH / 2 + Math.sin(angle) * dist,
          // Target (canvas-space)
          targetX: pad + pt.x,
          targetY: pad + pt.y,
          vx: 0, vy: 0,
          r: pt.r, g: pt.g, b: pt.b,
          alpha: (pt.a / 255) * (0.3 + pt.lum * 0.5),
          size: 1 + Math.random() * 1.2,
          glowSize: 2.5 + Math.random() * 3,
          friction: 0.92 + Math.random() * 0.04,
          ease: 0.006 + Math.random() * 0.012,
          delay: Math.random() * 1500,
          breathPhase: Math.random() * Math.PI * 2,
          breathSpeed: 0.001 + Math.random() * 0.002,
        });
      }

      // ── Edge dissolution particles ──
      // Sampled from the edges. They drift outward and persist.
      const edgeThickness = Math.min(imgW, imgH) * 0.18;
      const edgeStep = 3;

      // Build the "intact" image — edges will be erased
      const intactCanvas = document.createElement('canvas');
      const intactCtx = intactCanvas.getContext('2d');
      intactCanvas.width = imgW;
      intactCanvas.height = imgH;
      intactCtx.drawImage(off, 0, 0);
      const intactData = intactCtx.getImageData(0, 0, imgW, imgH);

      for (let y = 0; y < imgH; y += edgeStep) {
        for (let x = 0; x < imgW; x += edgeStep) {
          const distFromEdge = Math.min(x, y, imgW - x, imgH - y);
          if (distFromEdge >= edgeThickness) continue;

          const prob = 1.0 - (distFromEdge / edgeThickness);
          if (Math.random() > Math.pow(prob, 2.0)) continue;

          const i = (y * imgW + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a < 20) continue;

          // Erase from intact image
          for (let dy = 0; dy < edgeStep; dy++) {
            for (let dx = 0; dx < edgeStep; dx++) {
              const px = x + dx, py = y + dy;
              if (px < imgW && py < imgH) {
                intactData.data[(py * imgW + px) * 4 + 3] = 0;
              }
            }
          }

          // Drift direction: outward from image center
          const cx = imgW / 2, cy = imgH / 2;
          const angleOut = Math.atan2(y - cy, x - cx);
          const driftDist = 15 + Math.random() * 60;

          edgeParticles.push({
            x: pad + x,
            y: pad + y,
            baseX: pad + x + Math.cos(angleOut) * driftDist,
            baseY: pad + y + Math.sin(angleOut) * driftDist,
            vx: 0, vy: 0,
            r: Math.min(255, r + 15), g: Math.min(255, g + 8), b,
            alpha: (a / 255) * (0.4 + Math.random() * 0.5),
            size: 0.8 + Math.random() * 1.4,
            glowSize: 2.5 + Math.random() * 4,
            friction: 0.93 + Math.random() * 0.04,
            ease: 0.006 + Math.random() * 0.012,
            breathPhase: Math.random() * Math.PI * 2,
            breathSpeed: 0.0007 + Math.random() * 0.0015,
            breathAmp: 2 + Math.random() * 4,
          });
        }
      }

      intactCtx.putImageData(intactData, 0, 0);

      // ── Ambient floating dust ──
      const ambientCount = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < ambientCount; i++) {
        // Spawn across the full canvas (including overflow area)
        const px = Math.random() * cW;
        const py = Math.random() * cH;

        // Sample image color if inside image area, else warm gold
        let ar = 220, ag = 195, ab = 140;
        const ix = Math.floor(px - pad), iy = Math.floor(py - pad);
        if (ix >= 0 && ix < imgW && iy >= 0 && iy < imgH) {
          const si = (iy * imgW + ix) * 4;
          ar = Math.min(255, data[si] * 0.5 + 210 * 0.5);
          ag = Math.min(255, data[si + 1] * 0.4 + 190 * 0.6);
          ab = Math.min(255, data[si + 2] * 0.3 + 120 * 0.7);
        }

        ambientParticles.push({
          x: px, y: py,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -0.05 - Math.random() * 0.2,
          r: ar, g: ag, b: ab,
          alpha: 0.12 + Math.random() * 0.3,
          size: 0.5 + Math.random() * 1.6,
          glowSize: 3 + Math.random() * 5,
          breathPhase: Math.random() * Math.PI * 2,
          breathSpeed: 0.0004 + Math.random() * 0.001,
          driftAmp: 1 + Math.random() * 3,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.002 + Math.random() * 0.003,
        });
      }

      startTime = performance.now();
      setIsLoaded(true);

      // ── Render loop ──
      const animate = (now) => {
        const elapsed = now - startTime;
        ctx.clearRect(0, 0, cW, cH);

        // ── Image crossfade ──
        // Image starts invisible, builds to full over BUILD_DURATION
        const imgProgress = Math.min(1, elapsed / BUILD_DURATION);
        // Smooth ease-in-out: slow start, accelerate, then ease
        const imgAlpha = imgProgress < 0.3
          ? Math.pow(imgProgress / 0.3, 2) * 0.15          // barely visible hint
          : 0.15 + 0.85 * Math.pow((imgProgress - 0.3) / 0.7, 1.5); // ramps up

        ctx.globalAlpha = imgAlpha;
        ctx.drawImage(intactCanvas, pad, pad);
        ctx.globalAlpha = 1;

        // ── Convergence particles ──
        // Visible during build phase, fade out once image is nearly in
        const convFadeStart = BUILD_DURATION - FADE_OVERLAP;
        for (const p of convergeParticles) {
          const pElapsed = Math.max(0, elapsed - p.delay);
          const arrivalProgress = Math.min(1, pElapsed / (BUILD_DURATION * 0.8));
          const eased = 1 - Math.pow(1 - arrivalProgress, 2.5);

          // Fade out convergence particles after image solidifies
          let fadeAlpha = 1;
          if (elapsed > convFadeStart) {
            fadeAlpha = Math.max(0, 1 - (elapsed - convFadeStart) / FADE_OVERLAP);
          }
          if (fadeAlpha < 0.01) continue;

          // Breathing
          const bx = Math.sin(now * p.breathSpeed + p.breathPhase) * 1.5;
          const by = Math.cos(now * p.breathSpeed * 0.8 + p.breathPhase) * 1.5;

          // Spring toward target
          const tx = p.targetX + bx;
          const ty = p.targetY + by;
          p.vx += (tx - p.x) * p.ease * eased;
          p.vy += (ty - p.y) * p.ease * eased;

          // Mouse repulsion
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < mouse.radius * mouse.radius) {
            const d = Math.sqrt(dSq);
            const f = (mouse.radius - d) / mouse.radius;
            const a = Math.atan2(dy, dx);
            p.vx -= Math.cos(a) * f * 5;
            p.vy -= Math.sin(a) * f * 5;
          }

          p.vx *= p.friction;
          p.vy *= p.friction;
          p.x += p.vx;
          p.y += p.vy;

          const a = p.alpha * fadeAlpha;

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
          ctx.fillStyle = `rgba(255, 255, 245, ${a * 0.35})`;
          ctx.fill();
        }

        // ── Edge dissolution particles ──
        for (const p of edgeParticles) {
          // Don't show until image is partly visible
          const edgeAlpha = Math.min(1, Math.max(0, (imgProgress - 0.4) / 0.6));
          if (edgeAlpha < 0.01) continue;

          const bx = Math.sin(now * p.breathSpeed + p.breathPhase) * p.breathAmp;
          const by = Math.cos(now * p.breathSpeed * 0.7 + p.breathPhase) * p.breathAmp * 0.7;

          p.vx += (p.baseX + bx - p.x) * p.ease;
          p.vy += (p.baseY + by - p.y) * p.ease;

          // Mouse repulsion
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < mouse.radius * mouse.radius) {
            const d = Math.sqrt(dSq);
            const f = (mouse.radius - d) / mouse.radius;
            const ang = Math.atan2(dy, dx);
            p.vx -= Math.cos(ang) * f * 5;
            p.vy -= Math.sin(ang) * f * 5;
          }

          p.vx *= p.friction;
          p.vy *= p.friction;
          p.x += p.vx;
          p.y += p.vy;

          const a = p.alpha * edgeAlpha;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.glowSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${a * 0.12})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${a * 0.75})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 240, ${a * 0.35})`;
          ctx.fill();
        }

        // ── Ambient floating dust ──
        for (const p of ambientParticles) {
          p.x += Math.sin(now * p.breathSpeed + p.breathPhase) * p.driftAmp * 0.02;
          p.y += p.vy * 0.15;

          if (p.y < -15) p.y = cH + 15;
          if (p.x < -15) p.x = cW + 15;
          if (p.x > cW + 15) p.x = -15;

          // Mouse repulsion (gentle)
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < mouse.radius * mouse.radius) {
            const d = Math.sqrt(dSq);
            const f = (mouse.radius - d) / mouse.radius;
            const ang = Math.atan2(dy, dx);
            p.x -= Math.cos(ang) * f * 2.5;
            p.y -= Math.sin(ang) * f * 2.5;
          }

          const twinkle = 0.4 + 0.6 * Math.sin(now * p.twinkleSpeed + p.twinklePhase);
          const a = p.alpha * twinkle;
          if (a < 0.02) continue;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.glowSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${a * 0.1})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${a * 0.6})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 230, ${a * 0.4})`;
          ctx.fill();
        }

        frameId = requestAnimationFrame(animate);
      };

      frameId = requestAnimationFrame(animate);
    };

    // ── Events (mouse coords → canvas-space) ──
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * (cW / rect.width);
      mouse.y = (e.clientY - rect.top) * (cH / rect.height);
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = (e.touches[0].clientX - rect.left) * (cW / rect.width);
        mouse.y = (e.touches[0].clientY - rect.top) * (cH / rect.height);
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
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'visible',     // particles float outside
        transform: 'none',       // override the .portrait rotate
        cursor: 'crosshair',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          position: 'absolute',
          top: '-80px',
          left: '-80px',
          pointerEvents: 'none',
        }}
      />
      {/* Invisible sizer — keeps the container at the right aspect ratio */}
      <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />
    </div>
  );
}
