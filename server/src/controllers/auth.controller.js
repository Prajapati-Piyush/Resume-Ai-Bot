import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000  //1 day
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
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    console.log();

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)


    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.userName,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000  //1 day
    })

    res.status(200).json({
        message: "User loggedIn successfully",
        user: {
            id: user._id,
            username: user.userName,
            email: user.email

        }
    })
}

export async function logoutUser(req, res) {
    const token = req.cookie.token

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