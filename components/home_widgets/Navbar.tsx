'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'About', href: '#about', num: '01' },
  { label: 'Stack', href: '#stack', num: '02' },
  // { label: 'Work', href: '#work', num: '03' },
  { label: 'Experience', href: '#experience', num: '04' },
  { label: 'Team', href: '#team', num: '05' },
  { label: 'Contact', href: '#contact', num: '06' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-[100] px-10 h-[60px] flex items-center justify-between transition-all duration-300',
        scrolled
          ? 'border-b border-[#1e1e1e] bg-[rgba(10,10,10,0.95)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      {/* Logo */}
      <a
        href="#"
        className="flex items-center gap-2 no-underline text-[var(--text)] font-dm-sans font-medium text-[0.95rem] tracking-[0.02em]"
      >
        <span className="text-[var(--accent)] text-[1.1rem]">●</span>
        kartik.
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="no-underline text-[var(--body)] text-[0.8rem] font-dm-sans flex items-center gap-[0.4rem] transition-colors duration-200 hover:text-[var(--text)]"
          >
            <span className="font-dm-mono text-[0.65rem] text-[var(--muted)]">
              {link.num}
            </span>
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className="inline-flex items-center px-5 py-2 border border-[var(--text)] rounded-full text-[var(--text)] text-[0.8rem] font-dm-sans font-medium no-underline transition-all duration-200 hover:bg-[var(--text)] hover:text-[var(--bg)]"
      >
        Let&apos;s talk
      </a>
    </nav>
  )
}