const { Thoughts } = require('../models');

const thoughtController = {
    //create new thought
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },
    //get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    //get thought by ID
    getThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId})
        .select('-__v')
        .then((thoughtData) =>
            !thoughtData
                ? res.status(404).json({ message: 'No Thought found with provided ID' })
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
    },
    //update thought by ID
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thoughtData) =>
            !thoughtData
                ? res.status(404).json({ message: 'No Thought found with provided ID' })
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
    },
    //delete thought by ID
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thoughtData) =>
            !thoughtData
                ? res.status(404).json({ message: 'No Thought found with provided ID' })
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
    },
    //create new reaction
    createReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
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
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) =>
            !dbThoughtData
                ? res.status(404).json({ message: 'No Thought found with provided ID' })
                : res.json(dbThoughtData)
        )
        .catch((err) => res.status(500).json(err));
    }
};

module.exports = thoughtController;