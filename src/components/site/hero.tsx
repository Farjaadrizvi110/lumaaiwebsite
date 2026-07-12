'use client'

import * as React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const headlineWords = ['Motion', 'that', 'moves', 'markets.']

export function Hero() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const auroraRef = React.useRef<HTMLDivElement>(null)

  // Magnetic button
  const btnRef = React.useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 220, damping: 18 })
  const sy = useSpring(my, { stiffness: 220, damping: 18 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return
    const r = btnRef.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    mx.set((e.clientX - cx) * 0.35)
    my.set((e.clientY - cy) * 0.35)
  }
  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  // Parallax for aurora based on pointer
  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!auroraRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      auroraRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-eyebrow', { y: 14, opacity: 0, duration: 0.6 })
        .from(
          '.hero-word',
          {
            yPercent: 110,
            opacity: 0,
            rotate: 4,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power4.out',
          },
          '-=0.2',
        )
        .from(
          '.hero-sub',
          { y: 20, opacity: 0, duration: 0.7 },
          '-=0.4',
        )
        .from(
          '.hero-cta',
          { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 },
          '-=0.4',
        )
        .from(
          '.hero-stat',
          { y: 14, opacity: 0, duration: 0.6, stagger: 0.1 },
          '-=0.3',
        )

      // Scroll parallax on the headline
      gsap.to('.hero-headline', {
        yPercent: -18,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Aurora subtle rotation
      gsap.to('.aurora-blob', {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
        stagger: { each: 0.5, from: 'random' },
      })
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div
        ref={auroraRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div
          className="aurora-blob absolute -top-32 -left-24 h-[40rem] w-[40rem] rounded-full blur-[120px] opacity-40"
          style={{ background: 'var(--lime-glow)' }}
        />
        <div
          className="aurora-blob absolute top-20 right-0 h-[34rem] w-[34rem] rounded-full blur-[120px] opacity-35"
          style={{ background: 'var(--magenta)' }}
        />
        <div
          className="aurora-blob absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full blur-[120px] opacity-30"
          style={{ background: 'var(--coral)' }}
        />
      </div>
      <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 w-full">
        <motion.div
          className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Sparkles className="h-3.5 w-3.5" style={{ color: 'var(--lime-glow)' }} />
          <span>Independent motion studio · Open for Q3 collaborations</span>
        </motion.div>

        <h1 className="hero-headline font-display font-semibold tracking-[-0.04em] text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.95]">
          <span className="block overflow-hidden">
            {headlineWords.slice(0, 2).map((w, i) => (
              <span
                key={i}
                className="hero-word inline-block mr-[0.25em] will-change-transform"
              >
                {w}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {headlineWords.slice(2).map((w, i) => (
              <span
                key={i}
                className={
                  'hero-word inline-block mr-[0.25em] will-change-transform ' +
                  (i === 1 ? 'text-gradient-lime italic' : '')
                }
              >
                {w}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-sub mt-7 max-w-xl text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
          We design kinetic identities, interactive product moments, and cinematic
          launch films for the brands reshaping their categories — animated end-to-end
          in GSAP and Framer Motion.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <motion.a
            ref={btnRef}
            href="#contact"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: sx, y: sy }}
            whileTap={{ scale: 0.96 }}
            className="hero-cta group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-background"
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: 'var(--lime-glow)' }}
            />
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"
              style={{ background: 'var(--lime-glow)' }}
            />
            <span className="relative z-10">Start a project</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>

          <a
            href="#work"
            className="hero-cta inline-flex items-center gap-2 rounded-full border border-border/70 px-6 py-3 text-sm font-medium hover:bg-accent/50 transition-colors"
          >
            View selected work
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--coral)' }}
            />
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-6 border-t border-border/60 pt-8">
          {[
            { value: '12+', label: 'Years in motion' },
            { value: '180', label: 'Shipped projects' },
            { value: '37', label: 'Industry awards' },
            { value: '4', label: 'Continents served' },
          ].map((s) => (
            <div key={s.label} className="hero-stat">
              <div className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                {s.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
      >
        <span>Scroll</span>
        <div className="relative h-8 w-px bg-border/70 overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 h-3"
            style={{ background: 'var(--lime-glow)' }}
            animate={{ y: [-12, 32] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
