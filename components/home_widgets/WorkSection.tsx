'use client'

import { useEffect, useRef, useState } from 'react'

const filters = ['All', 'Next.js Website', 'Next.js SaaS', 'Web App', 'Flutter App']

const projects = [
  {
    id: 1,
    title: 'Byte',
    category: 'Flutter App',
    year: '2024',
    description: 'A short-form video discovery app with real-time spotlight feed, onboarding, and social sharing.',
    tags: ['Flutter', 'Firebase', 'Riverpod'],
    color: '#1a1a2e',
    accent: '#6c63ff',
  },
  {
    id: 2,
    title: 'Wireframe OS',
    category: 'Next.js Website',
    year: '2025',
    description: 'Design system documentation site built with Next.js App Router, MDX, and custom component library.',
    tags: ['Next.js', 'TypeScript', 'MDX'],
    color: '#1a1a1a',
    accent: '#c9a96e',
  },
  {
    id: 3,
    title: 'Fintrack',
    category: 'Next.js SaaS',
    year: '2024',
    description: 'B2B finance dashboard with real-time analytics, Stripe billing, and role-based access control.',
    tags: ['Next.js', 'tRPC', 'Prisma'],
    color: '#0a1628',
    accent: '#3b82f6',
  },
  {
    id: 4,
    title: 'HealthPulse',
    category: 'Flutter App',
    year: '2023',
    description: 'Health tracking mobile app for iOS and Android. Wearable integration, streak tracking, coach mode.',
    tags: ['Flutter', 'Dart', 'GoRouter'],
    color: '#0d1f0d',
    accent: '#22c55e',
  },
  {
    id: 5,
    title: 'Launchkit',
    category: 'Next.js SaaS',
    year: '2025',
    description: 'Boilerplate SaaS starter with Auth, Stripe, Postgres, and pre-built dashboard components.',
    tags: ['Next.js', 'Clerk', 'Stripe'],
    color: '#1f1020',
    accent: '#a855f7',
  },
  {
    id: 6,
    title: 'Studio Site',
    category: 'Next.js Website',
    year: '2023',
    description: 'Marketing site for a creative studio — editorial layout, GSAP animations, CMS integration.',
    tags: ['Next.js', 'Sanity', 'GSAP'],
    color: '#1a1410',
    accent: '#f59e0b',
  },
]

export default function WorkSection() {
  const ref = useRef<HTMLDivElement>(null)
  const glitchBarsRef = useRef<HTMLDivElement>(null)
  const glitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.anim-hidden')
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add('anim-visible'), i * 80)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
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
      glitchTimerRef.current = setTimeout(spawnGlitchBars, Math.random() * 3000 + 1000)
    }
    const t = setTimeout(spawnGlitchBars, 1500)
    return () => {
      clearTimeout(t)
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current)
    }
  }, [])

  return (
    <section
      id="work"
      ref={ref}
      style={{ position:'relative', overflow:'hidden', borderTop:'1px solid var(--border)', padding:'8rem 2.5rem' }}
    >
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
        @keyframes holo-border {
          0%,100% { border-color:rgba(201,169,110,0.1); box-shadow:0 0 0 rgba(201,169,110,0); }
          50% { border-color:rgba(201,169,110,0.3); box-shadow:0 0 18px rgba(201,169,110,0.06), inset 0 0 12px rgba(201,169,110,0.02); }
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
        .work-glitch-wrap { position:relative; display:inline-block; }
        .work-glitch-cyan {
          position:absolute; inset:0; pointer-events:none;
          color:#00ffff; animation:glitch-clip-1 4.2s steps(1) infinite 0.2s;
        }
        .work-glitch-red {
          position:absolute; inset:0; pointer-events:none;
          color:#ff0044; animation:glitch-clip-2 4.2s steps(1) infinite 0.35s;
        }
        .digital-flicker { animation:digital-flicker 5.5s ease-in-out infinite; }
        .project-card {
          border: 1px solid rgba(201,169,110,0.1);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          background: rgba(240,236,228,0.018);
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          animation: holo-border 4s ease-in-out infinite;
          position: relative;
        }
        .project-card::before {
          content:''; position:absolute; top:-50%; left:-50%;
          width:200%; height:200%;
          background:conic-gradient(transparent,rgba(201,169,110,0.025),transparent 30%);
          animation:spin-slow 9s linear infinite;
          pointer-events:none; z-index:0;
        }
        .project-card:hover {
          border-color: rgba(201,169,110,0.4) !important;
          transform: translateY(-5px) scale(1.015);
          box-shadow: 0 0 28px rgba(201,169,110,0.1);
          animation: none;
        }
        .project-card:hover::before { display:none; }
        .filter-btn {
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-family: var(--font-dm-sans, sans-serif);
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid rgba(201,169,110,0.15);
          background: transparent;
          color: rgba(240,236,228,0.45);
          position: relative; overflow: hidden;
        }
        .filter-btn::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,transparent 30%,rgba(255,255,255,0.08) 50%,transparent 70%);
          transform:translateX(-100%); transition:transform 0.4s;
        }
        .filter-btn:hover::before { transform:translateX(100%); }
        .filter-btn:hover { border-color: rgba(201,169,110,0.35); color: rgba(240,236,228,0.7); }
        .filter-btn.active {
          border-color: #f0ece4;
          background: #f0ece4;
          color: #0d0b08;
        }
        .tag {
          display: inline-block;
          padding: 0.22rem 0.6rem;
          border-radius: 4px;
          font-family: var(--font-dm-mono, monospace);
          font-size: 0.62rem;
          border: 1px solid rgba(201,169,110,0.18);
          color: rgba(201,169,110,0.6);
          background: rgba(201,169,110,0.05);
          letter-spacing: 0.04em;
        }
      `}</style>

      {/* Scanline sweep */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'2px',
          background:'linear-gradient(90deg,transparent,rgba(201,169,110,0.35),transparent)',
          animation:'scanline-sweep 8s linear infinite 1s',
        }} />
      </div>

      {/* Static scanlines */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:2,
        backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)',
      }} />

      {/* BG grid */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
        backgroundImage:`linear-gradient(rgba(201,169,110,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.022) 1px,transparent 1px)`,
        backgroundSize:'80px 80px',
      }} />

      {/* Grain */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:0, opacity:0.4,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        animation:'noise-shift 0.15s steps(1) infinite',
      }} />

      {/* Ambient glow */}
      <div style={{
        position:'absolute', top:'-10%', right:'-6%',
        width:'600px', height:'600px', borderRadius:'50%', pointerEvents:'none', zIndex:0,
        background:'radial-gradient(circle,rgba(201,169,110,0.065) 0%,transparent 62%)',
        animation:'float-slow 14s ease-in-out infinite',
      }} />
      <div style={{
        position:'absolute', bottom:'-20%', left:'-8%',
        width:'500px', height:'500px', borderRadius:'50%', pointerEvents:'none', zIndex:0,
        background:'radial-gradient(circle,rgba(0,255,255,0.03) 0%,transparent 65%)',
        animation:'float-slow 18s ease-in-out infinite reverse',
      }} />

      {/* Data stream columns */}
      {[
        { l: '2%', d: '0.5s', dur: '11s' }, { l: '5%', d: '5s', dur: '14s', o: '0.07' },
        { r: '2%', d: '2.5s', dur: '12s' }, { r: '6%', d: '7s', dur: '16s', o: '0.07' },
      ].map((col, i) => (
        <div key={i} style={{
          position:'absolute', top:0,
          left: 'l' in col ? col.l as string : undefined,
          right: 'r' in col ? col.r as string : undefined,
          fontFamily:'monospace', fontSize:'9px',
          color:`rgba(201,169,110,${col.o ?? '0.13'})`,
          writingMode:'vertical-lr',
          animation:`data-stream ${col.dur} linear infinite`,
          animationDelay: col.d,
          pointerEvents:'none', zIndex:0, userSelect:'none', letterSpacing:'4px',
        }}>
          {i % 2 === 0 ? '10110010001011010110001010011010' : '01001101010011100110101'}
        </div>
      ))}

      {/* Floating dots */}
      <div style={{ position:'absolute', top:'8%', right:'20%', width:'5px', height:'5px', borderRadius:'50%', background:'#c9a96e', opacity:0.3, pointerEvents:'none', zIndex:0, animation:'float-dot 5s ease-in-out infinite', boxShadow:'0 0 6px #c9a96e' }} />
      <div style={{ position:'absolute', top:'55%', right:'4%', width:'3px', height:'3px', borderRadius:'50%', background:'#00ffff', opacity:0.18, pointerEvents:'none', zIndex:0, animation:'float-dot 7.5s ease-in-out infinite 2.5s' }} />
      <div style={{ position:'absolute', top:'30%', left:'7%', width:'4px', height:'4px', borderRadius:'50%', background:'#e8c98a', opacity:0.18, pointerEvents:'none', zIndex:0, animation:'float-dot 6s ease-in-out infinite 1.2s' }} />

      {/* Rotating dashed rings */}
      <div style={{ position:'absolute', top:'1%', right:'3%', width:'300px', height:'300px', pointerEvents:'none', zIndex:0, opacity:0.11, animation:'spin-slow 60s linear infinite' }}>
        <svg viewBox="0 0 300 300" fill="none">
          <circle cx="150" cy="150" r="144" stroke="#c9a96e" strokeWidth="0.5" strokeDasharray="5 14" />
          <circle cx="150" cy="150" r="108" stroke="#00ffff" strokeWidth="0.5" strokeDasharray="2 18" />
          <circle cx="150" cy="150" r="74"  stroke="#c9a96e" strokeWidth="0.3" strokeDasharray="1 20" />
        </svg>
      </div>
      <div style={{ position:'absolute', top:'calc(1% + 48px)', right:'calc(3% + 48px)', width:'204px', height:'204px', pointerEvents:'none', zIndex:0, opacity:0.08, animation:'spin-slow-rev 35s linear infinite' }}>
        <svg viewBox="0 0 204 204" fill="none">
          <circle cx="102" cy="102" r="97" stroke="#ff0044" strokeWidth="0.4" strokeDasharray="3 12" />
        </svg>
      </div>

      {/* Ghost watermark */}
      <div style={{
        position:'absolute', bottom:'-1rem', right:'1rem',
        fontFamily:'var(--font-playfair, Georgia, serif)',
        fontSize:'28vw', fontWeight:700, lineHeight:1,
        color:'rgba(201,169,110,0.018)', pointerEvents:'none', zIndex:0,
        userSelect:'none', letterSpacing:'-0.06em',
      }}>04</div>

      {/* Glitch bar container */}
      <div ref={glitchBarsRef} style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1, overflow:'hidden' }} />

      {/* ══ CONTENT ══ */}
      <div style={{ maxWidth:'1100px', margin:'0 auto', position:'relative', zIndex:4 }}>

        {/* Header */}
        <div className="anim-hidden" style={{ marginBottom:'1.5rem' }}>
          <span style={{
            display:'inline-flex', alignItems:'center', gap:'0.6rem',
            fontFamily:'var(--font-dm-mono, monospace)',
            fontSize:'0.62rem', letterSpacing:'0.18em', textTransform:'uppercase',
            color:'rgba(201,169,110,0.55)',
            animation:'glitch-badge 6.5s steps(1) infinite',
          }}>
            <span style={{ color:'rgba(201,169,110,0.35)' }}>04</span>
            Selected Work
          </span>
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'flex-end', gap:'2rem', marginBottom:'3rem' }}>
          <h2
            className="anim-hidden digital-flicker"
            style={{
              fontFamily:'var(--font-playfair, Georgia, serif)',
              fontSize:'clamp(2rem,5vw,3.5rem)',
              fontWeight:400, lineHeight:1.15,
              color:'#f0ece4', maxWidth:'600px',
            }}
          >
            Shipped with{' '}
            <span className="work-glitch-wrap">
              <em style={{
                fontStyle:'italic',
                background:'linear-gradient(130deg,#c9a96e 0%,#edd997 45%,#b8904a 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                animation:'rgb-shift 5s ease-in-out infinite',
              }}>care</em>
              <em className="work-glitch-cyan" aria-hidden="true" style={{ fontStyle:'italic' }}>care</em>
              <em className="work-glitch-red"  aria-hidden="true" style={{ fontStyle:'italic' }}>care</em>
            </span>
            {' '}— web &amp; mobile.
          </h2>
          <p className="anim-hidden" style={{
            fontFamily:'var(--font-dm-sans, sans-serif)',
            fontSize:'0.85rem', color:'rgba(240,236,228,0.45)',
            maxWidth:'300px', lineHeight:1.7, fontWeight:300,
          }}>
            A selection of Next.js web products and Flutter mobile apps delivered between 2023 and
            today.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="anim-hidden" style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'3rem' }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`filter-btn${activeFilter === f ? ' active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div style={{ display:'grid', gap:'1.5rem', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="anim-hidden project-card"
              style={{ animationDelay:`${i * 0.4}s` } as React.CSSProperties}
            >
              {/* Thumbnail */}
              <div
                style={{ height:'200px', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', background: project.color }}
              >
                {/* Scanlines on card */}
                <div style={{
                  position:'absolute', inset:0, pointerEvents:'none', zIndex:2,
                  backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.07) 3px,rgba(0,0,0,0.07) 4px)',
                }} />

                {/* Decorative circle */}
                <div
                  style={{ width:'120px', height:'120px', borderRadius:'50%', opacity:0.12, position:'absolute', top:'-20px', right:'-20px', background: project.accent }}
                />
                <div
                  style={{ width:'60px', height:'60px', borderRadius:'12px', opacity:0.15, position:'absolute', bottom:'20px', left:'20px', transform:'rotate(15deg)', background: project.accent }}
                />

                {/* Pulse ring on decorative circle */}
                <div style={{
                  position:'absolute', top:'-34px', right:'-34px',
                  width:'148px', height:'148px', borderRadius:'50%',
                  border:`1px solid ${project.accent}33`,
                  animation:'pulse-ring 3.5s ease-out infinite',
                  pointerEvents:'none', zIndex:1,
                }} />

                {/* Title */}
                <span
                  style={{
                    fontFamily:'var(--font-playfair, Georgia, serif)',
                    fontSize:'2.5rem', fontWeight:600,
                    opacity:0.6, letterSpacing:'-0.02em',
                    color: project.accent,
                    position:'relative', zIndex:3,
                  }}
                >
                  {project.title}
                </span>

                {/* Category badge */}
                <div
                  style={{
                    position:'absolute', top:'1rem', left:'1rem',
                    padding:'0.22rem 0.65rem', borderRadius:'4px',
                    fontFamily:'var(--font-dm-mono, monospace)',
                    fontSize:'0.6rem', textTransform:'uppercase', letterSpacing:'0.08em',
                    border:`1px solid ${project.accent}44`,
                    background:`${project.accent}11`,
                    color: project.accent,
                    zIndex:3,
                    animation:'glitch-badge 9s steps(1) infinite',
                  }}
                >
                  {project.category}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding:'1.5rem', position:'relative', zIndex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.75rem' }}>
                  <h3 style={{
                    fontFamily:'var(--font-playfair, Georgia, serif)',
                    fontSize:'1.4rem', fontWeight:400, color:'#f0ece4',
                  }}>
                    {project.title}
                  </h3>
                  <span style={{
                    fontFamily:'var(--font-dm-mono, monospace)',
                    fontSize:'0.65rem', color:'rgba(201,169,110,0.35)',
                  }}>
                    {project.year}
                  </span>
                </div>
                <p style={{
                  fontFamily:'var(--font-dm-sans, sans-serif)',
                  fontSize:'0.82rem', color:'rgba(240,236,228,0.45)',
                  lineHeight:1.7, marginBottom:'1.25rem', fontWeight:300,
                }}>
                  {project.description}
                </p>
                <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    // contact section
  )
}