const mongoose = require("mongoose");
const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : res.status(200).json({
              message: "User successfully deleted!",
            });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update user with id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updateUser) =>
        !updateUser
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(updateUser)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add friend
  addFriend(req, res) {
    console.log("You are adding a friend");
    User.findOneAndUpdate(
      { id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        console.log(user);
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  // remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
