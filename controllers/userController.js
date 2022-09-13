const { User, Thought } = require('../models');

module.exports = {
    //create new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    //get all users
    getUsers(req, res) {
        User.find({})
            .populate({
                path: "thoughts",
                // select: "-__v"
            })
            .populate({
                path: "friends",
                // select: "-__v"
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUsersData => res.json(dbUsersData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    //get user by ID
    getUser(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: "No User found with provided ID" })
                    : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    },
    //update user by ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { runValidators: true, new: true }
        )
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: 'No User found with provided ID' })
                    : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    },
    //delete user by ID
    deleteUser(req, res) {
        //DELETE User
        User.findOneAndDelete({ _id: req.params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No User found with provided ID' });
                }
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            })
            .then(() => res.json({ message: 'User successfully deleted!' }))
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
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: 'No User found with provided ID' })
                    : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    }
};