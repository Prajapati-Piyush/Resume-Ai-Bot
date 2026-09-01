import {
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SEO from '../components/seo/SEO'

const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Resume Ingestion & Semantic Parsing',
    desc: 'Upload your PDF resume. PrepPilot parses work experience, projects, skills, and metrics while preserving formatting.',
    details: [
      'Extracts structured competencies cleanly',
      'Preserves achievement metrics and key outcomes',
      'Never retained on public storage; scoped securely to your session',
    ],
  },
  {
    step: '02',
    title: 'Job Description Decomposition',
    desc: 'Paste the job posting from any job board. PrepPilot’s intelligence engine breaks down the text into core competencies and seniority signals.',
    details: [
      'Extracts primary tech stack and seniority requirements',
      'Detects organizational focus areas and interview criteria',
      'Weights hard skills against soft leadership signals',
    ],
  },
  {
    step: '03',
    title: 'Alignment & Gap Diagnostics',
    desc: 'The engine compares your background against the job posting, computing an alignment score and ranking missing skills.',
    details: [
      'Calculates 0–100 match score based on contextual relevance',
      'Flags knowledge gaps likely to surface during live screens',
      'Ranks missing skills into high, medium, and low impact tiers',
    ],
  },
  {
    step: '04',
    title: 'Question Synthesis & 7-Day Roadmap',
    desc: 'Synthesizes role-specific questions with interviewer intent notes, alongside a tailored daily prep study schedule.',
    details: [
      'Generates 12+ targeted technical and behavioral interview questions',
      'Provides "Interviewer Intent" explanations for each prompt',
      'Delivers an actionable 7-day daily study roadmap with clear milestones',
    ],
  },
]

export default function HowItWorks() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How PrepPilot Prepares You for Job Interviews',
    description:
      'Step-by-step process of using PrepPilot: upload resume, parse job description, run AI gap analysis, and receive a tailored interview question bank and 7-day prep plan.',
    step: PIPELINE_STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  }

  return (
    <>
      <SEO
        title="How It Works — AI Interview Preparation Process"
        description="Learn how PrepPilot parses your resume and job description to synthesize an actionable interview prep report in under 60 seconds with AI."
        canonical="https://preppilot.ai/how-it-works"
        schema={schema}
      />

      <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center">
            <Badge variant="brand" className="mb-3">
              Workflow
            </Badge>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
              From job description to interview ready
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-400 max-w-xl mx-auto">
              PrepPilot removes the guesswork from interview prep by converting raw job postings
              into structured, prioritized practice routines.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <Button to="/register" size="md">
                Start Preparing Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/features" variant="secondary" size="md">
                Explore Features
              </Button>
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="mt-16 space-y-6">
            {PIPELINE_STEPS.map((step) => (
              <Card key={step.step} className="p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-fill border border-line text-brand-400 font-mono text-xs font-bold shrink-0">
                    {step.step}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-ink-50">
                      {step.title}
                    </h2>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-400">
                      {step.desc}
                    </p>

                    <ul className="mt-4 space-y-1.5 border-t border-line pt-3">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-xs text-ink-300">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-400" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Internal links */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            <Card hover className="p-5">
              <h3 className="text-sm font-bold text-ink-50">Targeted Resume Analysis</h3>
              <p className="mt-1 text-xs text-ink-400">
                Understand how our parser evaluates ATS compliance and technical skill gaps.
              </p>
              <Link
                to="/resume-analysis"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-400 hover:text-brand-300"
              >
                Resume Analysis Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Card>

            <Card hover className="p-5">
              <h3 className="text-sm font-bold text-ink-50">Technical & Behavioral Drills</h3>
              <p className="mt-1 text-xs text-ink-400">
                See how AI creates authentic interview questions with verified intent analysis.
              </p>
              <Link
                to="/technical-interview-preparation"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-400 hover:text-brand-300"
              >
                Technical Drills Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Card>
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <Button to="/register" size="md">
              Start Preparing with PrepPilot
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
