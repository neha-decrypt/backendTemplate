const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    walletAddress: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    username: {
        type: String,
        default: "",
    },
    fullname: {
        type: String,
    },
    email: {
        type: String,
    },
    secondaryEmail: {
        type: String,
    },

    profileIcon: String,

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    status: {
        //0 - Inactive & 1 - Active
        type: Number,
        enum: [0, 1],
        default: 1,
    },

    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    lastUpdatedOn: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);
