const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

// Schema to create User model
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        max_length: 50,
    },
    lastName: {
        type: String,
        required: true,
        max_length: 50,
    },
    email: {
        type: String,
        required: true,
        max_length: 50,
    },
    phone: {
        type: Number,
        required: true,
        max_length: 15,
    },
    thoughts: [thoughtSchema],
}, {
    toJSON: {
        getters: true,
    },
});

const User = model("user", userSchema);

model.export = User;