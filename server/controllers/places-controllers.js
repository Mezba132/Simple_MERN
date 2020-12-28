const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const Place = require('../models/place');
const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');

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

  let places;

  try {
    places = await Place.find({ creator : userId }).exec();
  }
  catch (e) {
    const err = new HttpError('Could Not find a user by id', 500);
    return next(err);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({
    places : places.map( places => places.toObject({ getters : true }) )
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, image, address, coordinates, creator } = req.body;

  // let coordinates;
  // try {
  //   coordinates = await getCoordsForAddress(address);
  // } catch (error) {
  //   return next(error);
  // }

  // const title = req.body.title;
  const createdPlace =  new Place ({
    title,
    description,
    image,
    address,
    location: coordinates,
    creator
  });

  try {
    await createdPlace.save();
  }
  catch (e) {
    const error = new HttpError('Data not saved in db', 500);
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
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
        'Something went wrong, could not delete place.',
        500
    );
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError(
        'Something went wrong, could not delete place.',
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
