import express from "express";
import authUser from "../middleware/auth.middleware.js";
import {
  generateInterviewReportController,
  listInterviewReportsController,
  getInterviewReportController,
  deleteInterviewReportController,
} from "../controllers/interview.controller.js";
import { upload } from "../middleware/file.middleware.js";

const interviewRouter = express.Router();

// every interview route requires a signed-in user
interviewRouter.use(authUser);

interviewRouter.post("/", upload.single("resume"), generateInterviewReportController);
interviewRouter.get("/", listInterviewReportsController);
interviewRouter.get("/:id", getInterviewReportController);
interviewRouter.delete("/:id", deleteInterviewReportController);

export default interviewRouter;
