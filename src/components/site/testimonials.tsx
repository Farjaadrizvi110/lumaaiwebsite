'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
  accent: 'lime' | 'coral' | 'magenta'
}

const testimonials: Testimonial[] = [
  {
    quote:
      'LUMA didn\'t just deliver a motion system — they handed us a language. Eighteen months in, every product team is still building on the gestures they defined in week three.',
    name: 'Mara Voss',
    role: 'VP Design, Halcyon Health',
    initials: 'MV',
    accent: 'coral',
  },
  {
    quote:
      'The most senior creative team I\'ve worked with in 20 years. They argued with our brief, rewrote our launch, and shipped two weeks early. The film has 14M organic views.',
    name: 'Daniel Okonkwo',
    role: 'CMO, Nebula Aerospace',
    initials: 'DO',
    accent: 'lime',
  },
  {
    quote:
      'We came in for a website and left with a brand. LUMA connected motion, identity, and product in a way I didn\'t know was possible at our scale.',
    name: 'Yuki Tanaka',
    role: 'Founder, Studio Vela',
    initials: 'YT',
    accent: 'magenta',
  },
  {
    quote:
      'Every deadline hit. Every review sharper than the last. And the post-launch instrumentation caught a 22% engagement lift we would have missed entirely.',
    name: 'Priya Raman',
    role: 'Head of Product, Echo Labs',
    initials: 'PR',
    accent: 'lime',
  },
]

const accentMap = {
  lime: 'var(--lime-glow)',
  coral: 'var(--coral)',
  magenta: 'var(--magenta)',
} as const

export function Testimonials() {
  const [i, setI] = React.useState(0)
  const [direction, setDirection] = React.useState(1)

  const go = React.useCallback((next: number) => {
    setDirection(next > i ? 1 : -1)
    setI((next + testimonials.length) % testimonials.length)
  }, [i])

  const t = testimonials[i]

  return (
    <section id="voices" className="relative py-24 sm:py-32 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-8" style={{ background: 'var(--coral)' }} />
              Voices
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance max-w-xl">
              The teams we&apos;ve moved with.
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
              aria-label="Previous testimonial"
              onClick={() => go(i - 1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
              aria-label="Next testimonial"
              onClick={() => go(i + 1)}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={i}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <Quote
                className="h-10 w-10 mb-6"
                style={{ color: accentMap[t.accent] }}
                aria-hidden
              />
              <p className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.25] text-balance">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full font-display text-sm font-semibold border border-border/70"
                  style={{
                    color: accentMap[t.accent],
                    background: `color-mix(in oklch, ${accentMap[t.accent]} 14%, var(--card))`,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className="group relative h-1.5 rounded-full transition-all duration-300"
              style={{ width: idx === i ? 32 : 12 }}
            >
              <span className="absolute inset-0 rounded-full bg-border" />
              <span
                className="absolute inset-0 rounded-full origin-left transition-transform duration-300"
                style={{
                  background: accentMap[t.accent],
                  transform: idx === i ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
