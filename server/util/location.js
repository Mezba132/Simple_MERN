const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'pk.eyJ1IjoibWV6YmExMzIiLCJhIjoiY2tqMWVydXA3MDU5aTJ5cGtwZGc2b2FkNyJ9.eZmP-febgi_9LvYVVsTtWg';

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };
  const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?types=address&access_token=${API_KEY}`
  );

  const data = response.data;
  console.log(data);

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = {
    lng : data.features[0].center[0],
    lat : data.features[0].center[1]
  }
  console.log(coordinates)
  return coordinates;
}

module.exports = getCoordsForAddress;
