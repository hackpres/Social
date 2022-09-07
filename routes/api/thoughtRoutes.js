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
router.route('/').get(getThoughts).post(createThought);
    //Get one, PUT, and DELETE
router.route('/:id').get(getThought).put(updateThought).delete(deleteThought);
    //POST reaction
router.route('/:thoughtId/reactions').post(createReaction);
    //Delete reaction
router.route(':thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;