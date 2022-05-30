const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
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
  },
  {
    toJSON: {
      getter: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
