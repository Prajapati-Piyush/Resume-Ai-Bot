import userModel from "../models/user.model.js";

/**
 * Derive a unique userName from the Google display name / email.
 * Tries a slug first, then appends short random suffixes until one is free.
 */
async function generateUniqueUserName(base) {
    const slug =
        (base || "user")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "")
            .slice(0, 20) || "user";

    let candidate = slug;
    for (let i = 0; i < 5; i++) {
        const taken = await userModel.exists({ userName: candidate });
        if (!taken) return candidate;
        candidate = `${slug}${Math.floor(1000 + Math.random() * 9000)}`;
    }
    // extremely unlikely fallback — timestamp suffix is effectively unique
    return `${slug}${Date.now().toString().slice(-6)}`;
}

/**
 * Resolve a Google profile to a user record, in priority order:
 *   1. Already linked  → find by googleId.
 *   2. Same email as an existing (local) account → link googleId onto it.
 *   3. Brand new       → create a passwordless account.
 *
 * Returns the Mongoose user document.
 */
export async function findOrCreateGoogleUser(profile) {
    const googleId = profile.id;
    const email = profile.emails?.[0]?.value?.toLowerCase();
    const displayName = profile.displayName || email?.split("@")[0] || "user";
    const avatar = profile.photos?.[0]?.value || null;

    if (!googleId) throw new Error("Google profile is missing an id");
    if (!email) throw new Error("Google account did not provide an email address");

    // 1) already linked
    const linked = await userModel.findOne({ googleId });
    if (linked) return linked;

    // 2) existing local account with the same email → link it
    const existing = await userModel.findOne({ email });
    if (existing) {
        existing.googleId = googleId;
        if (!existing.avatar && avatar) existing.avatar = avatar;
        await existing.save();
        return existing;
    }

    // 3) new passwordless account
    const userName = await generateUniqueUserName(displayName);
    return userModel.create({ googleId, email, userName, avatar });
}
