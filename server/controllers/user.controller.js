const User = require('../models/user.model');

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.allUsers = (req, res) => {
  User.find({})
    .then(users => res.json({ message: 'success', results: users }))
    .catch(error => res.json({ message: 'error', results: error }));
};

exports.userBoard = (req, res) => {
  User.find({ _id: req.params.id })
    .populate('recipes')
    .then(user => res.json({ message: 'success', results: user }))
    .catch(error => res.json({ message: 'error', results: error }));
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};
