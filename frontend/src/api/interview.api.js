import client, { normalizeError } from './client'

async function request(fn) {
  try {
    return await fn()
  } catch (error) {
    throw normalizeError(error)
  }
}

/**
 * POST /api/interview — multipart: resume (PDF) + jobDescription (+ optional
 * title / selfDescription). The backend parses the PDF, calls Gemini and
 * persists the report in one round trip.
 *
 * @param onUploadProgress receives 0-100 for the file-transfer phase only;
 *        AI generation happens server-side after the upload completes.
 */
export function generateReport(
  { resumeFile, jobDescription, title, selfDescription },
  { onUploadProgress, signal } = {},
) {
  return request(async () => {
    const form = new FormData()
    form.append('resume', resumeFile)
    form.append('jobDescription', jobDescription)
    if (title) form.append('title', title)
    if (selfDescription) form.append('selfDescription', selfDescription)

    const { data } = await client.post('/interview', form, {
      signal,
      onUploadProgress: (event) => {
        if (!onUploadProgress || !event.total) return
        onUploadProgress(Math.round((event.loaded * 100) / event.total))
      },
    })

    return data.report
  })
}

/** GET /api/interview — list (resume text omitted server-side). */
export function listReports() {
  return request(async () => {
    const { data } = await client.get('/interview')
    return data.reports || []
  })
}

/** GET /api/interview/:id — full report including resume text. */
export function getReport(id) {
  return request(async () => {
    const { data } = await client.get(`/interview/${id}`)
    return data.report
  })
}

/** DELETE /api/interview/:id */
export function deleteReport(id) {
  return request(async () => {
    const { data } = await client.delete(`/interview/${id}`)
    return data
  })
}
