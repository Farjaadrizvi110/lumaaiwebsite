'use client'

import * as React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function CTA() {
  const sectionRef = React.useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.cta-headline span',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        },
      )

      // Subtle floating orbs
      gsap.to('.cta-orb', {
        y: '+=20',
        x: '+=10',
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.6, from: 'random' },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 sm:py-40 border-t border-border/60 overflow-hidden"
    >
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="cta-orb absolute top-1/4 left-1/4 h-72 w-72 rounded-full blur-[100px] opacity-25"
          style={{ background: 'var(--lime-glow)' }}
        />
        <div
          className="cta-orb absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full blur-[100px] opacity-25"
          style={{ background: 'var(--magenta)' }}
        />
        <div
          className="cta-orb absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-20"
          style={{ background: 'var(--coral)' }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-muted-foreground mb-8"
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: 'var(--lime-glow)' }}
          />
          2 collaboration slots open for Q3
        </motion.span>

        <h2 className="cta-headline font-display font-semibold tracking-[-0.04em] text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95]">
          <span className="block overflow-hidden">
            <span className="inline-block">Let&apos;s make</span>
          </span>
          <span className="block overflow-hidden">
            <span className="inline-block text-gradient-lime italic">something</span>
          </span>
          <span className="block overflow-hidden">
            <span className="inline-block">that moves.</span>
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 mx-auto max-w-xl text-base sm:text-lg text-muted-foreground text-balance"
        >
          Tell us about the brand, the moment, and the metric. We&apos;ll come back
          within two business days with a first read.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="mailto:hello@luma.studio"
            className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-background overflow-hidden"
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: 'var(--lime-glow)' }}
            />
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300"
              style={{ background: 'var(--lime-glow)' }}
            />
            <span className="relative z-10">hello@luma.studio</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 px-7 py-3.5 text-sm font-medium hover:bg-accent/50 transition-colors"
          >
            Book a 20-minute intro call
          </a>
        </motion.div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
          <span>Remote-first · HQ in Lisbon</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>Team of 14, 6 timezones</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>Reply within 2 business days</span>
        </div>
      </div>
    </section>
  )
}
