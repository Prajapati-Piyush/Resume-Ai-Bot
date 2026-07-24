import { useEffect, useState } from 'react'
import { ArrowRight, FileText, Info, ShieldCheck, Sparkles } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ResumeDropzone from '../../components/report/ResumeDropzone'
import { useResume } from '../../hooks/useResume'
import { useToast } from '../../hooks/useToast'

const TIPS = [
  'Use a text-based PDF — scanned images cannot be read.',
  'Keep it under 3MB so the upload succeeds.',
  'Include your skills, tools and measurable outcomes.',
  'One resume at a time — replace it whenever you target a different role.',
]

export default function ResumeUpload() {
  const { resume, hasResume, selectResume, clearResume } = useResume()
  const toast = useToast()

  const [previewUrl, setPreviewUrl] = useState(null)

  // Build (and revoke) an object URL so the PDF can be previewed inline.
  useEffect(() => {
    if (!resume?.file) {
      setPreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(resume.file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [resume])

  const handleSelect = (file) => {
    selectResume(file)
    toast.success(`${file.name} is ready to analyze`)
  }

  const handleClear = () => {
    clearResume()
    toast.info('Resume removed')
  }

  return (
    <>
      <PageHeader
        eyebrow="Step 1"
        title="Your resume"
        description="Upload the PDF we should analyze against job descriptions."
        actions={
          hasResume && (
            <Button to="/app/analyze">
              Continue to analysis
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader
              icon={FileText}
              title="Upload resume"
              description="PDF only, up to 3MB."
            />
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <ResumeDropzone resume={resume} onSelect={handleSelect} onClear={handleClear} />
            </div>
          </Card>

          {/* ---- inline preview ---- */}
          {previewUrl && (
            <Card>
              <CardHeader
                icon={FileText}
                title="Preview"
                description="Check that the text renders correctly before analyzing."
              />
              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <object
                  data={previewUrl}
                  type="application/pdf"
                  className="h-[520px] w-full rounded-xl border border-white/10 bg-ink-900"
                  aria-label="Resume preview"
                >
                  {/* Browsers without an inline PDF viewer land here */}
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                    <FileText className="h-8 w-8 text-ink-500" aria-hidden="true" />
                    <p className="text-sm text-ink-400">
                      Your browser cannot display PDFs inline.
                    </p>
                    <Button href={previewUrl} target="_blank" rel="noreferrer" variant="secondary" size="sm">
                      Open in a new tab
                    </Button>
                  </div>
                </object>
              </div>
            </Card>
          )}
        </div>

        {/* ---- sidebar ---- */}
        <div className="space-y-6">
          <Card className="border-brand-400/20 bg-brand-500/[0.04] p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-brand-400/25 bg-brand-500/12 text-brand-300">
                <Info className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">How this works</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
                  Your resume stays in this browser tab and is sent once, together with a
                  job description, when you generate a report. Only the extracted text is
                  saved — inside the report itself.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-500">
                  Because it is not stored on the server, refreshing the page clears it and
                  you will need to re-upload.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader icon={ShieldCheck} title="Tips for better results" />
            <ul className="space-y-2.5 px-5 pb-5 sm:px-6 sm:pb-6">
              {TIPS.map((tip) => (
                <li key={tip} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-300">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                    aria-hidden="true"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>

          {hasResume && (
            <Card className="border-emerald-400/20 bg-emerald-500/[0.04] p-5 text-center">
              <Sparkles className="mx-auto h-6 w-6 text-emerald-400" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium text-white">Resume ready</p>
              <p className="mt-1 text-xs text-ink-400">
                Next, paste a job description to generate your report.
              </p>
              <Button to="/app/analyze" fullWidth className="mt-4">
                Continue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
