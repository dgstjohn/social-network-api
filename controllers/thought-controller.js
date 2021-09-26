const { User, Thought } = require('../models');

const thoughtController = {
        // get all thoughts
        getThoughts(req, res) {
            Thought.find({})
            .populate({
                path: 'users',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                res.json(err)
            });
        },

        // get single thought
        getSingleThought({ params }, res) {
            Thought.findOne({ _id: params.id })
              .populate({
                path: 'users',
                select: '-__v'
              })
              .select('-__v')
              .then(dbUserData => res.json(dbUserData))
              .catch(err => {
                console.log(err);
                res.sendStatus(400);
              });
          },

        // add thought to user
        createThoughts({ params, body }, res) {
          console.log(params);
          Thought.create(body)
            .then(({ _id }) => {
              return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
              );
            })
            .then(dbUserData => {
              console.log(dbUserData);
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
              }
              res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },

        // update a thought
        updateThought({ params, body }, res) {
            Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
              .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!' });
                  return;
                }
                res.json(dbUserData);
              })
              .catch(err => res.json(err));
          },

        // add reaction to thought
        addReaction({ params, body }, res) {
          Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
          )
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
              }
              res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },
      
        // remove thought
        deleteThought({ params }, res) {
          Tbought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
              if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
              return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { comments: params.thoughtId } },
                { new: true }
              );
            })
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
              }
              res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },
        // remove reaction
        deleteReaction({ params }, res) {
          Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
          )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
        }
};

module.exports = thoughtController;