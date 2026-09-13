import {
  ArrowRight,
  BarChart3,
  Brain,
  CalendarCheck,
  Check,
  FileSearch,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  Zap,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import ScoreRing from '../components/ui/ScoreRing'
import SEO from '../components/seo/SEO'
import { cn } from '../lib/utils'

const FEATURES = [
  {
    icon: Target,
    title: 'Match scoring',
    body: 'Get a 0–100 score showing how closely your resume lines up with the role, and exactly what is pulling it down.',
  },
  {
    icon: MessagesSquare,
    title: 'Predicted questions',
    body: 'Technical and behavioural questions tailored to the posting — each with the interviewer’s intent and how to answer.',
  },
  {
    icon: FileSearch,
    title: 'Skill gap analysis',
    body: 'Every missing skill surfaced and ranked low, medium or high so you know what to fix first.',
  },
  {
    icon: CalendarCheck,
    title: 'Day-by-day roadmap',
    body: 'A structured preparation plan broken into daily focus areas and concrete tasks you can actually work through.',
  },
  {
    icon: Zap,
    title: 'Results in under a minute',
    body: 'Upload once, paste a job description, and the full report is ready before your coffee cools.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by default',
    body: 'Your resume is parsed for the analysis and never shared. Reports stay scoped to your account alone.',
  },
]

const STEPS = [
  {
    icon: Upload,
    title: 'Upload your resume',
    body: 'Drop in a PDF. We extract the text and keep the structure intact — no manual retyping.',
  },
  {
    icon: FileSearch,
    title: 'Paste the job description',
    body: 'Add the role you are targeting. The more detail in the posting, the sharper the analysis.',
  },
  {
    icon: Brain,
    title: 'Get your prep report',
    body: 'Match score, question bank, skill gaps and a day-by-day plan — generated and saved to your account.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'The predicted questions were uncannily close to what I actually got asked. I walked in already knowing my stories.',
    name: 'Priya N.',
    role: 'Frontend Engineer',
    initials: 'PN',
  },
  {
    quote:
      'The skill gap ranking told me to stop polishing React and go learn system design. That was the difference.',
    name: 'Marcus D.',
    role: 'Full Stack Developer',
    initials: 'MD',
  },
  {
    quote:
      'I used the 7-day plan to structure my prep instead of doom-scrolling job boards. Two offers in three weeks.',
    name: 'Sofia R.',
    role: 'Backend Engineer',
    initials: 'SR',
  },
]

const CREDIT_GUIDE = [
  {
    title: '3 Lifetime Credits at Signup',
    desc: 'Every registered account instantly receives 3 free analysis credits without entering any payment or billing details.',
  },
  {
    title: '1 Credit = 1 AI Report',
    desc: 'Credits are only consumed when a new interview report is successfully generated. Failed attempts or retries never cost credits.',
  },
  {
    title: 'Free Resume Uploads',
    desc: 'Uploading, parsing, or updating your PDF resume is always 100% free and does not consume any analysis credits.',
  },
  {
    title: 'Permanent History & PDF Export',
    desc: 'Your generated reports remain in your dashboard history permanently with unlimited offline PDF downloads.',
  },
]

function SectionHeading({ eyebrow, title, description, className }) {
  return (
    <div className={cn('mx-auto max-w-2xl text-center', className)}>
      {eyebrow && (
        <Badge variant="brand" icon={Sparkles} className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-balance text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-ink-400">{description}</p>
      )}
    </div>
  )
}

export default function Landing() {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PrepPilot',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any (Web Application)',
    description:
      'AI-powered interview preparation assistant and resume analyzer that converts job descriptions and resumes into personalized practice reports, predicted technical questions, and 7-day study plans.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'INR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1280',
    },
  }

  return (
    <>
      <SEO
        title="AI-Powered Interview Preparation & Resume Analysis"
        description="Master your next technical or HR interview with PrepPilot. Upload your resume, paste a job description, and get instant match scores, predicted questions, and a 7-day preparation roadmap."
        schema={homeSchema}
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-aurora" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-60" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up">
              <Badge variant="brand" icon={Sparkles}>
                Next-Gen AI Interview Intelligence
              </Badge>
            </div>

            <h1
              className="mt-6 animate-fade-up text-balance text-4xl font-bold leading-[1.1] tracking-tight text-ink-50 sm:text-6xl"
              style={{ animationDelay: '80ms' }}
            >
              Walk into every interview{' '}
              <span className="text-gradient-brand">already prepared</span>
            </h1>

            <p
              className="mx-auto mt-6 max-w-xl animate-fade-up text-pretty text-lg leading-relaxed text-ink-400"
              style={{ animationDelay: '160ms' }}
            >
              Upload your resume, paste any job description, and get a tailored prep
              report — match score, predicted questions, skill gaps and a day-by-day
              plan. In under a minute.
            </p>

            <div
              className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: '240ms' }}
            >
              <Button to="/register" size="lg" className="w-full sm:w-auto">
                Start Preparing Free
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/login" variant="secondary" size="lg" className="w-full sm:w-auto">
                Sign in
              </Button>
            </div>

            <p
              className="mt-4 animate-fade-up text-xs text-ink-500"
              style={{ animationDelay: '300ms' }}
            >
              No credit card required · Your first report takes about 45 seconds
            </p>
          </div>

          {/* ---- product preview ---- */}
          <div
            className="relative mx-auto mt-16 max-w-4xl animate-fade-up"
            style={{ animationDelay: '380ms' }}
          >
            <div className="absolute -inset-x-8 -top-8 bottom-0 rounded-[2rem] bg-brand-500/10 blur-3xl" aria-hidden="true" />

            <Card className="relative overflow-hidden p-1.5">
              <div className="rounded-[1rem] border border-line bg-ink-950/80 p-5 sm:p-8">
                <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                  <div className="shrink-0 text-center">
                    <ScoreRing score={78} />
                    <p className="mt-3 text-xs text-ink-500">Senior Frontend Engineer</p>
                  </div>

                  <div className="min-w-0 flex-1 space-y-4">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
                        Top skill gaps
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="danger">System design · High</Badge>
                        <Badge variant="warning">Next.js SSR · Medium</Badge>
                        <Badge variant="success">Testing · Low</Badge>
                      </div>
                    </div>

                    <div className="rule" />

                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
                        Predicted question
                      </p>
                      <p className="text-sm leading-relaxed text-ink-200">
                        “Walk me through how you would architect a dashboard that streams
                        updates to thousands of concurrent users.”
                      </p>
                      <p className="mt-2 text-xs text-ink-500">
                        Intent — testing whether you reason about state sync and backpressure,
                        not just component structure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* ---- stat strip ---- */}
          <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ['45s', 'Average report time'],
              ['12+', 'Questions per report'],
              ['0–100', 'Match score'],
              ['7-day', 'Prep roadmap'],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <dt className="text-2xl font-bold text-ink-50 sm:text-3xl">{value}</dt>
                <dd className="mt-1 text-xs text-ink-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="relative scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to prepare properly"
            description="Not another generic question list. Every output is generated against your actual resume and the specific role you are chasing."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }, i) => (
              <Card
                key={title}
                hover
                className="animate-fade-up p-6"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand-400/25 bg-brand-500/12 text-brand-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink-50">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="relative scroll-mt-20 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-50" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, one minute"
            description="No setup, no integrations, no lengthy onboarding. Upload, paste, done."
          />

          <div className="relative mt-14 grid gap-6 md:grid-cols-3">
            {/* connecting line on desktop */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent md:block"
              aria-hidden="true"
            />

            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="relative animate-fade-up text-center"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative z-10 mx-auto grid h-[6.5rem] w-[6.5rem] place-items-center">
                  <div className="absolute inset-0 rounded-full bg-ink-950" aria-hidden="true" />
                  <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-brand-400/25 bg-brand-500/12 text-brand-300 shadow-glow">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <span className="absolute -right-1 -top-1 z-20 grid h-7 w-7 place-items-center rounded-full border border-line-strong bg-ink-900 text-xs font-semibold text-ink-50">
                    {i + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-ink-50">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-400">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button to="/register" size="lg">
              Try it on your resume
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="testimonials" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Customers"
            title="Candidates who stopped guessing"
            description="What people say after running their first few reports."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, role, initials }, i) => (
              <Card
                key={name}
                hover
                className="flex animate-fade-up flex-col p-6"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex gap-0.5 text-brand-400" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-200">
                  “{quote}”
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-semibold text-white">
                    {initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink-50">{name}</p>
                    <p className="text-xs text-ink-500">{role}</p>
                  </div>
                </figcaption>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING & CREDITS ================= */}
      <section id="pricing" className="relative scroll-mt-20 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Simple & Free"
            title="100% Free for Launch"
            description="No subscriptions, no card required, and no hidden fees. Every registered account receives 3 lifetime AI Analysis Credits."
          />

          {/* Single Free Plan Card */}
          <div className="relative mx-auto mt-12 max-w-xl pt-3.5">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
              <Badge variant="brand" icon={Sparkles} className="border-brand-400/50 bg-ink-900 px-3.5 py-1 text-xs shadow-md">
                Launch Offer • 100% Free
              </Badge>
            </span>

            <Card className="border-brand-400/40 bg-brand-500/[0.06] p-8 sm:p-10 shadow-glow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-6">
                <div>
                  <h3 className="text-xl font-bold text-ink-50">Free Launch Plan</h3>
                  <p className="mt-1 text-xs text-ink-400">Everything needed to prepare for top engineering roles.</p>
                </div>
                <div className="flex items-baseline gap-1.5 self-start sm:self-auto rounded-xl border border-brand-400/25 bg-brand-500/10 px-3.5 py-1.5">
                  <span className="text-3xl font-extrabold text-ink-50">₹0</span>
                  <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">Forever</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Included with every account:
                </p>
                <ul className="mt-4 space-y-3.5">
                  {[
                    '3 Lifetime AI Analysis Credits upon registration',
                    '1 Credit = 1 comprehensive role-tailored report',
                    'Unlimited resume uploads & replacements (0 credits consumed)',
                    'Objective match score (0–100) & seniority evaluation',
                    'Predicted technical questions with interviewer intent',
                    'Behavioral & leadership questions with STAR answers',
                    '7-Day prioritized preparation roadmap & study milestones',
                    'Permanent report history & unlimited PDF export',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-200">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Button to="/register" size="lg" fullWidth>
                  Get 3 Free Credits
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
                <p className="mt-3 text-center text-xs text-ink-500">
                  No credit card required • Instant access in under 60 seconds
                </p>
              </div>
            </Card>
          </div>

          {/* How Credits Work */}
          <div className="mt-20">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-ink-100">How AI Analysis Credits Work</h3>
              <p className="mt-2 text-sm text-ink-400">
                Transparent and simple — you only consume credits when an interview report is successfully generated.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {CREDIT_GUIDE.map(({ title, desc }, idx) => (
                <Card key={title} className="p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold font-mono text-brand-400">0{idx + 1}</span>
                    <h4 className="mt-2 text-sm font-semibold text-ink-50">{title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-ink-400">{desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden border-brand-400/20 p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-aurora opacity-80" aria-hidden="true" />

            <div className="relative">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-brand-400/25 bg-brand-500/12 text-brand-300 shadow-glow">
                <BarChart3 className="h-7 w-7" aria-hidden="true" />
              </span>

              <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
                Your next interview is already scheduled
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-pretty text-base text-ink-400">
                Spend the next minute finding out exactly what to study — instead of
                guessing what they might ask.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button to="/register" size="lg" className="w-full sm:w-auto">
                  Start Preparing Free
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button to="/login" variant="secondary" size="lg" className="w-full sm:w-auto">
                  I already have an account
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  )
}
