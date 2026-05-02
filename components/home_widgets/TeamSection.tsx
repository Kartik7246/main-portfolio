'use client'

import { useEffect, useRef } from 'react'

const team = [
  {
    name: 'Aman Kumar',
    role: 'UI/UX Designer (Figma)',
    bio: 'Designs clean and user-friendly interfaces using Figma. Focused on UI/UX systems and modern product design workflows.',
    initials: 'AK',
    bg: '#1a120d',
    accent: '#f59e0b',
  },
  {
    name: 'Amit Kumar',
    role: 'Backend & Automation Specialist',
    bio: 'Works on backend systems and automation workflows. Experienced in APIs, system optimization, and scalable architecture.',
    initials: 'AM',
    bg: '#0d1a18',
    accent: '#22c55e',
  },
  {
    name: 'Kartik',
    role: 'Frontend Web & Mobile Developer',
    bio: 'Builds modern web interfaces and mobile applications with focus on performance, UI consistency, and cross-platform development.',
    initials: 'KT',
    bg: '#0d0f1a',
    accent: '#60a5fa',
  },
]

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null)
  const glitchBarsRef = useRef<HTMLDivElement>(null)
  const glitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    const t = setTimeout(spawnGlitchBars, 2000)
    return () => {
      clearTimeout(t)
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current)
    }
  }, [])

  return (
    <section
      id="team"
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border)', padding: '8rem 2.5rem' }}
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
          0%,100% { border-color:rgba(201,169,110,0.12); box-shadow:0 0 0 rgba(201,169,110,0); }
          50% { border-color:rgba(201,169,110,0.38); box-shadow:0 0 18px rgba(201,169,110,0.08), inset 0 0 18px rgba(201,169,110,0.03); }
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
        .team-glitch-wrap { position:relative; display:inline-block; }
        .team-glitch-cyan {
          position:absolute; inset:0; pointer-events:none;
          color:#00ffff; animation:glitch-clip-1 4.5s steps(1) infinite 0.3s;
        }
        .team-glitch-red {
          position:absolute; inset:0; pointer-events:none;
          color:#ff0044; animation:glitch-clip-2 4.5s steps(1) infinite 0.45s;
        }
        .digital-flicker { animation:digital-flicker 6s ease-in-out infinite; }
        .team-card {
          border: 1px solid rgba(201,169,110,0.1);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          animation: holo-border 3.5s ease-in-out infinite;
          position: relative;
        }
        .team-card::before {
          content:''; position:absolute; top:-50%; left:-50%;
          width:200%; height:200%;
          background:conic-gradient(transparent,rgba(201,169,110,0.03),transparent 30%);
          animation:spin-slow 8s linear infinite;
          pointer-events:none; z-index:0;
        }
        .team-card:hover {
          border-color: rgba(201,169,110,0.45) !important;
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 0 30px rgba(201,169,110,0.12);
          animation: none;
        }
        .team-card:hover::before { display:none; }
        .avatar-ring-pulse {
          position:absolute; border-radius:50%;
          border: 1px solid rgba(201,169,110,0.18);
          animation: pulse-ring 3s ease-out infinite;
          pointer-events:none;
        }
      `}</style>

      {/* Scanline sweep */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'2px',
          background:'linear-gradient(90deg,transparent,rgba(201,169,110,0.35),transparent)',
          animation:'scanline-sweep 7s linear infinite',
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

      {/* Ambient glow top-right */}
      <div style={{
        position:'absolute', top:'-10%', right:'-6%',
        width:'600px', height:'600px', borderRadius:'50%', pointerEvents:'none', zIndex:0,
        background:'radial-gradient(circle,rgba(201,169,110,0.06) 0%,transparent 62%)',
        animation:'float-slow 16s ease-in-out infinite',
      }} />
      {/* Cyan glow bottom-left */}
      <div style={{
        position:'absolute', bottom:'-20%', left:'-8%',
        width:'500px', height:'500px', borderRadius:'50%', pointerEvents:'none', zIndex:0,
        background:'radial-gradient(circle,rgba(0,255,255,0.03) 0%,transparent 65%)',
        animation:'float-slow 20s ease-in-out infinite reverse',
      }} />

      {/* Data stream columns */}
      {[
        { l: '2%', d: '0s', dur: '10s' }, { l: '5%', d: '4s', dur: '13s', o: '0.07' },
        { r: '2%', d: '2s', dur: '11s' }, { r: '6%', d: '6s', dur: '15s', o: '0.07' },
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
      <div style={{ position:'absolute', top:'12%', right:'18%', width:'5px', height:'5px', borderRadius:'50%', background:'#c9a96e', opacity:0.35, pointerEvents:'none', zIndex:0, animation:'float-dot 5.5s ease-in-out infinite', boxShadow:'0 0 6px #c9a96e' }} />
      <div style={{ position:'absolute', top:'60%', right:'5%', width:'3px', height:'3px', borderRadius:'50%', background:'#00ffff', opacity:0.2, pointerEvents:'none', zIndex:0, animation:'float-dot 8s ease-in-out infinite 2s' }} />
      <div style={{ position:'absolute', top:'35%', left:'8%', width:'4px', height:'4px', borderRadius:'50%', background:'#e8c98a', opacity:0.2, pointerEvents:'none', zIndex:0, animation:'float-dot 6.5s ease-in-out infinite 1s' }} />

      {/* Rotating dashed rings — top right */}
      <div style={{ position:'absolute', top:'2%', right:'2%', width:'280px', height:'280px', pointerEvents:'none', zIndex:0, opacity:0.12, animation:'spin-slow 55s linear infinite' }}>
        <svg viewBox="0 0 280 280" fill="none">
          <circle cx="140" cy="140" r="134" stroke="#c9a96e" strokeWidth="0.5" strokeDasharray="4 14" />
          <circle cx="140" cy="140" r="100" stroke="#00ffff" strokeWidth="0.5" strokeDasharray="2 18" />
          <circle cx="140" cy="140" r="68"  stroke="#c9a96e" strokeWidth="0.3" strokeDasharray="1 20" />
        </svg>
      </div>
      <div style={{ position:'absolute', top:'calc(2% + 45px)', right:'calc(2% + 45px)', width:'190px', height:'190px', pointerEvents:'none', zIndex:0, opacity:0.08, animation:'spin-slow-rev 32s linear infinite' }}>
        <svg viewBox="0 0 190 190" fill="none">
          <circle cx="95" cy="95" r="90" stroke="#ff0044" strokeWidth="0.4" strokeDasharray="3 11" />
        </svg>
      </div>

      {/* Ghost watermark */}
      <div style={{
        position:'absolute', bottom:'-1rem', right:'1rem',
        fontFamily:'var(--font-playfair, Georgia, serif)',
        fontSize:'28vw', fontWeight:700, lineHeight:1,
        color:'rgba(201,169,110,0.018)', pointerEvents:'none', zIndex:0,
        userSelect:'none', letterSpacing:'-0.06em',
      }}>06</div>

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
            animation:'glitch-badge 7s steps(1) infinite',
          }}>
            <span style={{ color:'rgba(201,169,110,0.35)' }}>06</span>
            The Studio
          </span>
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'flex-start', gap:'2rem', marginBottom:'4rem' }}>
          <h2
            className="anim-hidden digital-flicker"
            style={{
              fontFamily:'var(--font-playfair, Georgia, serif)',
              fontSize:'clamp(2rem,5vw,3.5rem)',
              fontWeight:400, lineHeight:1.15,
              color:'#f0ece4', maxWidth:'600px',
            }}
          >
            A small team of{' '}
            <span className="team-glitch-wrap">
              <em style={{
                fontStyle:'italic',
                background:'linear-gradient(130deg,#c9a96e 0%,#edd997 45%,#b8904a 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                animation:'rgb-shift 5s ease-in-out infinite',
              }}>opinionated</em>
              <em className="team-glitch-cyan" aria-hidden="true" style={{ fontStyle:'italic' }}>opinionated</em>
              <em className="team-glitch-red"  aria-hidden="true" style={{ fontStyle:'italic' }}>opinionated</em>
            </span>
            {' '}engineers.
          </h2>
          <p className="anim-hidden" style={{
            fontFamily:'var(--font-dm-sans, sans-serif)',
            fontSize:'0.85rem', color:'rgba(240,236,228,0.45)',
            maxWidth:'280px', lineHeight:1.7, fontWeight:300,
          }}>
            Four senior practitioners across product design, mobile engineering, backend and
            strategy. No middle-managers.
          </p>
        </div>

        {/* Team grid */}
        <div style={{ display:'grid', gap:'1.5rem', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`anim-hidden team-card`}
              style={{ animationDelay: `${i * 0.5}s` } as React.CSSProperties}
            >
              {/* Photo area */}
              <div
                style={{ height:'280px', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', background: member.bg }}
              >
                {/* Scanline overlay on card image */}
                <div style={{
                  position:'absolute', inset:0, pointerEvents:'none', zIndex:2,
                  backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)',
                }} />

                {/* BG accent circle */}
                <div style={{
                  position:'absolute', width:'200px', height:'200px', borderRadius:'50%',
                  opacity:0.07, top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                  background: member.accent,
                }} />

                {/* Secondary faint ring */}
                <div style={{
                  position:'absolute', width:'240px', height:'240px', borderRadius:'50%',
                  opacity:0.04, top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                  border:`1px solid ${member.accent}`,
                  animation:'float-mid 10s ease-in-out infinite',
                }} />

                {/* Avatar with pulse rings */}
                <div style={{ position:'relative', zIndex:3 }}>
                  {/* Pulse ring 1 */}
                  <div style={{
                    position:'absolute',
                    top:'-18px', left:'-18px',
                    width:'116px', height:'116px',
                    borderRadius:'50%',
                    border:`1px solid ${member.accent}55`,
                    animation:'pulse-ring 3s ease-out infinite',
                    pointerEvents:'none',
                  }} />
                  {/* Pulse ring 2 */}
                  <div style={{
                    position:'absolute',
                    top:'-30px', left:'-30px',
                    width:'140px', height:'140px',
                    borderRadius:'50%',
                    border:`1px solid ${member.accent}22`,
                    animation:'pulse-ring 3s ease-out infinite 0.7s',
                    pointerEvents:'none',
                  }} />
                  {/* Avatar circle */}
                  <div style={{
                    width:'80px', height:'80px', borderRadius:'50%',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'var(--font-playfair, Georgia, serif)',
                    fontSize:'1.4rem',
                    border:`1px solid ${member.accent}55`,
                    color: member.accent,
                    background:`${member.accent}0d`,
                    position:'relative', zIndex:1,
                  }}>
                    {member.initials}
                  </div>
                </div>

                {/* Bottom name overlay */}
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  padding:'1.25rem 1.25rem 0.875rem',
                  background:'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                  zIndex:3,
                }}>
                  <p style={{
                    fontFamily:'var(--font-dm-mono, monospace)',
                    fontSize:'0.58rem', letterSpacing:'0.14em',
                    textTransform:'uppercase', marginBottom:'0.2rem',
                    color: member.accent,
                    animation:'glitch-badge 8s steps(1) infinite',
                  }}>
                    {member.role}
                  </p>
                  <h3 style={{
                    fontFamily:'var(--font-playfair, Georgia, serif)',
                    fontSize:'1.3rem', fontWeight:400,
                    color:'#f0ece4',
                  }}>
                    {member.name}
                  </h3>
                </div>
              </div>

              {/* Bio */}
              <div style={{ padding:'1.25rem', background:'rgba(240,236,228,0.02)', position:'relative', zIndex:1 }}>
                <p style={{
                  fontFamily:'var(--font-dm-sans, sans-serif)',
                  fontSize:'0.82rem', color:'rgba(240,236,228,0.45)',
                  lineHeight:1.7, fontWeight:300,
                }}>
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}