const { Thought, User } = require('../models');

module.exports = {
    //create new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No Thought found with provided ID' })
                    : res.json({ message: 'Thought successfully created!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    //get all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbThoughtsData) => res.json(dbThoughtsData))
            .catch((err) => res.status(500).json(err));
    },
    //get thought by ID
    getThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select('-__v')
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No Thought found with provided ID' })
                    : res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    //update thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { runValidators: true, new: true }
        )
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No Thought found with provided ID' })
                    : res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    //delete thought by ID
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No Thought found with provided ID' })
                    //update User with removed thought
                    : User.findOneAndUpdate(
                        { thoughts: req.params.id },
                        { $pull: { thoughts: req.params.id } },
                        { new: true }
                    ).then(res.json({ message: 'Thought successfully deleted!' }))
            )
            .catch((err) => res.status(500).json(err));
    },
    //create new reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No Thought found with provided ID' })
                    : res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    //delete reaction by ID
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    }
};