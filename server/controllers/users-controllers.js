const { validationResult } = require('express-validator');
const User = require('../models/user');

const HttpError = require('../models/http-error');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  }
  catch (e) {
    const err = new HttpError('Could not retrieve any data from db', 500);
    return next(err);
  }

  res.json({
    users: users.map( user => user.toObject({ getters : true }) )
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next ( new HttpError('Invalid inputs passed, please check your data.', 422) );
  }
  const { name, email, password } = req.body;

  let existingEmail;
  try {
    existingEmail = await User.findOne({ email : email }).exec();
  }
  catch (e) {
    const err = new HttpError('Sign up failed, try again!');
    return next(err);
  }

  if(existingEmail)
  {
    const err = new HttpError('Email already exist, try again!');
    return next(err);
  }

  const createdUser = new User({
    name,
    email,
    password,
    image:'https://pbs.twimg.com/profile_images/1322781586513895425/G_stL2vh_400x400.jpg',
    places : []
  });

  try {
    await createdUser.save();
  }
  catch (e) {
    const error = new HttpError('Data not saved in db', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters : true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
        'Logging in failed, please try again later.',
        500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
    );
    return next(error);
  }

  res.json({message: 'Logged in!'});
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
