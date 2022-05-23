const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

// Schema to create User model
const userSchema = new Schema({
    userName: {
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
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },

    // Need to make sure
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "friends",
    }, ],
    thoughts: [thoughtSchema],
}, {
    toJSON: {
        getters: true,
    },
});

const User = model("users", userSchema);

model.export = User;