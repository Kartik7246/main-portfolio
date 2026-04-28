'use client'

import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const projectTypes = ['Web app (Next.js)', 'Mobile app (Flutter)', 'Both', 'Something else']

// Paste your IDs from emailjs.com dashboard
const EMAILJS_SERVICE_ID  = 'service_i8h4hb7'
const EMAILJS_TEMPLATE_ID = 'template_5teyq9a'
const EMAILJS_PUBLIC_KEY  = 'bKwp_SEuABGJsZby3'

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const glitchBarsRef = useRef<HTMLDivElement>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', budget: '', brief: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  // Glitch bar bursts
  useEffect(() => {
    const spawnBars = () => {
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
      glitchTimerRef.current = setTimeout(spawnBars, Math.random() * 3000 + 1000)
    }
    const t = setTimeout(spawnBars, 2500)
    return () => {
      clearTimeout(t)
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current)
    }
  }, [])

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return
    setSending(true)
    setError(null)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    formData.name,
          from_email:   formData.email,
          budget:       formData.budget || 'Not specified',
          project_type: selectedType   || 'Not specified',
          message:      formData.brief  || 'No brief provided',
        },
        EMAILJS_PUBLIC_KEY
      )
      setSubmitted(true)
    } catch (err) {
      setError('Failed to send. Please try again or email directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes float-slow {
          0%,100% { transform:translateY(0) scale(1); }
          50% { transform:translateY(-20px) scale(1.03); }
        }
        @keyframes float-dot {
          0%,100% { transform:translateY(0) scale(1); }
          33% { transform:translateY(-14px) scale(0.9); }
          66% { transform:translateY(9px) scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform:rotate(0deg); }
          to { transform:rotate(360deg); }
        }
        @keyframes spin-slow-rev {
          from { transform:rotate(360deg); }
          to { transform:rotate(0deg); }
        }
        @keyframes pulse-ring {
          0% { transform:scale(0.92); opacity:0.9; }
          70% { transform:scale(1.18); opacity:0; }
          100% { transform:scale(0.92); opacity:0; }
        }
        @keyframes scanline-sweep {
          0% { transform:translateY(-5px); opacity:0; }
          5% { opacity:1; }
          95% { opacity:1; }
          100% { transform:translateY(100%); opacity:0; }
        }
        @keyframes data-stream {
          0% { transform:translateY(-100%); opacity:0; }
          5% { opacity:0.6; }
          95% { opacity:0.6; }
          100% { transform:translateY(100%); opacity:0; }
        }
        @keyframes noise-shift {
          0%,100% { transform:translate(0,0); }
          10% { transform:translate(-2px,2px); }
          20% { transform:translate(2px,-1px); }
          30% { transform:translate(-1px,3px); }
          40% { transform:translate(3px,-2px); }
          50% { transform:translate(-3px,1px); }
          60% { transform:translate(1px,-3px); }
          70% { transform:translate(-2px,2px); }
          80% { transform:translate(2px,1px); }
          90% { transform:translate(-1px,-2px); }
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
          25% { text-shadow:-3px 0 #00ffff44,3px 0 #ff004488; }
          50% { text-shadow:2px 0 #00ffff33,-2px 0 #ff004433; }
          75% { text-shadow:-2px 1px #00ffff55,2px -1px #ff004455; }
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
        @keyframes glitch-badge {
          0%,100% { transform:translateX(0); filter:none; }
          20% { transform:translateX(-2px); filter:hue-rotate(90deg); }
          40% { transform:translateX(2px); filter:hue-rotate(-90deg); }
          60% { transform:translateX(-1px); filter:none; }
        }
        @keyframes success-appear {
          0% { transform:scale(0.8) rotate(-10deg); opacity:0; }
          60% { transform:scale(1.1) rotate(5deg); opacity:1; }
          100% { transform:scale(1) rotate(0deg); opacity:1; }
        }
        @keyframes success-ring {
          0% { transform:scale(0.5); opacity:0; }
          60% { opacity:1; }
          100% { transform:scale(1.5); opacity:0; }
        }
        @keyframes input-glow {
          0%,100% { box-shadow:none; }
          50% { box-shadow:0 0 20px rgba(201,169,110,0.12); }
        }
        .anim-hidden { opacity:0; transform:translateY(24px); }
        .anim-visible {
          opacity:1; transform:translateY(0);
          transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .anim-delay-100 { transition-delay:0.1s; }
        .anim-delay-200 { transition-delay:0.2s; }
        .anim-delay-300 { transition-delay:0.3s; }
        .contact-glitch-wrap { position:relative; display:inline-block; }
        .contact-glitch-cyan {
          position:absolute; inset:0; pointer-events:none;
          color:#00ffff; animation:glitch-clip-1 5s steps(1) infinite 0.5s;
          font-style:italic;
        }
        .contact-glitch-red {
          position:absolute; inset:0; pointer-events:none;
          color:#ff0044; animation:glitch-clip-2 5s steps(1) infinite 0.65s;
          font-style:italic;
        }
        .digital-flicker { animation:digital-flicker 6s ease-in-out infinite; }
        .contact-input {
          width:100%;
          background:rgba(201,169,110,0.03);
          border:1px solid rgba(201,169,110,0.12);
          border-radius:8px;
          padding:0.75rem 1rem;
          color:#f0ece4;
          font-family:var(--font-dm-sans,sans-serif);
          font-size:0.88rem;
          outline:none;
          transition:all 0.3s;
          line-height:1.6;
          box-sizing:border-box;
        }
        .contact-input::placeholder { color:rgba(240,236,228,0.2); }
        .contact-input:focus {
          border-color:rgba(201,169,110,0.45);
          background:rgba(201,169,110,0.05);
          box-shadow:0 0 0 3px rgba(201,169,110,0.06), 0 0 20px rgba(201,169,110,0.08);
          animation:input-glow 3s ease-in-out infinite;
        }
        .submit-btn {
          display:inline-flex; align-items:center; gap:0.6rem;
          padding:0.875rem 2.25rem;
          background:linear-gradient(135deg,#c9a96e 0%,#edd997 50%,#b8904a 100%);
          color:#0d0b08; border:none; border-radius:9999px;
          font-size:0.88rem; font-weight:600;
          font-family:var(--font-dm-sans,sans-serif);
          cursor:pointer;
          transition:all 0.25s;
          position:relative; overflow:hidden;
          box-shadow:0 0 30px rgba(201,169,110,0.18);
        }
        .submit-btn::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,transparent 30%,rgba(255,255,255,0.15) 50%,transparent 70%);
          transform:translateX(-100%); transition:transform 0.4s;
        }
        .submit-btn:hover::before { transform:translateX(100%); }
        .submit-btn:hover {
          transform:translateY(-2px);
          box-shadow:0 0 50px rgba(201,169,110,0.4),0 0 100px rgba(201,169,110,0.15);
        }
        .submit-btn:active { transform:translateY(0); }
        .submit-btn:disabled { cursor:wait; }
        .submit-btn:disabled:hover { transform:none; box-shadow:0 0 30px rgba(201,169,110,0.18); }
        .type-btn {
          padding:0.4rem 1rem;
          border-radius:9999px;
          font-size:0.78rem;
          font-family:var(--font-dm-sans,sans-serif);
          cursor:pointer;
          transition:all 0.2s;
          position:relative; overflow:hidden;
        }
        .type-btn::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,transparent 30%,rgba(255,255,255,0.07) 50%,transparent 70%);
          transform:translateX(-100%); transition:transform 0.4s;
        }
        .type-btn:hover::before { transform:translateX(100%); }
        .type-btn:not(.active):hover {
          border-color:rgba(201,169,110,0.35) !important;
          color:rgba(201,169,110,0.8) !important;
          background:rgba(201,169,110,0.05) !important;
        }
        .icon-circle {
          width:38px; height:38px; border-radius:50%;
          border:1px solid rgba(201,169,110,0.15);
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; font-size:0.9rem;
          transition:all 0.3s;
          background:rgba(201,169,110,0.03);
        }
        .icon-circle:hover {
          border-color:rgba(201,169,110,0.4);
          background:rgba(201,169,110,0.06);
          box-shadow:0 0 15px rgba(201,169,110,0.1);
          transform:scale(1.05);
        }
        .status-badge {
          padding:1rem 1.25rem;
          border:1px solid rgba(201,169,110,0.1);
          border-radius:10px;
          background:rgba(201,169,110,0.02);
          display:inline-flex; align-items:center; gap:0.75rem;
          animation:glitch-badge 11s steps(1) infinite;
          transition:border-color 0.3s, box-shadow 0.3s;
        }
        .status-badge:hover {
          border-color:rgba(201,169,110,0.25);
          box-shadow:0 0 20px rgba(201,169,110,0.06);
        }
        .error-msg {
          font-family:var(--font-dm-sans,sans-serif);
          font-size:0.8rem;
          color:#ff6b6b;
          margin-bottom:0.5rem;
          padding:0.6rem 0.875rem;
          border:1px solid rgba(255,107,107,0.2);
          border-radius:6px;
          background:rgba(255,107,107,0.05);
        }
      `}</style>

      <section
        id="contact"
        ref={ref}
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '8rem 2.5rem', position: 'relative', overflow: 'hidden', background: '#070706' }}
      >
        {/* Scanline sweep */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
          <div style={{
            position:'absolute', left:0, right:0, height:'2px',
            background:'linear-gradient(90deg,transparent,rgba(201,169,110,0.35),transparent)',
            animation:'scanline-sweep 10s linear infinite 1s',
          }} />
        </div>

        {/* Static scanlines */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:2, backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)' }} />

        {/* BG grid */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, backgroundImage:'linear-gradient(rgba(201,169,110,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.022) 1px,transparent 1px)', backgroundSize:'80px 80px' }} />

        {/* Grain */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, opacity:0.4, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`, animation:'noise-shift 0.15s steps(1) infinite' }} />

       
        <div style={{ position:'absolute', top:'-10%', left:'10%', width:'500px', height:'500px', borderRadius:'50%', pointerEvents:'none', zIndex:0, background:'radial-gradient(circle,rgba(201,169,110,0.07) 0%,transparent 65%)', animation:'float-slow 16s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'-15%', right:'5%', width:'400px', height:'400px', borderRadius:'50%', pointerEvents:'none', zIndex:0, background:'radial-gradient(circle,rgba(0,255,255,0.03) 0%,transparent 65%)', animation:'float-slow 12s ease-in-out infinite reverse' }} />

        {/* Data stream columns */}
        {[
          { l: '2%', d: '1s', dur: '12s' }, { l: '5%', d: '5s', dur: '15s', o: '0.07' },
          { r: '2%', d: '3s', dur: '13s' }, { r: '6%', d: '7s', dur: '17s', o: '0.07' },
        ].map((col, i) => (
          <div key={i} style={{
            position:'absolute', top:0,
            left: 'l' in col ? col.l as string : undefined,
            right: 'r' in col ? col.r as string : undefined,
            fontFamily:'monospace', fontSize:'9px',
            color:`rgba(201,169,110,${col.o ?? '0.12'})`,
            writingMode:'vertical-lr',
            animation:`data-stream ${col.dur} linear infinite`,
            animationDelay: col.d,
            pointerEvents:'none', zIndex:0, userSelect:'none', letterSpacing:'4px',
          }}>
            {i % 2 === 0 ? '10110010001011010110001010011010' : '01001101010011100110101'}
          </div>
        ))}

        {/* Floating dots */}
        <div style={{ position:'absolute', top:'12%', right:'22%', width:'5px', height:'5px', borderRadius:'50%', background:'#c9a96e', opacity:0.3, pointerEvents:'none', zIndex:0, animation:'float-dot 5s ease-in-out infinite', boxShadow:'0 0 6px #c9a96e' }} />
        <div style={{ position:'absolute', top:'60%', left:'5%', width:'3px', height:'3px', borderRadius:'50%', background:'#00ffff', opacity:0.18, pointerEvents:'none', zIndex:0, animation:'float-dot 7.5s ease-in-out infinite 2s' }} />
        <div style={{ position:'absolute', top:'40%', right:'6%', width:'4px', height:'4px', borderRadius:'50%', background:'#e8c98a', opacity:0.18, pointerEvents:'none', zIndex:0, animation:'float-dot 6s ease-in-out infinite 1s' }} />

        {/* Rotating rings */}
        <div style={{ position:'absolute', top:'-5%', right:'-3%', width:'320px', height:'320px', pointerEvents:'none', zIndex:0, opacity:0.1, animation:'spin-slow 60s linear infinite' }}>
          <svg viewBox="0 0 320 320" fill="none">
            <circle cx="160" cy="160" r="155" stroke="#c9a96e" strokeWidth="0.5" strokeDasharray="4 14" />
            <circle cx="160" cy="160" r="115" stroke="#00ffff" strokeWidth="0.4" strokeDasharray="2 18" />
            <circle cx="160" cy="160" r="78"  stroke="#c9a96e" strokeWidth="0.3" strokeDasharray="1 20" />
          </svg>
        </div>
        <div style={{ position:'absolute', top:'calc(-5% + 50px)', right:'calc(-3% + 50px)', width:'220px', height:'220px', pointerEvents:'none', zIndex:0, opacity:0.07, animation:'spin-slow-rev 35s linear infinite' }}>
          <svg viewBox="0 0 220 220" fill="none">
            <circle cx="110" cy="110" r="105" stroke="#ff0044" strokeWidth="0.4" strokeDasharray="3 12" />
          </svg>
        </div>

        {/* Ghost watermark */}
        <div style={{ position:'absolute', bottom:'-1rem', right:'1rem', fontFamily:'var(--font-playfair,Georgia,serif)', fontSize:'28vw', fontWeight:700, lineHeight:1, color:'rgba(201,169,110,0.018)', pointerEvents:'none', userSelect:'none', letterSpacing:'-0.06em', zIndex:0 }}>07</div>

        {/* Glitch bars */}
        <div ref={glitchBarsRef} style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1, overflow:'hidden' }} />

        <div style={{ maxWidth:'1100px', margin:'0 auto', position:'relative', zIndex:4 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6rem', alignItems:'start' }}>

            {/* ── Left column ── */}
            <div>
              <div className="anim-hidden" style={{ marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'1rem' }}>
                <div style={{ position:'relative', width:'8px', height:'8px', flexShrink:0 }}>
                  <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#c9a96e', animation:'pulse-ring 2.2s ease-out infinite' }} />
                  <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#c9a96e', boxShadow:'0 0 8px #c9a96e' }} />
                </div>
                <span style={{
                  fontFamily:'var(--font-dm-mono,monospace)',
                  fontSize:'0.6rem', color:'rgba(201,169,110,0.65)',
                  letterSpacing:'0.2em', textTransform:'uppercase',
                  animation:'glitch-badge 7s steps(1) infinite',
                }}>07 — Contact</span>
              </div>

              <h2
                className="anim-hidden anim-delay-100 digital-flicker"
                style={{ fontFamily:'var(--font-playfair,Georgia,serif)', fontWeight:400, lineHeight:1.1, marginBottom:'1.5rem', fontSize:'clamp(2.5rem,5vw,4rem)', color:'#f0ece4', letterSpacing:'-0.03em' }}
              >
                Let&apos;s ship{' '}
                <span className="contact-glitch-wrap">
                  <em style={{ fontStyle:'italic', background:'linear-gradient(130deg,#c9a96e 0%,#edd997 50%,#b8904a 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'rgb-shift 6s ease-in-out infinite' }}>something</em>
                  <span className="contact-glitch-cyan" aria-hidden="true">something</span>
                  <span className="contact-glitch-red"  aria-hidden="true">something</span>
                </span>
                {' '}good.
              </h2>

              <p className="anim-hidden anim-delay-200" style={{ fontSize:'0.85rem', color:'rgba(240,236,228,0.4)', lineHeight:1.8, maxWidth:'380px', marginBottom:'3rem', fontFamily:'var(--font-dm-sans,sans-serif)', fontWeight:300 }}>
                I take on a handful of engagements each quarter. If you&apos;re building a web product, a mobile app or both, I&apos;d love to hear about it.
              </p>

              {/* Contact info */}
              <div className="anim-hidden anim-delay-300" style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                  <div className="icon-circle">✉</div>
                  <div>
                    <p style={{ fontFamily:'var(--font-dm-mono,monospace)', fontSize:'0.58rem', color:'rgba(201,169,110,0.45)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.2rem' }}>Email</p>
                    <a href="mailto:kk23223511@gmail.com" style={{ fontSize:'0.9rem', color:'#f0ece4', textDecoration:'none', transition:'color 0.2s', fontFamily:'var(--font-dm-sans,sans-serif)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a96e')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#f0ece4')}>
                      kk23223511@gmail.com
                    </a>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                  <div className="icon-circle">◎</div>
                  <div>
                    <p style={{ fontFamily:'var(--font-dm-mono,monospace)', fontSize:'0.58rem', color:'rgba(201,169,110,0.45)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.2rem' }}>Studio</p>
                    <p style={{ fontSize:'0.9rem', color:'rgba(240,236,228,0.7)', fontFamily:'var(--font-dm-sans,sans-serif)' }}>Based in India — working globally</p>
                  </div>
                </div>
              </div>

              {/* Status badge */}
              <div className="anim-hidden anim-delay-300" style={{ marginTop:'2.5rem' }}>
                <div className="status-badge">
                  <div style={{ position:'relative', width:'8px', height:'8px', flexShrink:0 }}>
                    <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#4ade80', animation:'pulse-ring 2.5s ease-out infinite' }} />
                    <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 6px #4ade80' }} />
                  </div>
                  <span style={{ fontFamily:'var(--font-dm-mono,monospace)', fontSize:'0.6rem', color:'rgba(240,236,228,0.4)', letterSpacing:'0.1em' }}>OPEN TO NEW PROJECTS · Q2 2025</span>
                </div>
              </div>
            </div>

            {/* ── Right column: form ── */}
            <div className="anim-hidden anim-delay-200">
              {submitted ? (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'400px', textAlign:'center', gap:'1rem' }}>
                  <div style={{ position:'relative', marginBottom:'1rem' }}>
                    <div style={{ position:'absolute', inset:'-12px', borderRadius:'50%', border:'1px solid rgba(201,169,110,0.3)', animation:'success-ring 2s ease-out infinite' }} />
                    <div style={{ width:'64px', height:'64px', borderRadius:'50%', border:'1px solid #c9a96e', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', color:'#c9a96e', animation:'success-appear 0.6s cubic-bezier(0.16,1,0.3,1)', boxShadow:'0 0 30px rgba(201,169,110,0.2)' }}>✓</div>
                  </div>
                  <h3 style={{ fontFamily:'var(--font-playfair,Georgia,serif)', fontSize:'1.8rem', fontWeight:400, color:'#f0ece4' }}>Inquiry sent!</h3>
                  <p style={{ color:'rgba(240,236,228,0.45)', fontSize:'0.85rem', maxWidth:'280px', lineHeight:1.7, fontFamily:'var(--font-dm-sans,sans-serif)' }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:'1.75rem' }}>

                  {/* Name + Email */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem' }}>
                    {[
                      { label:'Your Name', key:'name', placeholder:'Full name', type:'text' },
                      { label:'Email', key:'email', placeholder:'you@studio.com', type:'email' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label style={{ display:'block', fontFamily:'var(--font-dm-mono,monospace)', fontSize:'0.58rem', color:focusedField === field.key ? 'rgba(201,169,110,0.7)' : 'rgba(240,236,228,0.3)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.5rem', transition:'color 0.3s' }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          onFocus={() => setFocusedField(field.key)}
                          onBlur={() => setFocusedField(null)}
                          className="contact-input"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Project type */}
                  <div>
                    <label style={{ display:'block', fontFamily:'var(--font-dm-mono,monospace)', fontSize:'0.58rem', color:'rgba(240,236,228,0.3)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.75rem' }}>
                      Project Type
                    </label>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                      {projectTypes.map((type) => (
                        <button key={type} onClick={() => setSelectedType(type === selectedType ? null : type)} className={`type-btn${selectedType === type ? ' active' : ''}`}
                          style={{
                            border:`1px solid ${selectedType === type ? '#c9a96e' : 'rgba(255,255,255,0.08)'}`,
                            background:selectedType === type ? 'rgba(201,169,110,0.12)' : 'transparent',
                            color:selectedType === type ? '#c9a96e' : 'rgba(240,236,228,0.4)',
                            boxShadow:selectedType === type ? '0 0 15px rgba(201,169,110,0.1)' : 'none',
                          }}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label style={{ display:'block', fontFamily:'var(--font-dm-mono,monospace)', fontSize:'0.58rem', color:focusedField === 'budget' ? 'rgba(201,169,110,0.7)' : 'rgba(240,236,228,0.3)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.5rem', transition:'color 0.3s' }}>
                      Budget (optional)
                    </label>
                    <input type="text" placeholder="USD 10k — 50k" value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      onFocus={() => setFocusedField('budget')} onBlur={() => setFocusedField(null)}
                      className="contact-input" />
                  </div>

                  {/* Brief */}
                  <div>
                    <label style={{ display:'block', fontFamily:'var(--font-dm-mono,monospace)', fontSize:'0.58rem', color:focusedField === 'brief' ? 'rgba(201,169,110,0.7)' : 'rgba(240,236,228,0.3)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.5rem', transition:'color 0.3s' }}>
                      Project Brief
                    </label>
                    <textarea placeholder="Tell me about the project, timeline and what success looks like."
                      value={formData.brief} rows={4}
                      onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                      onFocus={() => setFocusedField('brief')} onBlur={() => setFocusedField(null)}
                      className="contact-input" style={{ resize:'none', display:'block' }} />
                  </div>

                  {/* Error message */}
                  {error && (
                    <p className="error-msg">{error}</p>
                  )}

                  {/* Submit */}
                  <button onClick={handleSubmit} className="submit-btn" disabled={sending} style={{ opacity: sending ? 0.7 : 1, cursor: sending ? 'wait' : 'pointer' }}>
                    {sending ? 'Sending…' : 'Send inquiry'}
                    {!sending && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}