'use client'

import * as React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type Project = {
  id: string
  title: string
  client: string
  year: string
  category: string
  blurb: string
  accent: 'lime' | 'coral' | 'magenta'
}

const projects: Project[] = [
  {
    id: 'p1',
    title: 'Aurora Rebrand',
    client: 'Nebula Aerospace',
    year: '2025',
    category: 'Identity · Film',
    blurb:
      'A living identity for the first commercial lunar lander — built on a generative grid that reacts to flight telemetry in real time.',
    accent: 'lime',
  },
  {
    id: 'p2',
    title: 'Pulse OS',
    client: 'Halcyon Health',
    year: '2024',
    category: 'Product · Motion',
    blurb:
      'A complete motion language for a clinical operating system — 240 components, four states each, zero hesitation.',
    accent: 'coral',
  },
  {
    id: 'p3',
    title: 'Vela 03',
    client: 'Studio Vela',
    year: '2024',
    category: 'Web · WebGL',
    blurb:
      'A scroll-driven product launch for a hand-built electric motorcycle. 14 scenes, one continuous camera move.',
    accent: 'magenta',
  },
  {
    id: 'p4',
    title: 'Echo Field',
    client: 'Echo Labs',
    year: '2023',
    category: 'Generative · Installation',
    blurb:
      'A 24-meter LED installation in Tokyo that visualizes the city\'s ambient sound — rewritten in shader, 60fps for 90 days straight.',
    accent: 'lime',
  },
]

const accentMap = {
  lime: 'var(--lime-glow)',
  coral: 'var(--coral)',
  magenta: 'var(--magenta)',
} as const

export function Showcase() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
        },
        (ctx) => {
          const { isDesktop } = ctx.conditions as { isDesktop: boolean }
          const track = trackRef.current
          if (!track) return

          if (isDesktop) {
            // Horizontal scroll pin
            const panels = gsap.utils.toArray<HTMLElement>('.showcase-panel')
            const totalScroll = track.scrollWidth - window.innerWidth

            gsap.to(track, {
              x: -totalScroll,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: () => `+=${totalScroll}`,
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
              },
            })

            panels.forEach((panel) => {
              const art = panel.querySelector('.showcase-art') as HTMLElement
              if (!art) return
              gsap.fromTo(
                art,
                { scale: 1.15, yPercent: 6 },
                {
                  scale: 1,
                  yPercent: -6,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: ScrollTrigger.getById('showcase-h')
                      ? undefined
                      : undefined,
                    start: 'left right',
                    end: 'right left',
                    scrub: true,
                  },
                },
              )
            })
          } else {
            // Mobile: vertical fade-up
            gsap.utils.toArray<HTMLElement>('.showcase-panel').forEach((panel) => {
              gsap.from(panel, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 80%',
                },
              })
            })
          }
        },
      )

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [] },
  )

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative md:h-screen md:overflow-hidden"
    >
      {/* Section header (sticky on desktop, normal on mobile) */}
      <div className="md:absolute md:top-0 md:inset-x-0 md:z-20 md:px-8 md:pt-24 pointer-events-none">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 md:px-0 pt-24 md:pt-0">
          <div className="flex items-end justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-px w-8" style={{ background: 'var(--lime-glow)' }} />
                Selected work
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                Four projects, <span className="text-gradient-lime">one obsession</span>.
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: 'var(--coral)' }} />
              Scroll to explore
            </div>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="md:flex md:items-center md:h-screen md:will-change-transform pt-8 md:pt-0"
      >
        <div className="md:flex md:gap-6 md:pl-[8vw] md:pr-[8vw]">
          {projects.map((p, i) => (
            <ProjectPanel key={p.id} project={p} index={i} />
          ))}
          <div className="showcase-panel md:flex md:items-center md:min-w-[40vw] py-10 md:py-0 px-5 sm:px-8 md:px-0">
            <div>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-2xl font-display font-semibold"
              >
                See the full archive
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 transition-colors group-hover:bg-foreground group-hover:text-background"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                180+ projects across identity, product, film, and space. We open a new
                archive every quarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const accent = accentMap[project.accent]

  return (
    <article className="showcase-panel md:min-w-[70vw] lg:min-w-[58vw] xl:min-w-[48vw] md:h-[72vh] py-8 md:py-0 px-5 sm:px-8 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* Art side */}
        <div
          className="showcase-art relative aspect-[4/5] sm:aspect-[5/4] md:aspect-[4/5] rounded-3xl overflow-hidden border border-border/60"
          style={{
            background: `linear-gradient(140deg, color-mix(in oklch, ${accent} 28%, var(--card)) 0%, var(--card) 70%)`,
          }}
        >
          {/* Decorative generative-feel art */}
          <div className="absolute inset-0">
            <div
              className="absolute -top-1/4 -right-1/4 h-[60%] w-[60%] rounded-full blur-3xl opacity-50"
              style={{ background: accent }}
            />
            <div className="absolute inset-0 bg-grid opacity-30" />
            <svg
              viewBox="0 0 400 500"
              className="absolute inset-0 h-full w-full opacity-90"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id={`g-${project.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
                  <stop offset="100%" stopColor={accent} stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {Array.from({ length: 18 }).map((_, k) => (
                <circle
                  key={k}
                  cx={200 + Math.cos(k * 0.45) * (60 + k * 8)}
                  cy={250 + Math.sin(k * 0.45) * (50 + k * 6)}
                  r={2 + k * 1.4}
                  fill={`url(#g-${project.id})`}
                  opacity={0.6 - k * 0.025}
                />
              ))}
              <path
                d={`M 60 380 Q 200 ${100 + index * 30} 340 380`}
                stroke={accent}
                strokeWidth="1.5"
                strokeDasharray="3 6"
                opacity="0.7"
              />
              <text
                x="32"
                y="468"
                className="font-display"
                fontFamily="var(--font-display), sans-serif"
                fontSize="48"
                fontWeight="700"
                fill="currentColor"
                opacity="0.85"
              >
                0{index + 1}
              </text>
            </svg>
          </div>
          <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay" />
        </div>

        {/* Text side */}
        <div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="uppercase tracking-[0.2em]">{project.category}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span>{project.year}</span>
          </div>
          <h3 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            For {project.client}
          </p>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-md text-balance">
            {project.blurb}
          </p>
          <a
            href="#contact"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: accent }}
          >
            View case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  )
}
