const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
        min_length: 1,
    },
    createdAt: {
        default: Date.now,
        type: Date,
        get: (date) => {
            if (date) return date.toISOString().split("T")[0];
        },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        getter: true,
    },
    id: false,
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;