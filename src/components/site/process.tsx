'use client'

import * as React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const steps = [
  {
    n: '01',
    title: 'Discover',
    duration: '1–2 weeks',
    body:
      'We embed with your team, audit what exists, and pressure-test the brief. Output: a shared motion strategy, success metrics, and a production runway calibrated to your launch calendar.',
  },
  {
    n: '02',
    title: 'Design',
    duration: '3–5 weeks',
    body:
      'Concept routes, then a kinetic identity system — logo behavior, type, color in motion, and the signature gestures that make the work unmistakably yours.',
  },
  {
    n: '03',
    title: 'Produce',
    duration: '4–8 weeks',
    body:
      'Animation, code, and film in parallel. Daily reviews, weekly playbacks, and a shared Figma + GitHub spine so nothing gets lost in translation.',
  },
  {
    n: '04',
    title: 'Ship & measure',
    duration: 'Ongoing',
    body:
      'Launch support, performance instrumentation, and a 30-day post-launch retrospective. We stay close — most clients retain us across the next quarter.',
  },
]

export function Process() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const lineRef = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: true,
          },
        },
      )

      gsap.utils.toArray<HTMLElement>('.process-step').forEach((step) => {
        gsap.from(step.querySelector('.step-content'), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 75%',
          },
        })
        gsap.fromTo(
          step.querySelector('.step-dot'),
          { scale: 0.6, backgroundColor: 'var(--card)' },
          {
            scale: 1,
            backgroundColor: 'var(--lime-glow)',
            scrollTrigger: {
              trigger: step,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 sm:py-32 border-t border-border/60"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="h-px w-8" style={{ background: 'var(--magenta)' }} />
            How we work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-balance"
          >
            A process built for
            <span className="text-gradient-warm"> momentum</span>, not meetings.
          </motion.h2>
        </div>

        <div className="mt-16 relative">
          {/* Timeline rail */}
          <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-border/80" />
          <div
            ref={lineRef}
            className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px origin-top"
            style={{ background: 'linear-gradient(180deg, var(--lime-glow), var(--coral), var(--magenta))' }}
          />

          <ol className="space-y-12 sm:space-y-16">
            {steps.map((s) => (
              <li
                key={s.n}
                className="process-step relative pl-10 sm:pl-16 grid sm:grid-cols-[180px_1fr] gap-3 sm:gap-10"
              >
                <div className="absolute left-0 top-1.5">
                  <span
                    className="step-dot block h-[15px] w-[15px] sm:h-[23px] sm:w-[23px] rounded-full border-2 border-background shadow-[0_0_0_4px_var(--background)]"
                  />
                </div>
                <div className="step-content">
                  <div className="font-display text-5xl sm:text-6xl font-semibold tracking-tight text-muted-foreground/40">
                    {s.n}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {s.duration}
                  </div>
                </div>
                <div className="step-content">
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-xl text-balance">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
