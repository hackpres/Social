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
router.route('/').get(getUsers).post(createUser);
    //GET one, PUT, and DELETE
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
    //Get one, POST, and DELETE friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;