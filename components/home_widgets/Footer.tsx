'use client'

export default function Footer() {
  return (
    <footer className="px-10 py-10 border-t border-[var(--border)] flex justify-between items-center flex-wrap gap-4">
      <a
        href="#"
        className="flex items-center gap-2 no-underline text-[var(--body)] font-dm-sans text-[0.85rem]"
      >
        <span className="text-[var(--accent)]">●</span>
        kartik.
      </a>

      

      <div className="flex gap-6">
        {['GitHub', 'LinkedIn', 'Twitter'].map((link) => (
          <a
            key={link}
            href="#"
            className="font-dm-sans text-[0.78rem] text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--text)]"
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  )
}