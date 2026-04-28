'use client'

import { useEffect, useRef, useState } from 'react'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHoveringCTA, setIsHoveringCTA] = useState(false)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const cursorPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const glitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const glitchBarsRef = useRef<HTMLDivElement>(null)

  // Staggered entrance animation
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const items = el.querySelectorAll('.anim-hidden')
    setTimeout(() => {
      items.forEach((item, i) => {
        setTimeout(() => item.classList.add('anim-visible'), i * 150)
      })
    }, 200)
  }, [])

  // Smooth magnetic cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animate = () => {
      cursorPosRef.current.x = lerp(cursorPosRef.current.x, mousePosRef.current.x, 0.1)
      cursorPosRef.current.y = lerp(cursorPosRef.current.y, mousePosRef.current.y, 0.1)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPosRef.current.x - 20}px, ${cursorPosRef.current.y - 20}px)`
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${mousePosRef.current.x - 3}px, ${mousePosRef.current.y - 3}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Random glitch bar bursts
  useEffect(() => {
    const spawnGlitchBars = () => {
      const container = glitchBarsRef.current
      if (!container) return
      const count = Math.floor(Math.random() * 4) + 2
      for (let i = 0; i < count; i++) {
        const bar = document.createElement('div')
        const top = Math.random() * 100
        const height = Math.random() * 3 + 1
        const duration = Math.random() * 80 + 40
        const colors = [
          'rgba(0,255,255,0.08)', 'rgba(255,0,68,0.07)',
          'rgba(201,169,110,0.09)', 'rgba(0,255,255,0.05)',
        ]
        bar.style.cssText = `position:absolute;left:0;right:0;top:${top}%;height:${height}px;background:${colors[Math.floor(Math.random() * colors.length)]};pointer-events:none;`
        container.appendChild(bar)
        setTimeout(() => bar.remove(), duration)
      }
      glitchTimerRef.current = setTimeout(spawnGlitchBars, Math.random() * 3000 + 1000)
    }
    const t = setTimeout(spawnGlitchBars, 2000)
    return () => {
      clearTimeout(t)
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current)
    }
  }, [])

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
          width: isHoveringCTA ? '56px' : '40px',
          height: isHoveringCTA ? '56px' : '40px',
          borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.6)',
          background: isHoveringCTA ? 'rgba(201,169,110,0.08)' : 'transparent',
          transition: 'width 0.3s, height 0.3s, background 0.3s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
          width: '6px', height: '6px', borderRadius: '50%', background: '#c9a96e',
        }}
      />

      <style>{`
        @keyframes float-slow {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.04); }
        }
        @keyframes float-mid {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
        }
        @keyframes float-dot {
          0%,100% { transform: translateY(0) scale(1); }
          33% { transform: translateY(-14px) scale(0.9); }
          66% { transform: translateY(9px) scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-rev {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.92); opacity: 0.9; }
          70% { transform: scale(1.18); opacity: 0; }
          100% { transform: scale(0.92); opacity: 0; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-bob {
          0%,100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(8px); opacity: 0.2; }
        }
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        @keyframes noise-shift {
          0%,100% { transform: translate(0,0); }
          10% { transform: translate(-2px,2px); }
          20% { transform: translate(2px,-1px); }
          30% { transform: translate(-1px,3px); }
          40% { transform: translate(3px,-2px); }
          50% { transform: translate(-3px,1px); }
          60% { transform: translate(1px,-3px); }
          70% { transform: translate(-2px,2px); }
          80% { transform: translate(2px,1px); }
          90% { transform: translate(-1px,-2px); }
        }
        @keyframes digital-flicker {
          0%,100% { opacity:1; }
          92% { opacity:1; }
          93% { opacity:0.4; }
          94% { opacity:1; }
          96% { opacity:0.6; }
          97% { opacity:1; }
          98% { opacity:0.2; }
          99% { opacity:1; }
        }
        @keyframes blink-cursor {
          0%,100% { opacity:1; }
          50% { opacity:0; }
        }
        @keyframes rgb-shift {
          0%,100% { text-shadow:none; }
          25% { text-shadow:-3px 0 #00ffff44, 3px 0 #ff004488; }
          50% { text-shadow:2px 0 #00ffff33,-2px 0 #ff004433; }
          75% { text-shadow:-2px 1px #00ffff55, 2px -1px #ff004455; }
        }
        @keyframes glitch-clip-1 {
          0%,100% { clip-path:inset(0 0 100% 0); transform:translateX(0); opacity:0; }
          10% { clip-path:inset(8% 0 85% 0); transform:translateX(-6px); opacity:0.7; }
          25% { clip-path:inset(40% 0 50% 0); transform:translateX(6px); opacity:0.5; }
          45% { clip-path:inset(70% 0 20% 0); transform:translateX(-4px); opacity:0.6; }
          65% { clip-path:inset(20% 0 70% 0); transform:translateX(5px); opacity:0.4; }
          85% { clip-path:inset(55% 0 35% 0); transform:translateX(-5px); opacity:0.7; }
        }
        @keyframes glitch-clip-2 {
          0%,100% { clip-path:inset(0 0 100% 0); transform:translateX(0); opacity:0; }
          15% { clip-path:inset(25% 0 65% 0); transform:translateX(10px); opacity:0.5; }
          35% { clip-path:inset(60% 0 30% 0); transform:translateX(-7px); opacity:0.6; }
          55% { clip-path:inset(10% 0 80% 0); transform:translateX(9px); opacity:0.4; }
          75% { clip-path:inset(45% 0 45% 0); transform:translateX(-8px); opacity:0.55; }
        }
        @keyframes data-stream {
          0% { transform:translateY(-100%); opacity:0; }
          5% { opacity:0.6; }
          95% { opacity:0.6; }
          100% { transform:translateY(100%); opacity:0; }
        }
        @keyframes holo-border {
          0%,100% { border-color:rgba(201,169,110,0.12); box-shadow:0 0 0 rgba(201,169,110,0); }
          50% { border-color:rgba(201,169,110,0.38); box-shadow:0 0 18px rgba(201,169,110,0.08), inset 0 0 18px rgba(201,169,110,0.03); }
        }
        @keyframes scanline-sweep {
          0% { transform:translateY(-5px); opacity:0; }
          5% { opacity:1; }
          95% { opacity:1; }
          100% { transform:translateY(100vh); opacity:0; }
        }
        @keyframes glitch-badge {
          0%,100% { transform:translateX(0); filter:none; }
          20% { transform:translateX(-2px); filter:hue-rotate(90deg); }
          40% { transform:translateX(2px); filter:hue-rotate(-90deg); }
          60% { transform:translateX(-1px); filter:none; }
        }
        .anim-hidden { opacity: 0; transform: translateY(28px); }
        .anim-visible {
          opacity: 1; transform: translateY(0);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-glitch-wrap { position:relative; display:inline-block; }
        .hero-glitch-cyan {
          position:absolute; inset:0; pointer-events:none;
          color:#00ffff; animation:glitch-clip-1 4s steps(1) infinite;
        }
        .hero-glitch-red {
          position:absolute; inset:0; pointer-events:none;
          color:#ff0044; animation:glitch-clip-2 4s steps(1) infinite 0.15s;
        }
        .btn-gold {
          transition: opacity 0.2s, transform 0.25s, box-shadow 0.25s;
          position:relative; overflow:hidden;
        }
        .btn-gold::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,transparent 30%,rgba(255,255,255,0.15) 50%,transparent 70%);
          transform:translateX(-100%); transition:transform 0.4s;
        }
        .btn-gold:hover::before { transform:translateX(100%); }
        .btn-gold:hover { opacity:0.9; transform:translateY(-2px); box-shadow:0 0 60px rgba(201,169,110,0.45),0 0 120px rgba(201,169,110,0.2) !important; }
        .btn-ghost {
          transition:all 0.2s; position:relative; overflow:hidden;
        }
        .btn-ghost::after {
          content:''; position:absolute; inset:0;
          background:rgba(201,169,110,0.04);
          transform:scaleX(0); transform-origin:left; transition:transform 0.3s;
        }
        .btn-ghost:hover::after { transform:scaleX(1); }
        .btn-ghost:hover { border-color:rgba(201,169,110,0.5) !important; color:#f0ece4 !important; transform:translateY(-2px); }
        .stat-card {
          transition:all 0.3s cubic-bezier(0.16,1,0.3,1);
          animation:holo-border 3s ease-in-out infinite;
          position:relative; overflow:hidden;
        }
        .stat-card::before {
          content:''; position:absolute; top:-50%; left:-50%;
          width:200%; height:200%;
          background:conic-gradient(transparent,rgba(201,169,110,0.04),transparent 30%);
          animation:spin-slow 6s linear infinite;
        }
        .stat-card:hover {
          border-color:rgba(201,169,110,0.5) !important;
          transform:translateY(-6px) scale(1.04);
          box-shadow:0 0 30px rgba(201,169,110,0.15);
          animation:none;
        }
        .stat-card:hover::before { display:none; }
        .social-link:hover { border-color:rgba(201,169,110,0.5) !important; color:#c9a96e !important; transform:scale(1.1); }
        .social-link { transition:all 0.2s; }
        .line-draw {
          stroke-dasharray:800; stroke-dashoffset:800;
          animation:draw-line 1.8s cubic-bezier(0.16,1,0.3,1) forwards 1s;
        }
        .cursor-blink { animation:blink-cursor 1s step-end infinite; }
        .digital-flicker { animation:digital-flicker 5s ease-in-out infinite; }
      `}</style>

      <section
        id="about"
        ref={heroRef}
        style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: '0 2.5rem 5rem',
          position: 'relative', overflow: 'hidden',
          background: '#080807', cursor: 'none',
        }}
      >
        {/* Scanline sweep */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.4),transparent)',
            animation: 'scanline-sweep 6s linear infinite',
          }} />
        </div>

        {/* Static scanlines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)',
        }} />

        {/* BG grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `linear-gradient(rgba(201,169,110,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.028) 1px,transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        {/* Grain with motion */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.5,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          animation: 'noise-shift 0.15s steps(1) infinite',
        }} />

        {/* Ambient glows */}
        <div style={{
          position: 'absolute', top: '-15%', right: '-8%',
          width: '750px', height: '750px', borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle at 55% 45%,rgba(201,169,110,0.09) 0%,transparent 62%)',
          animation: 'float-slow 14s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-25%', left: '-12%',
          width: '650px', height: '650px', borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle,rgba(0,255,255,0.04) 0%,transparent 65%)',
          animation: 'float-slow 18s ease-in-out infinite reverse',
        }} />
        {/* Cyan aberration glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '-5%',
          width: '400px', height: '400px', borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle,rgba(0,255,255,0.03) 0%,transparent 70%)',
          animation: 'float-mid 11s ease-in-out infinite',
        }} />

        {/* Data stream columns */}
        {[
          { l: '3%', d: '0s', dur: '9s' }, { l: '6%', d: '3s', dur: '12s', o: '0.08' },
          { r: '3%', d: '1.5s', dur: '10s' }, { r: '7%', d: '5s', dur: '14s', o: '0.08' },
        ].map((col, i) => (
          <div key={i} style={{
            position: 'absolute', top: 0,
            left: 'l' in col ? col.l as string : undefined,
            right: 'r' in col ? col.r as string : undefined,
            fontFamily: 'monospace', fontSize: '10px',
            color: `rgba(201,169,110,${col.o ?? '0.15'})`,
            writingMode: 'vertical-lr',
            animation: `data-stream ${col.dur} linear infinite`,
            animationDelay: col.d,
            pointerEvents: 'none', zIndex: 0, userSelect: 'none', letterSpacing: '4px',
          }}>
            {i % 2 === 0 ? '10110010001011010110001010011010' : '01001101010011100110101'}
          </div>
        ))}

        {/* Floating orb cluster */}
        <div style={{
          position: 'absolute', top: '18%', right: '10%',
          width: '200px', height: '200px', borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          border: '1px solid rgba(201,169,110,0.07)',
          background: 'radial-gradient(circle at 40% 35%,rgba(201,169,110,0.06) 0%,transparent 70%)',
          animation: 'float-mid 9s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: 'calc(18% - 18px)', right: 'calc(10% - 18px)',
          width: '236px', height: '236px', borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          border: '1px solid rgba(201,169,110,0.12)', animation: 'pulse-ring 3.5s ease-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: 'calc(18% - 38px)', right: 'calc(10% - 38px)',
          width: '276px', height: '276px', borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          border: '1px solid rgba(0,255,255,0.04)', animation: 'pulse-ring 3.5s ease-out infinite 0.8s',
        }} />

        {/* Floating dots */}
        <div style={{ position: 'absolute', top: '15%', right: '22%', width: '6px', height: '6px', borderRadius: '50%', background: '#c9a96e', opacity: 0.45, pointerEvents: 'none', zIndex: 0, animation: 'float-dot 5s ease-in-out infinite', boxShadow: '0 0 8px #c9a96e' }} />
        <div style={{ position: 'absolute', top: '34%', right: '7%', width: '4px', height: '4px', borderRadius: '50%', background: '#00ffff', opacity: 0.25, pointerEvents: 'none', zIndex: 0, animation: 'float-dot 7.5s ease-in-out infinite 2s' }} />
        <div style={{ position: 'absolute', top: '28%', right: '16%', width: '3px', height: '3px', borderRadius: '50%', background: '#e8c98a', opacity: 0.25, pointerEvents: 'none', zIndex: 0, animation: 'float-dot 6s ease-in-out infinite 1s' }} />

        {/* Rotating dashed rings */}
        <div style={{ position: 'absolute', top: '5%', right: '4%', width: '340px', height: '340px', pointerEvents: 'none', zIndex: 0, opacity: 0.15, animation: 'spin-slow 50s linear infinite' }}>
          <svg viewBox="0 0 340 340" fill="none">
            <circle cx="170" cy="170" r="164" stroke="#c9a96e" strokeWidth="0.5" strokeDasharray="5 14" />
            <circle cx="170" cy="170" r="128" stroke="#00ffff" strokeWidth="0.5" strokeDasharray="2 18" />
            <circle cx="170" cy="170" r="90" stroke="#c9a96e" strokeWidth="0.3" strokeDasharray="1 22" />
          </svg>
        </div>
        <div style={{ position: 'absolute', top: 'calc(5% + 55px)', right: 'calc(4% + 55px)', width: '230px', height: '230px', pointerEvents: 'none', zIndex: 0, opacity: 0.1, animation: 'spin-slow-rev 30s linear infinite' }}>
          <svg viewBox="0 0 230 230" fill="none">
            <circle cx="115" cy="115" r="110" stroke="#ff0044" strokeWidth="0.4" strokeDasharray="3 12" />
          </svg>
        </div>

        {/* Ghost watermark */}
        <div style={{
          position: 'absolute', bottom: '-1rem', right: '1.5rem',
          fontFamily: 'var(--font-playfair, Georgia, serif)',
          fontSize: '30vw', fontWeight: 700, lineHeight: 1,
          color: 'rgba(201,169,110,0.022)', pointerEvents: 'none', zIndex: 0,
          userSelect: 'none', letterSpacing: '-0.06em',
        }}>01</div>

        {/* Glitch bar container */}
        <div ref={glitchBarsRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }} />

        {/* ══ MAIN CONTENT ══ */}
        <div style={{ position: 'relative', zIndex: 4, maxWidth: '980px' }}>

          {/* Status badge
          <div className="anim-hidden" style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#c9a96e', animation: 'pulse-ring 2.2s ease-out infinite' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c9a96e', boxShadow: '0 0 8px #c9a96e' }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-dm-mono, monospace)',
              fontSize: '0.6rem', color: 'rgba(201,169,110,0.65)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              animation: 'glitch-badge 6s steps(1) infinite',
            }}>
              01 — Available for projects · Q2 2025
            </span>
          </div> */}

          {/* Headline with glitch */}
          <h1
            className="anim-hidden digital-flicker"
            style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(3.2rem, 8.5vw, 7.5rem)',
              lineHeight: 1.02, fontWeight: 400,
              color: '#f0ece4', marginBottom: '2.5rem',
              letterSpacing: '-0.03em',
            }}
          >
            <div className="hero-glitch-wrap" style={{ display: 'block' }}>
              <span>Full-stack engineer,</span>
              <span className="hero-glitch-cyan" aria-hidden="true">Full-stack engineer,</span>
              <span className="hero-glitch-red" aria-hidden="true">Full-stack engineer,</span>
            </div>
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(130deg,#c9a96e 0%,#edd997 45%,#b8904a 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                animation: 'rgb-shift 5s ease-in-out infinite',
              }}>product-minded</em>
              <svg viewBox="0 0 480 14" fill="none" style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '14px' }} preserveAspectRatio="none">
                <path d="M2 9 C80 5, 160 11, 240 7 C320 3, 400 10, 478 6" stroke="url(#g1)" strokeWidth="1.5" strokeLinecap="round" className="line-draw" />
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#c9a96e" stopOpacity="0" />
                    <stop offset="25%" stopColor="#c9a96e" />
                    <stop offset="75%" stopColor="#edd997" />
                    <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span style={{ animation: 'rgb-shift 7s ease-in-out infinite 1s' }}> builder</span>
            <span className="cursor-blink" style={{ fontFamily: 'var(--font-dm-mono, monospace)', fontSize: '0.6em', marginLeft: '4px', color: '#c9a96e' }}>_</span>
          </h1>

        
          {/* CTAs + socials */}
          <div className="anim-hidden" style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#work" className="btn-gold"
              onMouseEnter={() => setIsHoveringCTA(true)}
              onMouseLeave={() => setIsHoveringCTA(false)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.875rem 2rem', background: 'linear-gradient(135deg,#c9a96e 0%,#edd997 50%,#b8904a 100%)', color: '#0d0b08', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-dm-sans, sans-serif)', textDecoration: 'none', letterSpacing: '0.01em', boxShadow: '0 0 40px rgba(201,169,110,0.2)' }}>
              View work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#contact" className="btn-ghost"
              onMouseEnter={() => setIsHoveringCTA(true)}
              onMouseLeave={() => setIsHoveringCTA(false)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.875rem 2rem', border: '1px solid rgba(201,169,110,0.22)', color: 'rgba(240,236,228,0.6)', borderRadius: '9999px', fontSize: '0.85rem', fontFamily: 'var(--font-dm-sans, sans-serif)', textDecoration: 'none' }}>
              Get in touch
            </a>
            <div style={{ width: '1px', height: '22px', background: 'rgba(201,169,110,0.12)', margin: '0 0.2rem' }} />
            {[{ label: 'GH', href: '#' }, { label: 'LI', href: '#' }, { label: 'TW', href: '#' }].map((s) => (
              <a key={s.label} href={s.href} className="social-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(201,169,110,0.11)', fontFamily: 'var(--font-dm-mono, monospace)', fontSize: '0.58rem', color: 'rgba(201,169,110,0.45)', textDecoration: 'none' }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="anim-hidden" style={{ position: 'absolute', bottom: '3rem', right: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '26px', height: '42px', borderRadius: '13px', border: '1px solid rgba(201,169,110,0.18)', display: 'flex', justifyContent: 'center', paddingTop: '7px' }}>
            <div style={{ width: '3px', height: '8px', borderRadius: '2px', background: 'rgba(201,169,110,0.6)', animation: 'scroll-bob 2s ease-in-out infinite' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-dm-mono, monospace)', fontSize: '0.52rem', color: 'rgba(201,169,110,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>scroll</span>
        </div>

        {/* Marquee ticker */}
        <div className="anim-hidden" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(201,169,110,0.055)', overflow: 'hidden', height: '34px', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', whiteSpace: 'nowrap', gap: '2.5rem', animation: 'marquee 32s linear infinite' }}>
            {Array(2).fill(['Next.js', '✦', 'Flutter', '✦', 'TypeScript', '✦', 'tRPC', '✦', 'Prisma', '✦', 'Tailwind CSS', '✦', 'Firebase', '✦', 'Stripe', '✦', 'Figma', '✦', 'Zustand', '✦', 'GraphQL', '✦', 'Clerk', '✦']).flat().map((item, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-dm-mono, monospace)', fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: item === '✦' ? 'rgba(201,169,110,0.38)' : 'rgba(240,236,228,0.15)', flexShrink: 0 }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}