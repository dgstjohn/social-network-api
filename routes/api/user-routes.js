const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

// for /api/users
// GET all users
// POST new user
router.route('/').get(getUsers).post(createUser);

// GET single user by its _id and populated thought and friend data
// PUT to update user by its _id
// DELETE to remove user by its id
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// for /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

// BONUS: remove user's associated thoughts when deleted

module.exports = router;