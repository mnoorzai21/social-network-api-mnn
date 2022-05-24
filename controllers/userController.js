const mongoose = require("mongoose");
const { User, Thought } = require;

const headCount = async() =>
    Student.aggregate()
    .count("studentCount")
    .then((numberOfStudents) => numberOfStudents);