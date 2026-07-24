import { createContext, useCallback, useMemo, useState } from 'react'

/**
 * The backend has no resume storage — `POST /api/interview` accepts the PDF and
 * the job description together in a single multipart call, and only the parsed
 * *text* is persisted (inside the report).
 *
 * So the active resume lives in memory here: uploaded on the Resume page, then
 * consumed by the Analysis page. A File object cannot be serialized, so a page
 * refresh clears it and the UI prompts for re-upload rather than pretending a
 * stored resume exists.
 */
export const ResumeContext = createContext(null)

export const MAX_RESUME_BYTES = 3 * 1024 * 1024 // must match multer's limit

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(null) // { file, name, size, addedAt }

  const selectResume = useCallback((file) => {
    const entry = {
      file,
      name: file.name,
      size: file.size,
      addedAt: new Date().toISOString(),
    }
    setResume(entry)
    return entry
  }, [])

  const clearResume = useCallback(() => setResume(null), [])

  const value = useMemo(
    () => ({ resume, hasResume: Boolean(resume), selectResume, clearResume }),
    [resume, selectResume, clearResume],
  )

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

/** Shared PDF validation used by the dropzone and the analysis page. */
export function validateResumeFile(file) {
  if (!file) return 'Please choose a file.'
  const isPdf =
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
  if (!isPdf) return 'Only PDF files are supported.'
  if (file.size > MAX_RESUME_BYTES) return 'Resume must be 3MB or smaller.'
  if (file.size === 0) return 'That file appears to be empty.'
  return null
}
