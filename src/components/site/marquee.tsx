'use client'

import * as React from 'react'

const items = [
  'NEBULA',
  'Halcyon',
  'ORBIT/03',
  'Studio Vela',
  'PARAGON',
  'Northwind',
  'ECHO LABS',
  'Voltaire',
  'MERIDIAN',
  'Kessler & Co.',
]

export function Marquee() {
  return (
    <section
      aria-label="Trusted by"
      className="relative py-12 border-y border-border/60 overflow-hidden"
    >
      <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            className="flex items-center gap-12 px-6"
            aria-hidden={dup === 1}
          >
            {items.map((item, i) => (
              <div
                key={`${dup}-${i}`}
                className="flex items-center gap-12 shrink-0"
              >
                <span className="font-display text-2xl sm:text-3xl font-medium text-muted-foreground/60 hover:text-foreground transition-colors whitespace-nowrap">
                  {item}
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: 'var(--coral)' }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
