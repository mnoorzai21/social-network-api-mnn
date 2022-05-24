const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        max_length: 50,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        required: "Email address is required",
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },

    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }, ],
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought",
    }, ],
}, {
    toJSON: {
        getters: true,
    },
});

const User = model("User", userSchema);

module.exports = User;