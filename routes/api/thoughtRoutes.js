const router = require('express').Router();

const {
    createThought,
    getThoughts,
    getThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

    //GET all and POST
        // /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);
    //Get one, PUT, and DELETE
        // /api/thoughts/:id
router.route('/:id')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);
    //POST reaction
        // /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(createReaction);
    //Delete reaction
        // /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;