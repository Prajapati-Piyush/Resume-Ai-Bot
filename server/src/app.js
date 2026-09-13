import express from 'express'
import multer from 'multer'
import authRouter from './routes/auth.route.js'
import interviewRouter from './routes/interview.route.js'
import cookieParser from 'cookie-parser'
import cors from "cors";
import passport from './config/passport.js'

const app = express();

const configuredFrontend = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/+$/, '') : null;
const allowedOrigins = [configuredFrontend, "http://localhost:5173", "http://localhost:3000"].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/+$/, '');
    if (allowedOrigins.includes(cleanOrigin) || /^https:\/\/.*\.vercel\.app$/.test(cleanOrigin)) {
      return callback(null, true);
    }
    // Fallback: allow the origin so cross-domain auth doesn't get blocked
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport in stateless mode — we use JWT cookies, not passport sessions,
// so only initialize() is needed (no session()/serializeUser).
app.use(passport.initialize());

// Prevent web crawlers from indexing JSON API responses or endpoints
app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  next();
});

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