import {
  ArrowRight,
  Award,
  Compass,
  HeartHandshake,
  Target,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SEO from '../components/seo/SEO'

const STAR_STEPS = [
  {
    letter: 'S',
    name: 'Situation',
    desc: 'Set the context. Describe the specific challenge, project deadline, or interpersonal dynamic you faced.',
  },
  {
    letter: 'T',
    name: 'Task',
    desc: 'Clarify your direct responsibility. What were you specifically assigned to solve or facilitate?',
  },
  {
    letter: 'A',
    name: 'Action',
    desc: 'Detail the concrete steps you took. Highlight leadership, critical problem-solving, and collaboration.',
  },
  {
    letter: 'R',
    name: 'Result',
    desc: 'Quantify your outcome. Share tangible business metrics, lessons learned, and team velocity gains.',
  },
]

export default function HrInterviewPrep() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'HR & Behavioral Interview Preparation AI — STAR Framework | PrepPilot',
    description:
      'Prepare for HR screening, behavioral rounds, and culture fit interviews using AI. Master the STAR technique and role-specific leadership scenarios.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://preppilot.ai/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'HR Interview Preparation',
          item: 'https://preppilot.ai/hr-interview-preparation',
        },
      ],
    },
  }

  return (
    <>
      <SEO
        title="HR Interview Preparation AI — Behavioral, STAR & Culture Fit Prep"
        description="Master behavioral interviews and HR screens. PrepPilot generates role-aligned situational questions, STAR answer frameworks, and culture-fit drills tailored to your target company."
        canonical="https://preppilot.ai/hr-interview-preparation"
        schema={schema}
      />

      <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="brand" className="mb-3">
              Behavioral & Leadership
            </Badge>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
              HR & behavioral interview preparation
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-400">
              Technical competence gets you the interview, but behavioral alignment wins the job offer.
              PrepPilot prepares you for situational questions, conflict resolution, and leadership stories.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <Button to="/register" size="md">
                Start Preparing Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/technical-interview-preparation" variant="secondary" size="md">
                Technical Interview Prep
              </Button>
            </div>
          </div>

          {/* STAR Methodology Grid */}
          <div className="mt-16">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-xl font-bold text-ink-50">
                The STAR Framework
              </h2>
              <p className="mt-1.5 text-xs text-ink-400">
                Format your experiences into clear, persuasive stories.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STAR_STEPS.map((s) => (
                <Card key={s.letter} className="p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-fill text-brand-400 font-mono text-sm font-bold border border-line mb-3">
                    {s.letter}
                  </span>
                  <h3 className="text-sm font-bold text-ink-50">{s.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-400">{s.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Behavioral Categories */}
          <div className="mt-16 rounded-xl border border-line bg-fill/30 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink-50">
              Core behavioral themes covered
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-ink-900 p-4 border border-line">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-xs font-semibold text-ink-100">Conflict & Stakeholder Alignment</h3>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
                  Resolving cross-functional disagreements between engineering and product teams calmly with data.
                </p>
              </div>

              <div className="rounded-lg bg-ink-900 p-4 border border-line">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-brand-400" />
                  <h3 className="text-xs font-semibold text-ink-100">Project Ambiguity & Deadlines</h3>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
                  Executing autonomously when requirements shift mid-sprint or production incidents need rapid triage.
                </p>
              </div>

              <div className="rounded-lg bg-ink-900 p-4 border border-line">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-purple-400" />
                  <h3 className="text-xs font-semibold text-ink-100">Mentorship & Culture</h3>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
                  Onboarding junior colleagues, conducting productive code reviews, and fostering healthy teams.
                </p>
              </div>

              <div className="rounded-lg bg-ink-900 p-4 border border-line">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-amber-400" />
                  <h3 className="text-xs font-semibold text-ink-100">Handling Failure & Post-Mortems</h3>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
                  Demonstrating psychological safety and blameless post-mortems when an outage occurs.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-ink-400">
                Ready to practice your behavioral narratives?
              </span>
              <Button to="/register" size="sm">
                Start Preparing Free
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
