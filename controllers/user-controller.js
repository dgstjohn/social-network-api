const { User } = require('../models');

const userController = {
    // get all users
    getUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => {
          res.json(dbUserData)
        })
        .catch(err => {
            res.status(500).json(err)
        });
    },

    // get a single user by id and populated data
    getSingleUser({ params }, res) {
        User.findOne({ _id: params.userId })
          .select('-__v')
          .populate('friends')
          .populate('thoughts')
          .then(dbUserData => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user found with this id!'})
            }
            res.json(dbUserData)
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    // post a new user
    createUser(req, res) {
        User.create(req.body)
          .then(dbUserData => {
            res.json(dbUserData)
          })
          .catch(err => res.status(500).json(err));
      },

    // update a user (PUT)
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
          })
          .catch(err => {
            res.status(500).json(err)
          });
      },

    // delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then(dbUserData => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json({ message: "User deleted!" })
          })
          .catch(err => {
            res.status(500).json(err)
          });
      },

      // add a friend
      addFriend(req, res) {
          User.findOneAndUpdate(
              { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId }},
          { new: true }
          )
          .then(dbUserData => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
          })
          .catch(err => {
            res.status(500).json(err)
          });
      },

      // delete a friend
      deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
        { $pull: { friends: req.params.friendId }},
        { new: true })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          res.status(500).json(err)
        });
    }

}

module.exports = userController;