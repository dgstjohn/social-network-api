const router = require('express').Router();
const {
    getThoughts, // written (check module/watch)
    getSingleThought, // written (check module/watch)
    createThought, // written
    updateThought, // written (check module/watch)
    deleteThought, //written
    addReaction, // written
    deleteReaction // written
} = require('../../controllers/thought-controller');


// for /api/thoughts
// GET to get all thoughts
// POST to create a new thought
// (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.route('/').get(getThoughts).post(createThought);

// GET to get a single thought by its _id
// PUT to update a thought by its _id
// DELETE to remove a thought by its _id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// for /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
router.route('/:thoughtId/reactions').post(addReaction);
// DELETE to pull and remove a reaction by the reaction's reactionId value
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;