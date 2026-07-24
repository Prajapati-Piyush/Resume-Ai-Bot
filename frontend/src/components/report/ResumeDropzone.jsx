import { useCallback, useRef, useState } from 'react'
import { CheckCircle2, FileText, Trash2, UploadCloud } from 'lucide-react'
import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import { validateResumeFile } from '../../context/ResumeContext'
import { cn, formatBytes, formatRelativeTime } from '../../lib/utils'

/**
 * Drag-and-drop PDF picker. Purely local — the file is only transmitted when a
 * report is generated, because the API takes the resume and job description in
 * a single call.
 */
export default function ResumeDropzone({ resume, onSelect, onClear, progress = null, disabled }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  const handleFiles = useCallback(
    (fileList) => {
      const file = fileList?.[0]
      if (!file) return

      const invalid = validateResumeFile(file)
      if (invalid) {
        setError(invalid)
        return
      }

      setError('')
      onSelect(file)
    },
    [onSelect],
  )

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    handleFiles(e.dataTransfer.files)
  }

  // ---------- selected state ----------
  if (resume) {
    return (
      <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.06] p-5">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-emerald-400/25 bg-emerald-500/10 text-emerald-400">
            <FileText className="h-6 w-6" aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
              <p className="truncate text-sm font-medium text-white">{resume.name}</p>
            </div>
            <p className="mt-1 text-xs text-ink-400">
              {formatBytes(resume.size)} · added {formatRelativeTime(resume.addedAt)}
            </p>

            {progress !== null && (
              <ProgressBar value={progress} label="Uploading" className="mt-3" />
            )}
          </div>

          {onClear && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              disabled={disabled}
              aria-label="Remove resume"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Remove</span>
            </Button>
          )}
        </div>
      </div>
    )
  }

  // ---------- empty state ----------
  return (
    <div>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-label="Upload resume PDF"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all',
          dragging
            ? 'border-brand-400/60 bg-brand-500/10'
            : 'border-white/12 bg-white/[0.02] hover:border-brand-400/40 hover:bg-white/[0.04]',
          disabled && 'cursor-not-allowed opacity-55',
        )}
      >
        <span
          className={cn(
            'grid h-14 w-14 place-items-center rounded-2xl border transition-all',
            dragging
              ? 'scale-110 border-brand-400/40 bg-brand-500/15 text-brand-300'
              : 'border-white/12 bg-white/[0.04] text-ink-400',
          )}
        >
          <UploadCloud className="h-7 w-7" aria-hidden="true" />
        </span>

        <p className="mt-4 text-sm font-medium text-white">
          {dragging ? 'Drop your resume here' : 'Drag and drop your resume'}
        </p>
        <p className="mt-1.5 text-xs text-ink-500">
          or <span className="text-brand-400">browse files</span> · PDF only · max 3MB
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          disabled={disabled}
          onChange={(e) => {
            handleFiles(e.target.files)
            e.target.value = '' // allow re-picking the same file
          }}
        />
      </div>

      {error && (
        <p role="alert" className="mt-2.5 text-sm text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}
