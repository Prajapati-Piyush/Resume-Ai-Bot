import { useContext } from 'react'
import { ResumeContext } from '../context/ResumeContext'

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used inside <ResumeProvider>')
  return ctx
}
