import jwt from "jsonwebtoken";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Sign the app's standard session JWT. Payload shape matches what login /
 * register issue ({ id, username }) so a Google session is indistinguishable
 * from a local one to the rest of the app.
 */
export function signSessionToken(user, expiresIn = "1d") {
    return jwt.sign(
        { id: user._id, username: user.userName },
        process.env.JWT_SECRET,
        { expiresIn }
    );
}

/** Set the httpOnly session cookie with the same options used everywhere else. */
export function setSessionCookie(res, token, maxAge = DAY_MS) {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge,
    });
}
