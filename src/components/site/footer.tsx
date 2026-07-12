'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

const groups = [
  {
    title: 'Studio',
    links: [
      { label: 'Work', href: '#work' },
      { label: 'Process', href: '#process' },
      { label: 'Voices', href: '#voices' },
      { label: 'About', href: '#studio' },
    ],
  },
  {
    title: 'Disciplines',
    links: [
      { label: 'Identity', href: '#studio' },
      { label: 'Product motion', href: '#studio' },
      { label: 'Film', href: '#studio' },
      { label: 'Interactive web', href: '#studio' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'hello@luma.studio', href: 'mailto:hello@luma.studio' },
      { label: 'Instagram', href: '#' },
      { label: 'Vimeo', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-8">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-6">
            <div className="flex items-center gap-2.5">
              <div className="relative h-7 w-7">
                <div
                  className="absolute inset-0 rounded-md"
                  style={{ background: 'var(--lime-glow)' }}
                />
                <div className="absolute inset-[3px] rounded-sm bg-background" />
                <div
                  className="absolute inset-[6px] rounded-[2px]"
                  style={{ background: 'var(--coral)' }}
                />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">
                LUMA
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground leading-relaxed text-balance">
              An independent motion design studio crafting kinetic identities for
              ambitious brands. Designed in Lisbon, shipped worldwide.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1.5 text-xs text-muted-foreground">
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--lime-glow)' }}
              />
              Available for Q3 2026 collaborations
            </div>
          </div>

          {/* Link groups */}
          {groups.map((g) => (
            <div key={g.title} className="md:col-span-2">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {g.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      <span className="relative">
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Massive wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-24 border-t border-border/60 pt-10"
        >
          <div
            className="font-display font-semibold tracking-[-0.04em] leading-none text-[clamp(4rem,18vw,16rem)] text-gradient-lime select-none"
            aria-hidden
          >
            LUMA
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} LUMA Studio. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#top" className="hover:text-foreground transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
