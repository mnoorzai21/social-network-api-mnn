const mongoose = require("mongoose");
const { User, Thought } = require;

const headCount = async() =>
    Student.aggregate()
    .count("studentCount")
    .then((numberOfStudents) => numberOfStudents);

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then(async(users) => {
                const userObj = {
                    users,
                    headCount: await headCount(),
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then(async(user) =>
                !user ?
                res.status(404).json({ message: "No user with that ID" }) :
                res.json({
                    user,
                    grade: await grade(req.params.userId),
                })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
};