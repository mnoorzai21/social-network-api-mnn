const router = require("express").Router();

const {
    getUsers,
    getSingleUser,
    createUser,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser);

module.exports = router;

// Need to make sure that the
// GET a single user by its _id and populated thought and friend data
// is ok