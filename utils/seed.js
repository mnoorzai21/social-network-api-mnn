const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { getRandomUsername, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async() => {

            // Drop existing courses
            await Thought.deleteMany({});

            // Drop existing students
            await User.deleteMany({});

            // Create empty array to hold the students
            const users = [];

            await User.collection.insertMany(students);

            await Thought.collection.insertOne({
                tName: 'UCLA',
                inPerson: false,
                students: [...students],
            });