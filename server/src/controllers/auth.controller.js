import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import tokenBlacklistModel from "../models/blacklist.model.js";

export async function register(req, res) {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email, password"
        })
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ userName: username }, { email }]
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({ message: "Account already exists with this email address or username" })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        userName: username,
        email,
        password: hashed
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.userName,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT_SECRET is not configured" });
    }

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000, //1 day
    })

    res.status(201).json({
        message: "User registered successfulyy",
        user: {
            id: user._id,
            username: user.userName,
            email: user.email
        }
    })



}


export async function login(req, res) {
    try {
        console.log("[auth] login hit", {
            hasBody: !!req.body,
            email: req.body?.email,
        });

        const { email, password, rememberMe } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT_SECRET is not configured" });
        }

        const tokenExpiry = rememberMe ? "30d" : "1d";
        const maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

        const token = jwt.sign(
            {
                id: user._id,
                username: user.userName,
            },
            process.env.JWT_SECRET,
            { expiresIn: tokenExpiry }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge,
        });

        return res.status(200).json({
            message: "User loggedIn successfully",
            user: {
                id: user._id,
                username: user.userName,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("[auth] login error", err);
        return res.status(500).json({ message: "Login failed", error: err?.message });
    }
}


export async function logoutUser(req, res) {
    const token = req.cookies.token;

    if (token) {
        await tokenBlacklistModel.create({ token })
    }
    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}


export async function getMe(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User details fetched successfully",
        user:{
            id: user._id,
            name:user.userName,
            email:user.email
        }
    })
}

export async function forgotPassword(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Please provide your email address" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No account found with this email address" });
        }

        // Generate a random reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Hash the token and store it with expiry (1 hour)
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
        await user.save();

        // In production, send this via email. For now, return it for testing.
        return res.status(200).json({
            message: "Password reset link sent to your email",
            resetToken, // Only returned in dev/test — remove this in production
            expiresIn: "1 hour",
        });
    } catch (error) {
        console.error("[auth] forgotPassword error", error);
        return res.status(500).json({ message: "Failed to process forgot password request" });
    }
}

export async function resetPassword(req, res) {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: "Please provide token and new password" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Hash the incoming token to match stored hash
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await userModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Token is invalid or has expired" });
        }

        // Update password and clear reset fields
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        return res.status(200).json({ message: "Password reset successful. You can now log in with your new password." });
    } catch (error) {
        console.error("[auth] resetPassword error", error);
        return res.status(500).json({ message: "Failed to reset password" });
    }
}
