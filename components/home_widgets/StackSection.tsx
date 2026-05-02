'use client'

import { useEffect, useRef, useState } from 'react'

const stackCategories = [
  {
    num: '01',
    total: '04',
    title: 'Web',
    subtitle: 'React ecosystem, typed end-to-end.',
    glyph: '⬡',
    accentColor: '#c9a96e',
   items: [
  'Next.js 15 (App Router)',
  'React 19',
  'TypeScript',
  'Tailwind CSS',
  'tRPC & Server Actions',
  'Zustand / Redux',
  'REST & GraphQL APIs',
  'Node.js (Backend Integration)',
  'Authentication (NextAuth / JWT)',
  'Performance Optimization',
  'Responsive UI / Mobile-first Design',
  'API Integration (Axios / Fetch)',
],
  },
  {
    num: '02',
    total: '04',
    title: 'Mobile',
    subtitle: 'Cross-platform, native-feel Flutter.',
    glyph: '◈',
    accentColor: '#7eb8f7',
    items: [
  'Flutter 3',
  'Dart',
  'Riverpod',
  'Provider / Bloc State Management',
  'Firebase Suite (Auth, Firestore, Messaging, Analytics)',
  'GoRouter / Navigator 2.0',
  'REST API Integration (Dio / Http)',
  'Local Storage (Hive / SharedPreferences)',
  'iOS & Android Release (Play Store / App Store)',
  'Push Notifications (FCM)',
  'UI/UX (Material 3, Custom Widgets)',
],
  },
  {
    num: '03',
    total: '04',
    title: 'Backend',
    subtitle: 'Services the frontend can trust.',
    glyph: '⬟',
    accentColor: '#74d9a0',
   items: [
  'Node.js',
  'Express.js (REST APIs, middleware, MVC)',
  'Spring Boot (Java backend services)',
  'Go Lang (high-performance APIs)',
  'REST & GraphQL',
  'Auth (Clerk / NextAuth)',
  'PostgreSQL · Prisma',
  'Redis caching',
  'Stripe integrations',
],
  },
  {
    num: '04',
    total: '04',
    title: 'Craft',
    subtitle: 'How the work gets done.',
    glyph: '◇',
    accentColor: '#c084fc',
    items: [
  'Clean Architecture',
  'CI/CD (GitHub Actions / GitLab CI)',
  'Accessibility (WCAG Standards)',
  'Testing (Unit / Integration / E2E - Vitest, Jest, Playwright)',
  'Performance budgets & optimization',
  'Technical writing & documentation',
  'Code review & best practices',
  'Design patterns (SOLID, DRY, KISS)',
  'Git workflows (GitFlow / Trunk-based development)',
  'Monitoring & logging (basic observability)',
],
  },
]

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

export default function StackSection() {
  const ref = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const glitchBarsRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [glitchCard, setGlitchCard] = useState<number | null>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const cursorPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const glitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const barTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.anim-hidden')
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add('anim-visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Smooth cursor
  useEffect(() => {
    const section = ref.current
    if (!section) return
    const onMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }
    section.addEventListener('mousemove', onMove)
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
      section.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Random card glitch trigger
  useEffect(() => {
    const scheduleGlitch = () => {
      const delay = 3000 + Math.random() * 4000
      glitchTimerRef.current = setTimeout(() => {
        const idx = Math.floor(Math.random() * stackCategories.length)
        setGlitchCard(idx)
        setTimeout(() => setGlitchCard(null), 400)
        scheduleGlitch()
      }, delay)
    }
    scheduleGlitch()
    return () => { if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current) }
  }, [])

  // Glitch bar bursts — same as hero
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
      barTimerRef.current = setTimeout(spawnGlitchBars, Math.random() * 3000 + 1000)
    }
    const t = setTimeout(spawnGlitchBars, 2000)
    return () => {
      clearTimeout(t)
      if (barTimerRef.current) clearTimeout(barTimerRef.current)
    }
  }, [])

  const activeAccent = activeCard !== null ? stackCategories[activeCard].accentColor : '#c9a96e'

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
          width: activeCard !== null ? '52px' : '40px',
          height: activeCard !== null ? '52px' : '40px',
          borderRadius: '50%',
          border: `1px solid ${activeAccent}99`,
          background: activeCard !== null ? `${activeAccent}12` : 'transparent',
          transition: 'width 0.3s, height 0.3s, border-color 0.4s, background 0.4s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
          width: '6px', height: '6px', borderRadius: '50%',
          background: activeAccent,
          transition: 'background 0.4s',
        }}
      />

      <style>{`
        @keyframes float-slow {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.03); }
        }
        @keyframes float-mid {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
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
          0% { transform: scale(0.9); opacity: 0.8; }
          70% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(0.9); opacity: 0; }
        }
        @keyframes scanline-sweep {
          0% { transform: translateY(-5px); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes data-stream {
          0% { transform: translateY(-100%); opacity: 0; }
          5% { opacity: 0.6; }
          95% { opacity: 0.6; }
          100% { transform: translateY(100%); opacity: 0; }
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
        @keyframes glitch-shift {
          0%   { clip-path: inset(0 0 95% 0); transform: translate(-3px, 0); opacity: 0.8; }
          10%  { clip-path: inset(20% 0 60% 0); transform: translate(3px, 0); opacity: 0.9; }
          20%  { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 0); }
          30%  { clip-path: inset(70% 0 10% 0); transform: translate(4px, 0); opacity: 0.7; }
          40%  { clip-path: inset(10% 0 80% 0); transform: translate(-3px, 0); }
          50%  { clip-path: inset(40% 0 50% 0); transform: translate(2px, 0); opacity: 0.9; }
          60%  { clip-path: inset(80% 0 5% 0); transform: translate(-4px, 0); }
          70%  { clip-path: inset(30% 0 60% 0); transform: translate(3px, 0); opacity: 0.8; }
          80%  { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 0); }
          90%  { clip-path: inset(5% 0 90% 0); transform: translate(3px, 0); opacity: 0.7; }
          100% { clip-path: inset(0 0 95% 0); transform: translate(0, 0); opacity: 0; }
        }
        @keyframes glitch-color {
          0%   { transform: translate(3px, 0); opacity: 0.4; filter: hue-rotate(90deg); }
          25%  { transform: translate(-3px, 1px); opacity: 0.5; }
          50%  { transform: translate(2px, -1px); opacity: 0.3; filter: hue-rotate(180deg); }
          75%  { transform: translate(-2px, 0); opacity: 0.4; }
          100% { transform: translate(0, 0); opacity: 0; }
        }
        @keyframes item-reveal {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scan-line {
          0% { top: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes glitch-badge {
          0%,100% { transform:translateX(0); filter:none; }
          20% { transform:translateX(-2px); filter:hue-rotate(90deg); }
          40% { transform:translateX(2px); filter:hue-rotate(-90deg); }
          60% { transform:translateX(-1px); filter:none; }
        }
        .anim-hidden { opacity: 0; transform: translateY(24px); }
        .anim-visible {
          opacity: 1; transform: translateY(0);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .anim-delay-100 { transition-delay: 0.1s; }
        .anim-delay-200 { transition-delay: 0.2s; }
        .anim-delay-300 { transition-delay: 0.3s; }
        .anim-delay-400 { transition-delay: 0.4s; }
        .anim-delay-500 { transition-delay: 0.5s; }
        .anim-delay-600 { transition-delay: 0.6s; }
        .stack-glitch-wrap { position:relative; display:inline-block; }
        .stack-glitch-cyan {
          position:absolute; inset:0; pointer-events:none;
          color:#00ffff; animation:glitch-clip-1 4.8s steps(1) infinite 0.4s;
        }
        .stack-glitch-red {
          position:absolute; inset:0; pointer-events:none;
          color:#ff0044; animation:glitch-clip-2 4.8s steps(1) infinite 0.55s;
        }
        .digital-flicker { animation:digital-flicker 6s ease-in-out infinite; }
        .stack-card {
          position: relative;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s;
          overflow: hidden;
        }
        .stack-card:hover { transform: translateY(-6px) scale(1.01); }
        .stack-item {
          opacity: 0;
          transform: translateX(-8px);
        }
        .stack-card:hover .stack-item {
          animation: item-reveal 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        .stack-item:nth-child(1) { animation-delay: 0.02s; }
        .stack-item:nth-child(2) { animation-delay: 0.06s; }
        .stack-item:nth-child(3) { animation-delay: 0.10s; }
        .stack-item:nth-child(4) { animation-delay: 0.14s; }
        .stack-item:nth-child(5) { animation-delay: 0.18s; }
        .stack-item:nth-child(6) { animation-delay: 0.22s; }
        .glitch-layer-1 {
          position: absolute; inset: 0; pointer-events: none;
          animation: glitch-shift 0.4s steps(1) both;
          z-index: 10;
        }
        .glitch-layer-2 {
          position: absolute; inset: 0; pointer-events: none;
          animation: glitch-color 0.4s steps(1) both;
          z-index: 11;
        }
        .scan-line {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          animation: scan-line 4s linear infinite;
          pointer-events: none; z-index: 5;
        }
      `}</style>

      <section
        id="stack"
        ref={ref}
        style={{
          padding: '8rem 2.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: '#070706',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'none',
        }}
      >
        {/* Scanline sweep */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
          <div style={{
            position:'absolute', left:0, right:0, height:'2px',
            background:'linear-gradient(90deg,transparent,rgba(201,169,110,0.35),transparent)',
            animation:'scanline-sweep 7s linear infinite 0.5s',
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
          backgroundImage: `
            linear-gradient(rgba(201,169,110,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />

        {/* Grain */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4, zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          animation: 'noise-shift 0.15s steps(1) infinite',
        }} />

        {/* Ambient glow — reacts to active card */}
        <div style={{
          position: 'absolute', top: '-20%', left: '30%',
          width: '600px', height: '600px', borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(circle, ${activeAccent}09 0%, transparent 65%)`,
          transition: 'background 0.6s',
          animation: 'float-slow 14s ease-in-out infinite',
        }} />
        {/* Cyan glow bottom-left */}
        <div style={{
          position: 'absolute', bottom: '-20%', left: '-8%',
          width: '450px', height: '450px', borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle,rgba(0,255,255,0.03) 0%,transparent 65%)',
          animation: 'float-slow 18s ease-in-out infinite reverse',
        }} />

        {/* Data stream columns */}
        {[
          { l: '2%', d: '0s', dur: '10s' }, { l: '5%', d: '4s', dur: '13s', o: '0.07' },
          { r: '2%', d: '2s', dur: '11s' }, { r: '6%', d: '6s', dur: '15s', o: '0.07' },
        ].map((col, i) => (
          <div key={i} style={{
            position: 'absolute', top: 0,
            left: 'l' in col ? col.l as string : undefined,
            right: 'r' in col ? col.r as string : undefined,
            fontFamily: 'monospace', fontSize: '9px',
            color: `rgba(201,169,110,${col.o ?? '0.13'})`,
            writingMode: 'vertical-lr',
            animation: `data-stream ${col.dur} linear infinite`,
            animationDelay: col.d,
            pointerEvents: 'none', zIndex: 0, userSelect: 'none', letterSpacing: '4px',
          }}>
            {i % 2 === 0 ? '10110010001011010110001010011010' : '01001101010011100110101'}
          </div>
        ))}

        {/* Floating dots */}
        <div style={{ position:'absolute', top:'10%', right:'20%', width:'5px', height:'5px', borderRadius:'50%', background:'#c9a96e', opacity:0.3, pointerEvents:'none', zIndex:0, animation:'float-dot 5s ease-in-out infinite', boxShadow:'0 0 6px #c9a96e' }} />
        <div style={{ position:'absolute', top:'55%', left:'4%', width:'3px', height:'3px', borderRadius:'50%', background:'#00ffff', opacity:0.18, pointerEvents:'none', zIndex:0, animation:'float-dot 7.5s ease-in-out infinite 2s' }} />
        <div style={{ position:'absolute', top:'70%', right:'8%', width:'4px', height:'4px', borderRadius:'50%', background:'#e8c98a', opacity:0.18, pointerEvents:'none', zIndex:0, animation:'float-dot 6s ease-in-out infinite 1s' }} />

        {/* Rotating dashed rings */}
        <div style={{ position:'absolute', top:'-8%', right:'-4%', width:'380px', height:'380px', pointerEvents:'none', zIndex:0, opacity:0.11, animation:'spin-slow 60s linear infinite' }}>
          <svg viewBox="0 0 380 380" fill="none">
            <circle cx="190" cy="190" r="184" stroke="#c9a96e" strokeWidth="0.5" strokeDasharray="4 14" />
            <circle cx="190" cy="190" r="138" stroke="#00ffff" strokeWidth="0.4" strokeDasharray="2 18" />
            <circle cx="190" cy="190" r="94"  stroke="#c9a96e" strokeWidth="0.3" strokeDasharray="1 22" />
          </svg>
        </div>
        <div style={{ position:'absolute', top:'calc(-8% + 60px)', right:'calc(-4% + 60px)', width:'260px', height:'260px', pointerEvents:'none', zIndex:0, opacity:0.07, animation:'spin-slow-rev 35s linear infinite' }}>
          <svg viewBox="0 0 260 260" fill="none">
            <circle cx="130" cy="130" r="124" stroke="#ff0044" strokeWidth="0.4" strokeDasharray="3 12" />
          </svg>
        </div>

        {/* Ghost watermark */}
        <div style={{
          position: 'absolute', bottom: '-2rem', right: '1rem',
          fontFamily: 'var(--font-playfair, Georgia, serif)',
          fontSize: '28vw', fontWeight: 700, lineHeight: 1,
          color: 'rgba(201,169,110,0.02)', pointerEvents: 'none',
          userSelect: 'none', letterSpacing: '-0.06em', zIndex: 0,
        }}>02</div>

        {/* Glitch bar container */}
        <div ref={glitchBarsRef} style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1, overflow:'hidden' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 4 }}>

          {/* Header */}
          <div className="anim-hidden" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#c9a96e', animation: 'pulse-ring 2.2s ease-out infinite' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c9a96e', boxShadow: '0 0 8px #c9a96e' }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-dm-mono, monospace)',
              fontSize: '0.6rem', color: 'rgba(201,169,110,0.65)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              animation: 'glitch-badge 6s steps(1) infinite',
            }}>02 — Tech Stack</span>
          </div>

          <h2
            className="anim-hidden anim-delay-100 digital-flicker"
            style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400, lineHeight: 1.15, marginBottom: '4rem',
              maxWidth: '700px', color: '#f0ece4', letterSpacing: '-0.02em',
            }}
          >
            End-to-end{' '}
            <span className="stack-glitch-wrap">
              <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(130deg, #c9a96e 0%, #edd997 50%, #b8904a 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                animation: 'rgb-shift 5s ease-in-out infinite',
              }}>engineering</em>
              <em className="stack-glitch-cyan" aria-hidden="true" style={{ fontStyle:'italic' }}>engineering</em>
              <em className="stack-glitch-red"  aria-hidden="true" style={{ fontStyle:'italic' }}>engineering</em>
            </span>
            , from Figma to production.
          </h2>

          {/* Cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            {stackCategories.map((cat, index) => {
              const isActive = activeCard === index
              const isGlitching = glitchCard === index

              return (
                <div
                  key={cat.title}
                  className={`stack-card anim-hidden anim-delay-${(index + 2) * 100}`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{
                    padding: '2.25rem',
                    background: isActive
                      ? `linear-gradient(135deg, rgba(${hexToRgb(cat.accentColor)},0.07) 0%, #0a0908 100%)`
                      : '#0a0908',
                    position: 'relative',
                    cursor: 'none',
                    transition: 'background 0.4s',
                    boxShadow: isActive ? `inset 0 0 60px rgba(${hexToRgb(cat.accentColor)},0.04)` : 'none',
                  }}
                >
                  {/* Per-card scan line */}
                  <div className="scan-line" />

                  {/* Scanlines texture on card */}
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none', zIndex:1,
                    backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.05) 3px,rgba(0,0,0,0.05) 4px)',
                  }} />

                  {/* Card glitch layers (on random trigger) */}
                  {isGlitching && (
                    <>
                      <div className="glitch-layer-1" style={{ background: `${cat.accentColor}18` }} />
                      <div className="glitch-layer-2" style={{ background: `${cat.accentColor}0a` }} />
                    </>
                  )}

                  {/* Active border — top edge */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: isActive
                      ? `linear-gradient(90deg, transparent, ${cat.accentColor}, transparent)`
                      : 'transparent',
                    transition: 'background 0.4s',
                  }} />

                  {/* Corner glyph */}
                  <div style={{
                    position: 'absolute', top: '1.25rem', right: '1.25rem',
                    fontFamily: 'var(--font-dm-mono, monospace)',
                    fontSize: '1.1rem',
                    color: isActive ? cat.accentColor : 'rgba(255,255,255,0.06)',
                    transition: 'color 0.4s, transform 0.4s',
                    transform: isActive ? 'rotate(15deg) scale(1.2)' : 'rotate(0deg) scale(1)',
                    zIndex: 2,
                  }}>
                    {cat.glyph}
                  </div>

                  {/* Number */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
                    <span style={{
                      fontFamily: 'var(--font-dm-mono, monospace)',
                      fontSize: isActive ? '1.6rem' : '0.65rem',
                      color: isActive ? cat.accentColor : 'rgba(240,236,228,0.2)',
                      lineHeight: 1,
                      transition: 'font-size 0.3s cubic-bezier(0.16,1,0.3,1), color 0.3s',
                      letterSpacing: isActive ? '-0.03em' : '0.05em',
                    }}>
                      {cat.num}
                    </span>
                    {!isActive && (
                      <span style={{ fontFamily: 'var(--font-dm-mono, monospace)', fontSize: '0.65rem', color: 'rgba(240,236,228,0.1)' }}>
                        / {cat.total}
                      </span>
                    )}
                  </div>

                  {/* Title with inline glitch on random trigger */}
                  <h3 style={{
                    fontFamily: 'var(--font-playfair, Georgia, serif)',
                    fontSize: '2rem', fontWeight: 400, lineHeight: 1,
                    marginBottom: '0.5rem',
                    color: isActive ? '#f0ece4' : 'rgba(240,236,228,0.7)',
                    transition: 'color 0.3s',
                    letterSpacing: '-0.02em',
                    position: 'relative', zIndex: 2,
                  }}>
                    {isGlitching && (
                      <span style={{
                        position: 'absolute', inset: 0,
                        color: cat.accentColor, opacity: 0.7,
                        clipPath: 'inset(30% 0 50% 0)',
                        transform: 'translateX(3px)',
                        pointerEvents: 'none',
                      }}>
                        {cat.title}
                      </span>
                    )}
                    {cat.title}
                  </h3>

                  {/* Subtitle */}
                  <p style={{
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    fontSize: '0.75rem',
                    color: isActive ? 'rgba(240,236,228,0.45)' : 'rgba(240,236,228,0.2)',
                    marginBottom: '1.75rem',
                    letterSpacing: '0.02em',
                    transition: 'color 0.3s',
                    position: 'relative', zIndex: 2,
                  }}>
                    {cat.subtitle}
                  </p>

                  {/* Divider */}
                  <div style={{
                    height: '1px', marginBottom: '1.5rem',
                    background: isActive
                      ? `linear-gradient(90deg, ${cat.accentColor}50, transparent)`
                      : 'rgba(255,255,255,0.05)',
                    transition: 'background 0.4s',
                    position: 'relative', zIndex: 2,
                  }} />

                  {/* Items */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', position: 'relative', zIndex: 2 }}>
                    {cat.items.map((item, itemIdx) => (
                      <li
                        key={item}
                        className="stack-item"
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-dm-sans, sans-serif)',
                          color: isActive ? 'rgba(240,236,228,0.75)' : 'rgba(240,236,228,0.35)',
                          transition: 'color 0.3s',
                          animationDelay: isActive ? `${itemIdx * 0.04}s` : '0s',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="6" cy="6" r="5.25" stroke={isActive ? cat.accentColor : 'rgba(255,255,255,0.1)'} strokeWidth="0.75" style={{ transition: 'stroke 0.3s' }} />
                          <path d="M3.5 6l1.75 1.75L8.5 4.5" stroke={isActive ? cat.accentColor : 'rgba(255,255,255,0.15)'} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s' }} />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom accent line */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
                    background: isActive
                      ? `linear-gradient(90deg, transparent, ${cat.accentColor}60, transparent)`
                      : 'transparent',
                    transition: 'background 0.4s',
                  }} />
                </div>
              )
            })}
          </div>

          {/* Footer note */}
          <div
            className="anim-hidden anim-delay-600"
            style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'space-between', flexWrap: 'wrap' }}
          >
            <p style={{
              fontFamily: 'var(--font-dm-mono, monospace)',
              fontSize: '0.6rem', color: 'rgba(240,236,228,0.2)',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              animation: 'glitch-badge 9s steps(1) infinite',
            }}>
              Hover a card to explore · Idle glitch is a feature
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {stackCategories.map((cat, i) => (
                <div key={i} style={{
                  width: activeCard === i ? '20px' : '6px',
                  height: '3px', borderRadius: '2px',
                  background: activeCard === i ? cat.accentColor : 'rgba(255,255,255,0.1)',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}