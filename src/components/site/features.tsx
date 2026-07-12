'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Boxes, Clapperboard, Code2, Layers, LineChart, Wand2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Feature = {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  tag: string
  className: string
  accent: 'lime' | 'coral' | 'magenta'
}

const features: Feature[] = [
  {
    title: 'Kinetic brand identities',
    description:
      'Logo systems that flex, breathe, and adapt across surfaces — built on motion principles that scale from a 16px favicon to a 16-meter installation.',
    icon: Wand2,
    tag: 'Identity',
    className: 'md:col-span-2 md:row-span-2',
    accent: 'lime',
  },
  {
    title: 'Product motion systems',
    description:
      'Micro-interactions, transitions, and empty-states that turn an interface into a conversation.',
    icon: Layers,
    tag: 'Product',
    className: '',
    accent: 'coral',
  },
  {
    title: 'Cinematic launch films',
    description:
      'Director-led films that translate strategy into 60 seconds of pure want.',
    icon: Clapperboard,
    tag: 'Film',
    className: '',
    accent: 'magenta',
  },
  {
    title: 'Interactive web experiences',
    description:
      'Scroll-driven narratives, WebGL scenes, and GSAP-grade websites that move people — and metrics.',
    icon: Code2,
    tag: 'Web',
    className: 'md:col-span-2',
    accent: 'lime',
  },
  {
    title: '3D & generative design',
    description:
      'Procedural worlds, parametric type, and real-time visuals that make a launch feel infinite.',
    icon: Boxes,
    tag: '3D',
    className: '',
    accent: 'coral',
  },
  {
    title: 'Performance, measured',
    description:
      'Every shipped frame is instrumented — Core Web Vitals, engagement lifts, and brand recall studied in the wild.',
    icon: LineChart,
    tag: 'Insights',
    className: '',
    accent: 'magenta',
  },
]

const accentMap = {
  lime: 'var(--lime-glow)',
  coral: 'var(--coral)',
  magenta: 'var(--magenta)',
} as const

export function Features() {
  return (
    <section id="studio" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span
                className="h-px w-8"
                style={{ background: 'var(--coral)' }}
              />
              What we make
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-balance"
            >
              A studio built for the
              <span className="text-gradient-warm"> kinetic age</span>.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-sm text-sm sm:text-base text-muted-foreground text-balance"
          >
            Six disciplines, one obsessive team. We don&apos;t hand off — we design,
            animate, ship, and measure together, end to end.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(220px,auto)]">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon
  const accent = accentMap[feature.accent]

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-6 sm:p-7 transition-colors hover:border-border',
        feature.className,
      )}
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, color-mix(in oklch, ${accent} 18%, transparent), transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/70"
            style={{ color: accent }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {feature.tag}
          </span>
        </div>

        <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold tracking-tight">
          {feature.title}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed text-balance">
          {feature.description}
        </p>

        <div className="mt-auto pt-6">
          <span
            className="inline-flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: accent }}
          >
            Learn more
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}
