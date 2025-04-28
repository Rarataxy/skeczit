const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, avatar } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ msg: 'Username already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: avatar || 'default-avatar.png',
    });

    await newUser.save();

    res.status(201).json({ user: newUser });
})

const showUserDetails = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({username: req.params.username});
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }
    const user_safe = {
        username: user.username,
        avatar: user.avatar
    }
    res.json(user_safe);
})

const loginUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: 'Bad email' });
  }

  const samePassword = await bcrypt.compare(password, user.password);

  if (samePassword) {
    const user_safe = {
      username: user.username,
      avatar: user.avatar
    }
    return res.json(user_safe);
  }
  return res.status(403).json({ msg: 'Bad credentials.'})
})

module.exports = {
    createUser,
    showUserDetails,
    loginUser
};