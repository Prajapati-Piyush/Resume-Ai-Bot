import {
  ArrowRight,
  CheckCircle,
  FileCheck,
  FileSearch,
  ShieldCheck,
  Target,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SEO from '../components/seo/SEO'

export default function ResumeAnalysis() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Resume Analysis & ATS Match Scoring — PrepPilot',
    description:
      'Analyze your resume against any job description with PrepPilot AI. Detect missing keywords, calculate ATS compatibility scores, and fix skill gaps before submitting your application.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://preppilot.ai/' },
        { '@type': 'ListItem', position: 2, name: 'Resume Analysis', item: 'https://preppilot.ai/resume-analysis' },
      ],
    },
  }

  return (
    <>
      <SEO
        title="Resume Analysis AI — ATS Match Scoring & Skill Gap Detection"
        description="Optimize your resume for any tech job. Run AI resume analysis, detect ATS keyword omissions, prioritize missing skills, and calculate exact job match scores in seconds."
        canonical="https://preppilot.ai/resume-analysis"
        schema={schema}
      />

      <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Hero */}
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="brand" className="mb-3">
              Resume Analysis
            </Badge>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
              AI resume analysis for tech roles
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-400">
              Evaluate your resume against target job requirements, pinpoint keyword gaps,
              seniority alignment, and missing competencies before submitting applications.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <Button to="/register" size="md">
                Analyze My Resume Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/technical-interview-preparation" variant="secondary" size="md">
                Technical Prep
              </Button>
            </div>
          </div>

          {/* Key Advantages Grid */}
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <Card className="p-6">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-fill border border-line text-brand-400 mb-4">
                <Target className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-ink-50">Match Scoring (0–100)</h2>
              <p className="mt-2 text-xs leading-relaxed text-ink-400">
                Receive an objective score of how well your background matches the employer's expectations.
                Scores above 75 indicate strong alignment for recruiter screening.
              </p>
            </Card>

            <Card className="p-6">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-fill border border-line text-emerald-400 mb-4">
                <FileCheck className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-ink-50">ATS Keyword Gap Analysis</h2>
              <p className="mt-2 text-xs leading-relaxed text-ink-400">
                Identify essential technical skills, libraries, frameworks, and methodologies present in the
                job description that are missing from your resume.
              </p>
            </Card>

            <Card className="p-6">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-fill border border-line text-purple-400 mb-4">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-ink-50">Private & Confidential</h2>
              <p className="mt-2 text-xs leading-relaxed text-ink-400">
                We never train public models on your uploaded CV. Your career history remains private,
                accessible solely from your authenticated dashboard.
              </p>
            </Card>
          </div>

          {/* Deep Content Section */}
          <div className="mt-16 rounded-xl border border-line bg-fill/30 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink-50">
              Why resume-based preparation matters
            </h2>
            <div className="mt-3 space-y-3 text-xs sm:text-sm leading-relaxed text-ink-300">
              <p>
                Standard interview preparation often relies on generic question banks that fail to reflect what
                interviewers ask you specifically. During an actual technical interview loop, hiring panels
                spend the first 15–20 minutes reviewing past architectural decisions detailed in your resume.
              </p>
              <p>
                When you use PrepPilot for resume-based preparation, the questions generated reflect both the
                requirements of the job posting and your unique career path.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-2.5 rounded-lg bg-ink-900 p-4 border border-line">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-ink-100">Identify Seniority Mismatches</h3>
                  <p className="text-[11px] text-ink-400 mt-0.5">
                    Detect when a role requires staff-level system architecture if your CV highlights execution.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg bg-ink-900 p-4 border border-line">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-ink-100">Prioritized Learning Action Items</h3>
                  <p className="text-[11px] text-ink-400 mt-0.5">
                    Turn discovered skill gaps directly into actionable preparation milestones in your 7-day plan.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-ink-400">
                Ready to review your resume compatibility?
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
