const mongoose = require("mongoose");
const { User, Thought } = require("../models");

// Need to fixt all these

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // Get a thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) =>
                !thought ?
                res.status(404).json({ message: "No thought with that ID" }) :
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                // Push the thought to user's thoughts list
                return User.findOneAndUpdate({ _id: req.body.userId },
                    // $addToSet adds a value to an array unless the value is already present
                    { $addToSet: { thoughts: thought._id } },
                    // new: true show the changes
                    { new: true }
                );
            })
            .then((user) => {
                !user
                    ?
                    res.status(404).json({
                        message: "Thought is created! But user with the provided Id does not exist!",
                    }) :
                    res.status(200).json("Thought has been created!");
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Update thought with id
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
            .then((updateThought) =>
                !updateThought ?
                res
                .status(404)
                .json({ message: "No thought found with that ID :(" }) :
                res.json(updateThought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought ?
                res.status(404).json({ message: "No thought with that ID" }) :
                User.deleteMany({ _id: { $in: thought.thoughts } })
            )
            .then(() => res.json({ message: "Thought and thoughts deleted!" }))
            .catch((err) => res.status(500).json(err));
    },
    addThoughtReaction(req, res) {
        console.log("You are adding a reaction");
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
            .then((thought) =>
                !thought ?
                res
                .status(404)
                .json({ message: "No thought found with that ID :(" }) :
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThoughtReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true })
            .then((thought) =>
                !thought ?
                res
                .status(404)
                .json({ message: "No thought found with that ID :(" }) :
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};