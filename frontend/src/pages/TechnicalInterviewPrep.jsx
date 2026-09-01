import {
  ArrowRight,
  Cpu,
  Database,
  Network,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SEO from '../components/seo/SEO'

export default function TechnicalInterviewPrep() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Technical Interview Preparation AI — System Design & Coding Prep | PrepPilot',
    description:
      'Master engineering loops with AI technical interview preparation. Practice system design, architectural trade-offs, algorithms, and framework internals tailored to target company requirements.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://preppilot.ai/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Technical Interview Preparation',
          item: 'https://preppilot.ai/technical-interview-preparation',
        },
      ],
    },
  }

  return (
    <>
      <SEO
        title="Technical Interview Preparation AI — Coding, Architecture & System Design"
        description="Ace technical interviews with AI. Generate job-specific system design scenarios, coding questions, and architectural trade-off evaluations derived from your resume and target role."
        canonical="https://preppilot.ai/technical-interview-preparation"
        schema={schema}
      />

      <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="brand" className="mb-3">
              Technical Drills
            </Badge>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
              Technical interview preparation with AI
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-400">
              Practice architectural trade-offs, system design dilemmas, and framework internals
              tailored to the technologies required by the role.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <Button to="/register" size="md">
                Start Preparing Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/hr-interview-preparation" variant="secondary" size="md">
                HR & Behavioral Prep
              </Button>
            </div>
          </div>

          {/* Technical Disciplines Grid */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-fill border border-line text-blue-400 mb-3">
                <Network className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-ink-50">System Design & Scaling</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
                Practice high-concurrency systems, load balancing, caching hierarchies,
                message queues, and database sharding.
              </p>
            </Card>

            <Card className="p-6">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-fill border border-line text-emerald-400 mb-3">
                <Database className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-ink-50">Data Modeling & Persistence</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
                SQL vs. NoSQL trade-offs, consistency models, query indexing, replication strategies,
                and transactional integrity.
              </p>
            </Card>

            <Card className="p-6">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-fill border border-line text-purple-400 mb-3">
                <Cpu className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-ink-50">Framework Internals</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
                Deep dives into concurrent mode, event loops, async I/O, microservices communication,
                and performance bottlenecks.
              </p>
            </Card>
          </div>

          {/* Technical Question Example */}
          <div className="mt-14 rounded-xl border border-line bg-ink-900 p-6 sm:p-7">
            <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-mono text-ink-400">
                <span>example-drill.json</span>
              </div>
              <span className="text-xs text-brand-400">AI Synthesis</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-ink-400 font-semibold">// Predicted Interview Question:</span>
                <p className="mt-1 text-ink-100 font-sans text-sm font-medium">
                  “We process millions of webhook events per hour. How would you redesign our ingestion pipeline
                  to guarantee at-least-once processing without overwhelming downstream services?”
                </p>
              </div>

              <div className="rounded-lg bg-fill p-3 border border-line">
                <span className="text-brand-400 font-semibold">// Interviewer Intent:</span>
                <p className="mt-1 text-ink-300 font-sans text-xs leading-relaxed">
                  Evaluates backpressure management (dead-letter queues, rate limits), pull vs. push consumers,
                  and idempotency patterns.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-line">
              <span className="text-xs text-ink-400">
                Want customized technical drills for your target job?
              </span>
              <Button to="/register" size="sm">
                Start Preparing Now
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
