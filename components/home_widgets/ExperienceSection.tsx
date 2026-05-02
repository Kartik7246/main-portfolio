'use client'

import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    period: 'Aug 2024 — Present',
    title: 'Automation Specialist',
    company: '',
    description:
      'Working on automating workflows and application processes, improving system efficiency, integrating APIs, and building scalable automation solutions across web and mobile systems.',
    tags: ['Automation', 'API Integration', 'Workflows', 'System Optimization'],
  },
  {
    period: '2024 — Present',
    title: 'Freelance Backend Developer',
    company: '',
    description:
      'Worked as a freelance backend developer building scalable APIs and backend systems using Go Lang. Focused on high-performance REST APIs, database design, authentication systems, and integrating backend services for web and mobile applications.',
    tags: ['Go Lang', 'REST APIs', 'Backend Development', 'MongoDB', 'System Design'],
  },
  {
    period: 'Nov 2024 — Present',
    title: 'Flutter App Developer',
    company: '',
    description:
      'Responsible for building scalable mobile applications, implementing advanced features such as payment gateway integrations, deep linking, analytics tools, and maintaining high code quality and performance standards.',
    tags: ['Flutter', 'Firebase', 'Payments', 'Deep Linking', 'Analytics'],
  },
  {
    period: '2022 — 2024',
    title: 'Freelance Full-Stack Developer',
    company: '',
    description:
      'Worked as a freelance developer handling both frontend and backend development. Built web applications using React and Next.js and developed backend services using Express.js, focusing on REST APIs, authentication, and database integration.',
    tags: ['React', 'Next.js', 'Express.js', 'MongoDB', 'REST APIs'],
  },
]

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const glitchBarsRef = useRef<HTMLDivElement>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [glitchIdx, setGlitchIdx] = useState<number | null>(null)
  const glitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.anim-hidden')
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add('anim-visible'), i * 120)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const spawnBars = () => {
      const container = glitchBarsRef.current
      if (!container) return
      const count = Math.floor(Math.random() * 3) + 1
      for (let i = 0; i < count; i++) {
        const bar = document.createElement('div')
        const top = Math.random() * 100
        const height = Math.random() * 2 + 1
        const duration = Math.random() * 60 + 30
        const colors = ['rgba(0,255,255,0.06)', 'rgba(255,0,68,0.05)', 'rgba(201,169,110,0.07)']
        bar.style.cssText = `position:absolute;left:0;right:0;top:${top}%;height:${height}px;background:${colors[Math.floor(Math.random() * colors.length)]};pointer-events:none;`
        container.appendChild(bar)
        setTimeout(() => bar.remove(), duration)
      }
      glitchTimerRef.current = setTimeout(spawnBars, Math.random() * 4000 + 2000)
    }
    const t = setTimeout(spawnBars, 3000)
    return () => { clearTimeout(t); if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current) }
  }, [])

  useEffect(() => {
    const scheduleGlitch = () => {
      const delay = 4000 + Math.random() * 5000
      glitchTimerRef.current = setTimeout(() => {
        const idx = Math.floor(Math.random() * experiences.length)
        setGlitchIdx(idx)
        setTimeout(() => setGlitchIdx(null), 350)
        scheduleGlitch()
      }, delay)
    }
    scheduleGlitch()
    return () => { if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current) }
  }, [])

  return (
    <>
      <style>{`
        @keyframes exp-glitch-1 {
          0%,100% { clip-path:inset(0 0 100% 0); transform:translateX(0); opacity:0; }
          15% { clip-path:inset(10% 0 80% 0); transform:translateX(-5px); opacity:0.6; }
          35% { clip-path:inset(45% 0 45% 0); transform:translateX(5px); opacity:0.5; }
          65% { clip-path:inset(75% 0 15% 0); transform:translateX(-4px); opacity:0.7; }
          85% { clip-path:inset(25% 0 65% 0); transform:translateX(4px); opacity:0.5; }
        }
        @keyframes exp-glitch-2 {
          0%,100% { clip-path:inset(0 0 100% 0); transform:translateX(0); opacity:0; }
          20% { clip-path:inset(55% 0 35% 0); transform:translateX(7px); opacity:0.4; }
          50% { clip-path:inset(20% 0 70% 0); transform:translateX(-7px); opacity:0.5; }
          80% { clip-path:inset(60% 0 25% 0); transform:translateX(6px); opacity:0.4; }
        }
        @keyframes scanline-sweep {
          0% { transform:translateY(-5px); opacity:0; }
          5% { opacity:1; }
          95% { opacity:1; }
          100% { transform:translateY(100%); opacity:0; }
        }
        @keyframes noise-shift {
          0%,100% { transform:translate(0,0); }
          20% { transform:translate(-1px,2px); }
          40% { transform:translate(2px,-1px); }
          60% { transform:translate(-2px,1px); }
          80% { transform:translate(1px,-2px); }
        }
        @keyframes dot-pulse {
          0%,100% { transform:scale(1); box-shadow:0 0 0 0 rgba(201,169,110,0.4); }
          50% { transform:scale(1.1); box-shadow:0 0 0 6px rgba(201,169,110,0); }
        }
        @keyframes float-slow {
          0%,100% { transform:translateY(0) scale(1); }
          50% { transform:translateY(-20px) scale(1.03); }
        }
        @keyframes pulse-ring {
          0% { transform:scale(0.92); opacity:0.9; }
          70% { transform:scale(1.18); opacity:0; }
          100% { transform:scale(0.92); opacity:0; }
        }
        @keyframes spin-slow {
          from { transform:rotate(0deg); }
          to { transform:rotate(360deg); }
        }
        @keyframes rgb-shift {
          0%,100% { text-shadow:none; }
          25% { text-shadow:-2px 0 #00ffff44,2px 0 #ff004466; }
          75% { text-shadow:2px 0 #00ffff33,-2px 0 #ff004433; }
        }
        @keyframes tag-glow {
          0%,100% { box-shadow:none; }
          50% { box-shadow:0 0 10px rgba(201,169,110,0.2); }
        }
        .anim-hidden { opacity:0; transform:translateY(24px); }
        .anim-visible {
          opacity:1; transform:translateY(0);
          transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .anim-delay-100 { transition-delay:0.1s; }
        .anim-delay-200 { transition-delay:0.2s; }
        .anim-delay-300 { transition-delay:0.3s; }
        .anim-delay-400 { transition-delay:0.4s; }
        .anim-delay-500 { transition-delay:0.5s; }
        .anim-delay-600 { transition-delay:0.6s; }
        .exp-card {
          transition:all 0.35s cubic-bezier(0.16,1,0.3,1);
          position:relative;
        }
        .exp-card:hover {
          transform:translateX(6px);
        }
        .exp-card:hover .exp-company {
          color:#edd997 !important;
          animation:rgb-shift 4s ease-in-out infinite;
        }
        .exp-card:hover .exp-title {
          color:#f0ece4 !important;
        }
        .exp-tag {
          transition:all 0.2s;
        }
        .exp-tag:hover {
          border-color:rgba(201,169,110,0.5) !important;
          background:rgba(201,169,110,0.08) !important;
          color:rgba(201,169,110,0.9) !important;
          animation:tag-glow 2s ease-in-out infinite;
        }
        .exp-glitch-1 {
          position:absolute; inset:0; pointer-events:none;
          color:#00ffff; animation:exp-glitch-1 0.35s steps(1) both; z-index:2;
        }
        .exp-glitch-2 {
          position:absolute; inset:0; pointer-events:none;
          color:#ff0044; animation:exp-glitch-2 0.35s steps(1) both 0.05s; z-index:3;
        }

        /* ── Responsive layout ── */
        .exp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .exp-sticky-header {
          position: sticky;
          top: 5rem;
        }
        @media (max-width: 768px) {
          .exp-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .exp-sticky-header {
            position: static;
          }
          .exp-section-padding {
            padding: 5rem 1.25rem !important;
          }
          .exp-h2 {
            font-size: clamp(1.8rem, 8vw, 2.5rem) !important;
          }
        }
      `}</style>

      <section
        id="experience"
        ref={ref}
        className="exp-section-padding"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '8rem 2.5rem',
          position: 'relative',
          overflow: 'hidden',
          background: '#080807',
        }}
      >
        {/* Scanline sweep */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.25),transparent)', animation: 'scanline-sweep 8s linear infinite 2s' }} />
        </div>

        {/* Static scanlines */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)' }} />

        {/* BG Grid */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: 'linear-gradient(rgba(201,169,110,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.022) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

        {/* Grain */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.35, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`, animation: 'noise-shift 0.2s steps(1) infinite' }} />

        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '-10%', right: '20%', width: '500px', height: '500px', borderRadius: '50%', pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(circle,rgba(201,169,110,0.06) 0%,transparent 65%)', animation: 'float-slow 16s ease-in-out infinite' }} />

        {/* Rotating ring */}
        <div style={{ position: 'absolute', bottom: '-5%', left: '-4%', width: '320px', height: '320px', pointerEvents: 'none', zIndex: 0, opacity: 0.1, animation: 'spin-slow 55s linear infinite reverse' }}>
          <svg viewBox="0 0 320 320" fill="none">
            <circle cx="160" cy="160" r="155" stroke="#c9a96e" strokeWidth="0.5" strokeDasharray="4 14" />
            <circle cx="160" cy="160" r="110" stroke="#00ffff" strokeWidth="0.3" strokeDasharray="2 18" />
          </svg>
        </div>

        {/* Ghost watermark */}
        <div style={{ position: 'absolute', bottom: '-1rem', right: '1rem', fontFamily: 'var(--font-playfair,Georgia,serif)', fontSize: '28vw', fontWeight: 700, lineHeight: 1, color: 'rgba(201,169,110,0.018)', pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.06em', zIndex: 0 }}>05</div>

        {/* Glitch bars */}
        <div ref={glitchBarsRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 3 }}>
          <div className="exp-grid">

            {/* Left: sticky header */}
            <div className="exp-sticky-header">
              <div className="anim-hidden" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#c9a96e', animation: 'pulse-ring 2.2s ease-out infinite' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c9a96e', boxShadow: '0 0 8px #c9a96e' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-dm-mono,monospace)', fontSize: '0.6rem', color: 'rgba(201,169,110,0.65)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>05 — Experience</span>
              </div>

              <h2 className="anim-hidden anim-delay-100 exp-h2" style={{ fontFamily: 'var(--font-playfair,Georgia,serif)', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.5rem', fontSize: 'clamp(2rem,4vw,3rem)', color: '#f0ece4', letterSpacing: '-0.02em' }}>
                A short{' '}
                <em style={{ fontStyle: 'italic', background: 'linear-gradient(130deg,#c9a96e 0%,#edd997 50%,#b8904a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>working</em>
                <br />history.
              </h2>

              <p className="anim-hidden anim-delay-200" style={{ fontSize: '0.85rem', color: 'rgba(240,236,228,0.4)', lineHeight: 1.8, maxWidth: '320px', fontFamily: 'var(--font-dm-sans,sans-serif)' }}>
                In-house teams, agencies and solo engagements — each one taught me something I carry forward.
              </p>
            </div>

            {/* Right: timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {experiences.map((exp, i) => (
                <div
                  key={exp.title}
                  className={`anim-hidden anim-delay-${(i + 2) * 100} exp-card`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{ display: 'flex', gap: '1.5rem' }}
                >
                  {/* Timeline dot + line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.3rem' }}>
                    <div style={{
                      width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
                      border: `1px solid ${i === 0 ? '#c9a96e' : 'rgba(255,255,255,0.12)'}`,
                      background: i === 0 ? '#c9a96e' : 'transparent',
                      boxShadow: i === 0 ? '0 0 12px rgba(201,169,110,0.5)' : 'none',
                      animation: i === 0 ? 'dot-pulse 3s ease-in-out infinite' : 'none',
                      transition: 'all 0.3s',
                    }} />
                    {i < experiences.length - 1 && (
                      <div style={{ width: '1px', flex: 1, background: hoveredIdx === i ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.06)', marginTop: '0.5rem', minHeight: '60px', transition: 'background 0.3s' }} />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    {glitchIdx === i && (
                      <>
                        <div className="exp-glitch-1"><p style={{ fontFamily: 'var(--font-playfair,Georgia,serif)', fontSize: '1.4rem' }}>{exp.title}</p></div>
                        <div className="exp-glitch-2"><p style={{ fontFamily: 'var(--font-playfair,Georgia,serif)', fontSize: '1.4rem' }}>{exp.title}</p></div>
                      </>
                    )}

                    <p style={{ fontFamily: 'var(--font-dm-mono,monospace)', fontSize: '0.62rem', color: 'rgba(201,169,110,0.5)', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>
                      {exp.period}
                    </p>
                    <h3 className="exp-title" style={{ fontFamily: 'var(--font-playfair,Georgia,serif)', fontSize: '1.4rem', fontWeight: 400, color: hoveredIdx === i ? '#f0ece4' : 'rgba(240,236,228,0.85)', marginBottom: '0.3rem', transition: 'color 0.3s', letterSpacing: '-0.01em' }}>
                      {exp.title}
                    </h3>
                    <p className="exp-company" style={{ fontSize: '0.8rem', color: hoveredIdx === i ? '#edd997' : '#c9a96e', marginBottom: '0.75rem', fontFamily: 'var(--font-dm-sans,sans-serif)', transition: 'color 0.3s' }}>
                      {exp.company}
                    </p>

                    <div style={{ height: '1px', marginBottom: '0.75rem', background: hoveredIdx === i ? 'linear-gradient(90deg,rgba(201,169,110,0.4),transparent)' : 'rgba(255,255,255,0.04)', transition: 'background 0.4s' }} />

                    <p style={{ fontSize: '0.84rem', color: 'rgba(240,236,228,0.45)', lineHeight: 1.7, marginBottom: '1rem', fontFamily: 'var(--font-dm-sans,sans-serif)' }}>
                      {exp.description}
                    </p>

                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {exp.tags.map((tag) => (
                        <span key={tag} className="exp-tag" style={{ padding: '0.25rem 0.75rem', border: '1px solid rgba(201,169,110,0.15)', borderRadius: '9999px', fontSize: '0.7rem', fontFamily: 'var(--font-dm-mono,monospace)', color: 'rgba(201,169,110,0.55)', background: 'rgba(201,169,110,0.03)', letterSpacing: '0.05em', cursor: 'default' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}