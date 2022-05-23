const { Schema, Type } = require("mongoose");

const thoughtSchema = new Schema({
    thoughtId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
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
    // Need to fix this
    reactions: {
        // Array of nested documents created with the reactionSchema
    },
}, {
    toJSON: {
        getter: true,
    },
    id: false,
});