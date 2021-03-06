const { validationResult } = require('express-validator');
const Place = require('../models/place');
const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const mongoose = require('mongoose');
const User = require("../models/user");

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  let place

  try {
    place = await Place.findById(placeId);
  }
  catch (e) {
    const err = new HttpError('Could Not find a place by id', 500);
    return next(err);
  }

  if (!place) {
    const err = new HttpError('Could not find a place for the provided id.', 404);
    return next(err);
  }

  res.json({ place : place.toObject({ getters : true }) }); // => { place } => { place: place }
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate('places');
  } catch (err) {
    const error = new HttpError(
        'Fetching places failed, please try again later',
        500
    );
    return next(error);
  }

  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(
        new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({
    places: userWithPlaces.places.map(place =>
        place.toObject({ getters: true })
    )
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, image, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  // const title = req.body.title;
  const createdPlace =  new Place ({
    title,
    description,
    image,
    address,
    location: coordinates,
    creator
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }

  // console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save();
    await user.places.push(createdPlace);
    await user.save();
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
        'Creating place failed, please try again and again.',
        500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace.toObject({ getters : true }) });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next ( new HttpError('Invalid inputs passed, please check your data.', 422) );
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
        'Something went wrong, could not update place.',
        500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
        'Something went wrong, could not update place.',
        500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate('creator');
  } catch (err) {
    const error = new HttpError(
        'Something went wrong, could not delete place.',
        500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError('Could not find place for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove();
    place.creator.places.pull(place);
    await place.creator.save();
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
        'Something went wrong, could not delete place, try again.',
        500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted place.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
