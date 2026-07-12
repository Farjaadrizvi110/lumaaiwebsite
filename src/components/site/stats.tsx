'use client'

import * as React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type Stat = {
  value: number
  suffix: string
  prefix?: string
  label: string
  sub: string
  accent: 'lime' | 'coral' | 'magenta'
}

const stats: Stat[] = [
  {
    value: 180,
    suffix: '+',
    label: 'Shipped projects',
    sub: 'Across identity, product, film, and space.',
    accent: 'lime',
  },
  {
    value: 37,
    suffix: '',
    label: 'Industry awards',
    sub: 'Awwwards, FWA, D&AD, ADC, Type Directors Club.',
    accent: 'coral',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Client retention',
    sub: 'Of clients engage us for a second project within 12 months.',
    accent: 'magenta',
  },
  {
    value: 4.2,
    suffix: 'M',
    prefix: '$',
    label: 'Funded by alumni',
    sub: 'Our clients have raised over $4.2B in the last 5 years.',
    accent: 'lime',
  },
]

const accentMap = {
  lime: 'var(--lime-glow)',
  coral: 'var(--coral)',
  magenta: 'var(--magenta)',
} as const

export function Stats() {
  const sectionRef = React.useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.stat-block').forEach((block) => {
        const el = block.querySelector('.stat-value') as HTMLElement
        const target = Number(el.dataset.value)
        const decimals = String(el.dataset.value).split('.')[1]?.length ?? 0
        const obj = { v: 0 }

        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
          },
          onUpdate: () => {
            el.textContent =
              (el.dataset.prefix ?? '') +
              obj.v.toLocaleString('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              }) +
              (el.dataset.suffix ?? '')
          },
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 border-t border-border/60 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-14">
          {stats.map((s) => (
            <div key={s.label} className="stat-block">
              <div
                className="font-display text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight tabular-nums"
                style={{ color: accentMap[s.accent] }}
              >
                <span
                  className="stat-value"
                  data-value={s.value}
                  data-suffix={s.suffix}
                  data-prefix={s.prefix ?? ''}
                >
                  {s.prefix ?? ''}0{s.suffix}
                </span>
              </div>
              <div className="mt-3 text-lg font-medium">{s.label}</div>
              <p className="mt-1.5 text-sm text-muted-foreground max-w-sm text-balance">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
