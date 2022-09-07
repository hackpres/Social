const { Users, Thoughts, User } = require('../models');

const userController = {
    //create new user
    createUser(req, res) {
        Users.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    //get all users
    getUsers(req, res) {
        Users.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    //get user by ID
    getUser(req, res) {
        Users.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: "No user found with provided ID" })
                    : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    },
    //update user by ID
    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: 'No user found with provided ID' })
                    : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    },
    //delete user by ID
    deleteUser(req, res) {
            //delete users Thoughts first
        Thoughts.deleteMany({ _id: params.thoughtId })
        .then(() => {
                //then delete user
            Users.findOneAndDelete({ _id: req.params.userId })
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: 'No user found with provided ID' })
                    : res.json({ message: 'User successfully deleted!' })
            )
        })
        .catch((err) => res.status(500).json(err));
    },
    //create a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((dbUserData) =>
            !dbUserData
                ? res.status(404).json({ message: 'No User found with provided ID' })
                : res.json(dbUserData)
        )
        .catch((err) => res.status(500).json(err));
    },
    //delete a friend
    deleteFriend(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: params.friendId } },
            { runValidators: true, new: true }
        )
        .then((dbUserData) =>
        !dbUserData
            ? res.status(404).json({ message: 'No user found with provided ID' })
            : res.json(dbUserData)
        )
        .catch((err) => res.status(500).json(err));
    }
};

module.exports = userController;