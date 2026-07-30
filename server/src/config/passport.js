import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findOrCreateGoogleUser } from "../services/googleAuth.service.js";

/**
 * Whether Google OAuth is configured. The strategy constructor throws if the
 * client id/secret are missing, so we guard registration — the server still
 * boots for developers who haven't set up Google, and the routes return a
 * friendly 503 instead.
 */
export const googleOAuthEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
);

if (googleOAuthEnabled) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL:
                    process.env.GOOGLE_CALLBACK_URL ||
                    "http://localhost:3000/api/auth/google/callback",
            },
            // Verify callback: resolve the profile to our user, then hand it to
            // the callback route which issues our standard JWT cookie.
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await findOrCreateGoogleUser(profile);
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
} else {
    console.warn(
        "[auth] Google OAuth disabled — set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable it."
    );
}

export default passport;
