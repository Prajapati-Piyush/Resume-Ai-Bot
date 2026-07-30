import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        // Password is only required for local (email/password) accounts.
        // Google accounts authenticate via OAuth and have no password.
        required: function () {
            return !this.googleId;
        }
    },

    googleId: {
        type: String,
        unique: true,
        // Sparse so the many local accounts (no googleId) don't collide on the
        // unique index. `default: undefined` keeps the field absent — not null —
        // for local users, which is what a sparse unique index needs.
        sparse: true,
        default: undefined
    },

    avatar: {
        type: String,
        default: null
    },

    resetPasswordToken: {
        type: String,
        default: null
    },

    resetPasswordExpires: {
        type: Date,
        default: null
    },
})

const userModel = mongoose.model("users", userSchema)

export default userModel
