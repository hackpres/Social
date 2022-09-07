const { Users, Thoughts } = require('../models');

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
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: "No user found with provided ID" })
                    : res.json(userData)
            )
            .catch((err) => res.status(500).json(err));
    },
    //update user by ID
    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: 'No user found with provided ID' })
                    : res.json(userData)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //delete user by ID
    deleteUser(req, res) {
            //delete users Thoughts first
        Thoughts.deleteMany({ _id: params.id})
        .then(() => {
                //then delete user
            Users.findOneAndDelete({ _id: req.params.id })
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: 'No user found with provided ID' })
                    : res.json({ message: 'User successfully deleted!' })
            )
        })
        .catch((err) => res.status(500).json(err));
    },
    //delete a friend
    deleteFriend(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: params.friendId } },
            { runValidators: true, new: true }
        )
        .then((userData) =>
        !userData
            ? res.status(404).json({ message: 'No user found with provided ID' })
            : res.json(userData)
        )
        .catch((err) => res.status(500).json(err));
    }
};

module.exports = userController;