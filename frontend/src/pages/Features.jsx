import {
  ArrowRight,
  Check,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SEO from '../components/seo/SEO'

const FEATURE_MODULES = [
  {
    title: 'Intelligent Resume-to-Job Matching Engine',
    tag: 'Match Scoring AI',
    desc: 'Our semantic parsing engine compares your work experience, tech stack, and achievements directly against the job requirements to generate a calibrated 0–100 compatibility score.',
    points: [
      'Identifies critical requirement matches and missed criteria',
      'Highlights ATS parsing risks and bullet point clarity',
      'Pinpoints experience seniority mismatches',
    ],
    link: '/resume-analysis',
    linkText: 'Learn more about Resume Analysis',
  },
  {
    title: 'Predicted Question Bank & Interviewer Intent',
    tag: 'Technical & HR Drills',
    desc: 'Generates role-specific questions spanning technical deep-dives, architectural dilemmas, and behavioral scenarios—complete with rationale for why the interviewer asks it.',
    points: [
      'Detailed rationale on what the interviewer is evaluating',
      'Framework suggestions for high-scoring responses',
      'STAR-aligned responses for behavioral and leadership rounds',
    ],
    link: '/technical-interview-preparation',
    linkText: 'Explore Technical Preparation',
  },
  {
    title: 'Skill Gap Prioritization Matrix',
    tag: 'Gap Diagnostics',
    desc: 'Never waste study time on concepts you already know or low-impact keywords. PrepPilot ranks missing skills into High, Medium, and Low impact tiers.',
    points: [
      'High priority: Core job dealbreakers to review immediately',
      'Medium priority: Secondary frameworks and tool sets',
      'Low priority: Nice-to-have supplementary tools',
    ],
    link: '/how-it-works',
    linkText: 'See How Preparation Roadmaps Work',
  },
  {
    title: 'Structured 7-Day Interview Readiness Roadmap',
    tag: 'Actionable Schedule',
    desc: 'Transforms daunting preparation into achievable daily steps. Each day focuses on a distinct theme—from system design to behavioral storytelling.',
    points: [
      'Daily dedicated practice goals and recommended reading topics',
      'Technical drill routines with targeted mock questions',
      'Day 7 pre-interview checklist and confidence rehearsal',
    ],
    link: '/hr-interview-preparation',
    linkText: 'Review HR & Behavioral Drills',
  },
]

export default function Features() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'PrepPilot Features — AI-Powered Interview Preparation Platform',
    description:
      'Explore PrepPilot features: Resume parsing, job description analysis, match scoring, predicted technical and HR questions, and 7-day preparation roadmaps.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://preppilot.ai/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Features',
          item: 'https://preppilot.ai/features',
        },
      ],
    },
  }

  return (
    <>
      <SEO
        title="Features — AI Interview Preparation & Resume Analysis Tools"
        description="Discover PrepPilot features: AI resume analysis, automated job description matching, predicted technical & HR questions, skill gap prioritization, and personalized roadmaps."
        canonical="https://preppilot.ai/features"
        schema={schema}
      />

      <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="brand" className="mb-3">
              Feature Overview
            </Badge>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
              Tools designed for serious preparation
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-400">
              PrepPilot bridges the gap between your resume and what hiring committees evaluate
              during technical and behavioral loops.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <Button to="/register" size="md">
                Start Preparing Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/how-it-works" variant="secondary" size="md">
                How It Works
              </Button>
            </div>
          </div>

          {/* Feature Modules */}
          <div className="mt-16 space-y-6">
            {FEATURE_MODULES.map((feat) => (
              <Card
                key={feat.title}
                className="p-6 sm:p-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="max-w-2xl">
                    <span className="inline-block rounded bg-fill px-2.5 py-0.5 text-xs font-semibold text-brand-400 border border-line mb-2.5">
                      {feat.tag}
                    </span>
                    <h2 className="text-lg font-bold text-ink-50 sm:text-xl">
                      {feat.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-400">
                      {feat.desc}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {feat.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2 text-xs text-ink-300">
                          <Check className="h-3.5 w-3.5 shrink-0 text-brand-400" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5">
                      <Link
                        to={feat.link}
                        className="inline-flex items-center gap-1 text-xs font-medium text-brand-400 hover:text-brand-300"
                      >
                        {feat.linkText}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="w-full lg:w-64 rounded-lg bg-fill p-4 border border-line shrink-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-400 block border-b border-line pb-2">
                      Feature Scope
                    </span>
                    <div className="mt-3 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-ink-400">Speed</span>
                        <span className="font-semibold text-ink-100">&lt; 45 seconds</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink-400">Privacy</span>
                        <span className="font-semibold text-ink-100">Account Only</span>
                      </div>
                    </div>
                    <Button to="/register" fullWidth size="sm" className="mt-4">
                      Try Free
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Card className="p-8 border-line bg-fill/40">
              <h2 className="text-xl font-bold text-ink-50">
                Ready to generate your first report?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-xs text-ink-400">
                Get started free. Complete interview preparation report delivered in under a minute.
              </p>
              <div className="mt-5 flex justify-center">
                <Button to="/register" size="md">
                  Start Preparing Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
