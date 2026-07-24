import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, Briefcase, FileText, Sparkles, TriangleAlert, Upload, User } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input, { Textarea } from '../../components/ui/Input'
import ResumeDropzone from '../../components/report/ResumeDropzone'
import { generateReport } from '../../api/interview.api'
import { useResume } from '../../hooks/useResume'
import { useToast } from '../../hooks/useToast'
import { cn } from '../../lib/utils'

const MIN_JD_LENGTH = 40

// Shown while the request is in flight so the wait feels accounted for.
const STAGES = [
  { label: 'Uploading your resume', detail: 'Sending the PDF securely' },
  { label: 'Extracting resume text', detail: 'Parsing structure and skills' },
  { label: 'Analyzing the job description', detail: 'Matching requirements' },
  { label: 'Generating your report', detail: 'Questions, gaps and roadmap' },
]

function GeneratingOverlay({ stage, progress }) {
  return (
    <Card className="p-8 text-center sm:p-12">
      <div className="relative mx-auto grid h-20 w-20 place-items-center">
        <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-brand-400/30" />
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-brand-400/25 bg-brand-500/12 text-brand-300 shadow-glow">
          <Brain className="h-7 w-7 animate-pulse" aria-hidden="true" />
        </div>
      </div>

      <h2 className="mt-6 text-lg font-semibold text-white">Generating your report</h2>
      <p className="mt-1.5 text-sm text-ink-400">
        This usually takes 30–60 seconds. Please keep this tab open.
      </p>

      <ol className="mx-auto mt-8 max-w-sm space-y-3 text-left" aria-live="polite">
        {STAGES.map((s, i) => {
          const done = i < stage
          const active = i === stage
          return (
            <li key={s.label} className="flex items-center gap-3">
              <span
                className={cn(
                  'grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[11px] font-semibold transition-all',
                  done && 'border-emerald-400/30 bg-emerald-500/15 text-emerald-400',
                  active && 'border-brand-400/40 bg-brand-500/15 text-brand-300',
                  !done && !active && 'border-white/10 bg-white/[0.03] text-ink-600',
                )}
              >
                {done ? '✓' : i + 1}
              </span>

              <div className="min-w-0">
                <p
                  className={cn(
                    'text-sm transition-colors',
                    active ? 'font-medium text-white' : done ? 'text-ink-300' : 'text-ink-600',
                  )}
                >
                  {s.label}
                </p>
                {active && <p className="text-xs text-ink-500">{s.detail}</p>}
              </div>

              {active && (
                <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
              )}
            </li>
          )
        })}
      </ol>

      {progress !== null && progress < 100 && (
        <p className="mt-6 text-xs tabular-nums text-ink-500">Upload {progress}%</p>
      )}
    </Card>
  )
}

export default function JobAnalysis() {
  const { resume, hasResume, selectResume, clearResume } = useResume()
  const toast = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ title: '', jobDescription: '', selfDescription: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [progress, setProgress] = useState(null)
  const [stage, setStage] = useState(0)

  const stageTimers = useRef([])

  useEffect(() => () => stageTimers.current.forEach(clearTimeout), [])

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return

    const found = {}
    if (!hasResume) found.resume = 'Upload a resume PDF first.'
    if (!form.jobDescription.trim()) {
      found.jobDescription = 'Job description is required.'
    } else if (form.jobDescription.trim().length < MIN_JD_LENGTH) {
      found.jobDescription = `Add a bit more detail — at least ${MIN_JD_LENGTH} characters.`
    }

    if (Object.keys(found).length) {
      setErrors(found)
      if (found.resume) toast.error(found.resume)
      return
    }

    setSubmitting(true)
    setProgress(0)
    setStage(0)

    // advance the visual stages while the server works
    stageTimers.current = [
      setTimeout(() => setStage(1), 1200),
      setTimeout(() => setStage(2), 4000),
      setTimeout(() => setStage(3), 9000),
    ]

    try {
      const report = await generateReport(
        {
          resumeFile: resume.file,
          jobDescription: form.jobDescription.trim(),
          title: form.title.trim(),
          selfDescription: form.selfDescription.trim(),
        },
        { onUploadProgress: setProgress },
      )

      toast.success('Your interview report is ready')
      navigate(`/app/reports/${report._id}`, { replace: true })
    } catch (err) {
      toast.error(err.message, {
        title: err.retryable ? 'Temporarily unavailable' : 'Analysis failed',
      })
      // form values are intentionally preserved so a retry costs nothing
      setErrors({ submit: err.message, retryable: err.retryable })
    } finally {
      stageTimers.current.forEach(clearTimeout)
      setSubmitting(false)
      setProgress(null)
      setStage(0)
    }
  }

  if (submitting) {
    return (
      <>
        <PageHeader eyebrow="Step 2" title="Analyzing" />
        <GeneratingOverlay stage={stage} progress={progress} />
      </>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Step 2"
        title="New analysis"
        description="Paste the job description you are targeting and we'll generate a tailored prep report."
      />

      <form onSubmit={handleSubmit} noValidate className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader
              icon={Briefcase}
              title="The role"
              description="Job title is optional — we'll extract it from the description if you leave it blank."
            />

            <div className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
              <Input
                label="Job title (optional)"
                name="title"
                icon={Briefcase}
                placeholder="e.g. Senior Frontend Engineer"
                value={form.title}
                onChange={update('title')}
                disabled={submitting}
              />

              <Textarea
                label="Job description"
                name="jobDescription"
                rows={12}
                placeholder="Paste the full job posting here — responsibilities, requirements, nice-to-haves. The more detail, the sharper the analysis."
                value={form.jobDescription}
                onChange={update('jobDescription')}
                error={errors.jobDescription}
                hint={
                  !errors.jobDescription
                    ? `${form.jobDescription.trim().length} characters`
                    : undefined
                }
                disabled={submitting}
              />
            </div>
          </Card>

          <Card>
            <CardHeader
              icon={User}
              title="About you (optional)"
              description="Anything the resume doesn't capture — goals, context, what you want to emphasise."
            />

            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <Textarea
                name="selfDescription"
                rows={5}
                placeholder="e.g. I'm moving from agency work into product engineering and want to lean on my design-systems experience."
                value={form.selfDescription}
                onChange={update('selfDescription')}
                disabled={submitting}
              />
            </div>
          </Card>
        </div>

        {/* ---- sidebar ---- */}
        <div className="space-y-6">
          <Card>
            <CardHeader icon={FileText} title="Resume" description="Used for this analysis." />
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <ResumeDropzone
                resume={resume}
                onSelect={(file) => {
                  selectResume(file)
                  setErrors((prev) => ({ ...prev, resume: undefined }))
                }}
                onClear={clearResume}
                disabled={submitting}
              />

              {errors.resume && (
                <p role="alert" className="mt-2.5 text-sm text-rose-400">
                  {errors.resume}
                </p>
              )}

              {!hasResume && (
                <Button to="/app/resume" variant="ghost" size="sm" fullWidth className="mt-3">
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  Go to upload page
                </Button>
              )}
            </div>
          </Card>

          <Card className="p-5">
            {errors.submit && (
              <div
                role="alert"
                className={cn(
                  'mb-4 rounded-xl border px-4 py-3 text-sm',
                  errors.retryable
                    ? 'border-amber-400/25 bg-amber-500/10 text-amber-300'
                    : 'border-rose-400/25 bg-rose-500/10 text-rose-300',
                )}
              >
                <p className="flex items-start gap-2">
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{errors.submit}</span>
                </p>
                {errors.retryable && (
                  <p className="mt-1.5 pl-6 text-xs opacity-80">
                    Your inputs are still here — just press Generate again.
                  </p>
                )}
              </div>
            )}

            <Button type="submit" size="lg" fullWidth loading={submitting}>
              {!submitting && <Sparkles className="h-4 w-4" aria-hidden="true" />}
              {errors.submit ? 'Try again' : 'Generate report'}
            </Button>

            <p className="mt-3 text-center text-xs leading-relaxed text-ink-500">
              Takes about 30–60 seconds. Your report is saved to your account automatically.
            </p>
          </Card>
        </div>
      </form>
    </>
  )
}
