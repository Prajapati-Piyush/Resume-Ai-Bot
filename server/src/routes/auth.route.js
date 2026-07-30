import { Router } from "express"
import { register, login, logoutUser, getMe, forgotPassword, resetPassword, googleCallback } from "../controllers/auth.controller.js"
import authUser from "../middleware/auth.middleware.js"
import passport, { googleOAuthEnabled } from "../config/passport.js"

const authRouter  = Router()

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/logout", logoutUser)
authRouter.post("/forgot-password", forgotPassword)
authRouter.post("/reset-password", resetPassword)

authRouter.get('/get-me', authUser, getMe)

// ---------- Google OAuth ----------
// Guard: if Google isn't configured, respond clearly instead of crashing.
function requireGoogleConfigured(req, res, next) {
    if (!googleOAuthEnabled) {
        return res.status(503).json({ message: "Google sign-in is not configured on this server" })
    }
    next()
}

// 1) Kick off the flow — full-page redirect to Google's consent screen.
authRouter.get(
    "/google",
    requireGoogleConfigured,
    passport.authenticate("google", { scope: ["profile", "email"], session: false })
)

// 2) Google redirects back here. Passport verifies and sets req.user; on failure
//    it redirects to the SPA login with an error flag. On success, googleCallback
//    issues our JWT cookie and redirects into the app.
authRouter.get(
    "/google/callback",
    requireGoogleConfigured,
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${FRONTEND_URL}/login?oauth=failed`,
    }),
    googleCallback
)

export default authRouter
