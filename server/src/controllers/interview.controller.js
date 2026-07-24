import mongoose from 'mongoose'
import { PDFParse } from 'pdf-parse'
import generateInterviewReport from '../services/ai.service.js'
import interviewReportModel from '../models/interviewReport.model.js'

export async function generateInterviewReportController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume PDF is required" })
    }

    const { selfDescription, jobDescription, title } = req.body

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ error: "Job description is required" })
    }

    let resumeContent
    try {
      resumeContent = await new PDFParse({
        data: Uint8Array.from(req.file.buffer),
      }).getText()
    } catch (error) {
      console.error("Failed to parse resume PDF:", error.message)
      return res.status(400).json({ error: "Could not read the uploaded PDF" })
    }

    if (!resumeContent?.text?.trim()) {
      return res.status(400).json({ error: "No readable text found in the resume PDF" })
    }

    // title comes from the AI (extracted from the job description) unless the client sends one
    const { title: generatedTitle, ...aiReport } = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    })

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      title: title?.trim() || generatedTitle,
      ...aiReport,
    })

    res.status(201).json({
      message: "Interview report generated successfully",
      report: interviewReport,
    })
  }
  catch (error) {
    console.error("Error generating interview report:", error)

    if (error?.name === "ValidationError") {
      return res.status(400).json({ error: error.message })
    }

    // Upstream AI failures carry their own status — a 503 overload is the user's
    // cue to retry, not an internal error on our side.
    if (error?.name === "AiServiceError") {
      return res.status(error.status).json({
        error: error.message,
        retryable: Boolean(error.retryable),
      })
    }

    res.status(500).json({ error: "Failed to generate interview report" })
  }
}

// GET /api/interview — list the signed-in user's reports.
// The stored resume text is excluded here; it is large and only needed on the detail view.
export async function listInterviewReportsController(req, res) {
  try {
    const reports = await interviewReportModel
      .find({ user: req.user.id })
      .select("-resume")
      .sort({ createdAt: -1 })
      .lean()

    res.status(200).json({ count: reports.length, reports })
  } catch (error) {
    console.error("Error listing interview reports:", error)
    res.status(500).json({ error: "Failed to fetch interview reports" })
  }
}

// GET /api/interview/:id
export async function getInterviewReportController(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid report id" })
    }

    const report = await interviewReportModel
      .findOne({ _id: req.params.id, user: req.user.id })
      .lean()

    if (!report) {
      return res.status(404).json({ error: "Report not found" })
    }

    res.status(200).json({ report })
  } catch (error) {
    console.error("Error fetching interview report:", error)
    res.status(500).json({ error: "Failed to fetch interview report" })
  }
}

// DELETE /api/interview/:id
export async function deleteInterviewReportController(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid report id" })
    }

    // scoped by user so one account can never delete another's report
    const deleted = await interviewReportModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!deleted) {
      return res.status(404).json({ error: "Report not found" })
    }

    res.status(200).json({ message: "Report deleted successfully", id: deleted._id })
  } catch (error) {
    console.error("Error deleting interview report:", error)
    res.status(500).json({ error: "Failed to delete interview report" })
  }
}
