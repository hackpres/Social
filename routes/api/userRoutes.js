const router = require('express').Router();
    //require userController functions
const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

    //GET all and POST
        // /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);
    //GET one, PUT, and DELETE
        // /api/users/:id
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);
    //Get one, POST, and DELETE friend
        // /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;