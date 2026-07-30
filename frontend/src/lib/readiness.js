/*
  DERIVED ANALYTICS — not backend data.

  The API returns only: matchScore, technicalQuestions[], behavioralQuestions[],
  skillGaps[] (severity low|medium|high) and preparationPlan[]. It does NOT return
  per-category readiness scores.

  Everything here is a transparent, deterministic heuristic computed from that real
  data so the UI can show an analytics view. Because these numbers are estimates
  rather than a genuine assessment, every surface that renders them must label them
  "Estimated". The weights are chosen to be monotonic and defensible (more/again
  severe gaps lower the score; more question coverage and match raise it) — not to
  imply precision the data can't support.
*/

const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)))

const GAP_WEIGHT = { high: 15, medium: 8, low: 4 }

/** 100 = no gaps; each gap subtracts by severity. */
function gapScore(skillGaps = []) {
  const penalty = skillGaps.reduce((sum, g) => sum + (GAP_WEIGHT[g.severity] ?? 4), 0)
  return clamp(100 - penalty)
}

/** Coverage relative to a "full" set of `target` questions. */
function coverage(count, target) {
  return clamp((count / target) * 100)
}

/**
 * Compute overall + per-category readiness from a single report.
 * Returns null when there isn't enough signal (no match score and no data).
 */
export function computeReadiness(report) {
  if (!report) return null

  const match = clamp(report.matchScore ?? 0)
  const tech = report.technicalQuestions?.length ?? 0
  const behav = report.behavioralQuestions?.length ?? 0
  const days = report.preparationPlan?.length ?? 0
  const gaps = report.skillGaps ?? []

  const gs = gapScore(gaps)
  const techCov = coverage(tech, 6)
  const behavCov = coverage(behav, 6)
  const planScore = coverage(days, 7)

  const categories = [
    { key: 'technical', label: 'Technical Skills', score: clamp(0.6 * match + 0.4 * gs) },
    { key: 'problemSolving', label: 'Problem Solving', score: clamp(0.5 * match + 0.5 * techCov) },
    { key: 'communication', label: 'Communication', score: clamp(0.4 * match + 0.6 * behavCov) },
    { key: 'behavioural', label: 'Behavioural', score: clamp(0.5 * behavCov + 0.5 * gs) },
    { key: 'confidence', label: 'Confidence', score: clamp(0.5 * match + 0.3 * gs + 0.2 * planScore) },
  ]

  const overall = clamp(
    categories.reduce((sum, c) => sum + c.score, 0) / categories.length,
  )

  return { overall, categories, match, gapScore: gs }
}

/** Human band for a readiness/score value — drives colour + label everywhere. */
export function readinessBand(score) {
  if (score >= 80) return { label: 'Interview ready', tone: 'success' }
  if (score >= 60) return { label: 'Nearly there', tone: 'brand' }
  if (score >= 40) return { label: 'Needs practice', tone: 'warning' }
  return { label: 'Early stage', tone: 'danger' }
}

/**
 * Aggregate readiness across many reports for the dashboard, plus a simple
 * trend: newest report's readiness vs the one before it.
 * Expects `reports` sorted newest-first (as the API returns them).
 */
export function aggregateReadiness(reports = []) {
  if (!reports.length) return { avg: 0, best: 0, trend: 0, count: 0 }

  const scores = reports.map((r) => computeReadiness(r)?.overall ?? 0)
  const avg = clamp(scores.reduce((a, b) => a + b, 0) / scores.length)
  const best = Math.max(...scores)
  const trend = scores.length >= 2 ? scores[0] - scores[1] : 0

  return { avg, best, trend, count: reports.length }
}
