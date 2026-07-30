import express from 'express'
import multer from 'multer'
import authRouter from './routes/auth.route.js'
import interviewRouter from './routes/interview.route.js'
import cookieParser from 'cookie-parser'
import cors from "cors";
import passport from './config/passport.js'

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport in stateless mode — we use JWT cookies, not passport sessions,
// so only initialize() is needed (no session()/serializeUser).
app.use(passport.initialize());

app.use("/api/auth", authRouter);

app.use("/api/interview", interviewRouter);

// Centralised error handler — turns upload/parse failures into proper 4xx responses
// instead of the empty 500s Express returns by default.
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Resume must be 3MB or smaller"
        : err.code === "LIMIT_UNEXPECTED_FILE"
          ? `Unexpected file field "${err.field}" — the resume must be sent as "resume"`
          : err.message;

    return res.status(400).json({ error: message });
  }

  if (err?.message === "Only PDF files are allowed") {
    return res.status(400).json({ error: err.message });
  }

  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app