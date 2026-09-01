import { useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Sparkles,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SEO from '../components/seo/SEO'
import { cn } from '../lib/utils'

const FAQS = [
  {
    id: 'faq-what-is-preppilot',
    q: 'What is PrepPilot?',
    a: 'PrepPilot is an AI-powered interview preparation assistant built on advanced generative intelligence models. It analyzes your PDF resume alongside any target job description to generate tailored preparation reports, including match scoring, predicted technical and behavioral questions, skill gap diagnostics, and structured study roadmaps.',
  },
  {
    id: 'faq-how-resume-analyzed',
    q: 'How does PrepPilot analyse my resume?',
    a: 'When you upload your resume (PDF format, up to 3MB), our backend securely extracts the textual content, technical competencies, work history, and achievements. The extracted data is then compared against the target job posting to assess semantic alignment, keyword relevance, and seniority fit.',
  },
  {
    id: 'faq-job-description-effect',
    q: 'How does the job description affect my preparation?',
    a: 'The job description serves as the benchmark for your preparation. PrepPilot decomposes the posting into mandatory technical qualifications, preferred tools, and implicit responsibilities. This ensures your question bank and skill gap analysis directly mirror what the hiring team is actively seeking.',
  },
  {
    id: 'faq-technical-questions',
    q: 'Can PrepPilot generate technical interview questions?',
    a: 'Yes. For engineering and technical roles, PrepPilot extracts specific technologies, frameworks, and architecture patterns from the job posting (e.g., React, Node.js, system design, databases, microservices) and synthesizes realistic technical questions complete with the interviewer’s evaluation intent.',
  },
  {
    id: 'faq-hr-behavioural-questions',
    q: 'Can PrepPilot generate HR and behavioural questions?',
    a: 'Yes. PrepPilot generates situational and behavioral interview questions tailored to the seniority and culture cues of the role. It provides guidance on answering using the STAR method (Situation, Task, Action, Result) to highlight your leadership, teamwork, and problem-solving skills.',
  },
  {
    id: 'faq-personalisation',
    q: 'How does PrepPilot personalise interview preparation?',
    a: 'Unlike generic question lists, PrepPilot compares the specific overlap between your uploaded resume and the employer’s job description. It detects gaps where the job requires skills not evident on your resume, surfaces targeted questions around those areas, and builds a customized 7-day preparation roadmap.',
  },
  {
    id: 'faq-save-reports',
    q: 'Can I save my interview preparation reports?',
    a: 'Yes. Every report you generate is automatically saved to your account and accessible anytime under Report History. You can also export any report as a clean, paginated PDF document for offline study and review.',
  },
  {
    id: 'faq-ai-model',
    q: 'What AI technology powers PrepPilot?',
    a: 'PrepPilot is powered by a high-performance LLM intelligence engine optimized specifically for technical role benchmarking, long-context resume semantic analysis, and deterministic evaluation of engineering competencies.',
  },
  {
    id: 'faq-resume-security',
    q: 'Is my resume secure?',
    a: 'Yes. Your resume is parsed strictly to produce your personal preparation reports within your private user account. We do not sell your personal data, nor do we share or use your resumes to train public AI models.',
  },
  {
    id: 'faq-guarantee-success',
    q: 'Does PrepPilot guarantee interview success?',
    a: 'No tool can guarantee job offers, and PrepPilot does not make false promises. What PrepPilot does is remove guesswork by giving you structured, actionable insights, predicted questions, and skill diagnostics so you can walk into interviews significantly more prepared and confident.',
  },
]

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0)

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  return (
    <>
      <SEO
        title="Frequently Asked Questions — PrepPilot AI Interview Preparation"
        description="Find answers to common questions about PrepPilot: AI resume analysis, job description matching, predicted technical & HR questions, AI models, and data security."
        canonical="https://preppilot.ai/faq"
        schema={faqSchema}
      />

      <div className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="brand" icon={HelpCircle} className="mb-4">
              Answers & Guidance
            </Badge>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-ink-50 sm:text-5xl">
              Frequently Asked{' '}
              <span className="text-gradient-brand">Questions</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-400 sm:text-lg">
              Everything you need to know about how PrepPilot analyzes resumes, generates
              role-specific interview questions, and protects your data.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="mt-14 space-y-4">
            {FAQS.map((item, idx) => {
              const isOpen = openIdx === idx
              const contentId = `${item.id}-content`
              const buttonId = `${item.id}-button`

              return (
                <Card
                  key={item.id}
                  hover
                  className="overflow-hidden p-0 transition-colors"
                >
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:bg-fill-strong/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    <span className="text-base font-semibold text-ink-50 sm:text-lg">
                      {item.q}
                    </span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-line bg-fill text-ink-400 transition-colors">
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          isOpen && 'rotate-180 text-brand-400',
                        )}
                        aria-hidden="true"
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="border-t border-line bg-fill/30 px-5 py-4 sm:px-6 sm:py-5 text-sm leading-relaxed text-ink-300 animate-fade-in"
                    >
                      {item.a}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>

          {/* Bottom Card */}
          <div className="mt-16 text-center">
            <Card className="relative overflow-hidden border-brand-400/20 p-8 sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-aurora opacity-50" aria-hidden="true" />
              <div className="relative">
                <h2 className="text-xl font-bold text-ink-50 sm:text-2xl">
                  Ready to test your resume against a real job description?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-ink-400">
                  Generate your first interview preparation report in about 45 seconds. Free to get started.
                </p>
                <div className="mt-6 flex justify-center">
                  <Button to="/register" size="lg">
                    Start Preparing Free
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
