// Create web server
// Create a route to get all comments
// Create a route to get a comment by id
// Create a route to create a comment
// Create a route to update a comment
// Create a route to delete a comment

const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Import comment model
const Comment = require('../models/comment');

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a comment by id
router.get('/:id', getComment, (req, res) => {
  res.json(res.comment);
});

// Create a comment
router.post('/', async (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a comment
router.patch('/:id', getComment, async (req, res) => {
  if (req.body.name != null) {
    res.comment.name = req.body.name;
  }
  if (req.body.email != null) {
    res.comment.email = req.body.email;
  }
  if (req.body.comment != null) {
    res.comment.comment = req.body.comment;
  }
  try {
    const updatedComment = await res.comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a comment
router.delete('/:id', getComment, async (req, res) => {
  try {
    await res.comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getComment(req, res, next) {
  let comment;
  try {
    comment = await Comment.findById(req.params.id);
    if (comment == null) {
      return res.status(404).json({ message: 'Cannot