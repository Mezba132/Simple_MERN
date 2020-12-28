const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    title : { type : String, required : true},
    description : { type : String, required : true},
    image : { type : String, required : true},
    address : { type : String, required : true},
    location : {
        lan : { type : String, required : true},
        lat : { type : String, required : true}
    },
    creator : { type : mongoose.types.ObjectID, required : true, ref : 'User'}
})

module.exports = mongoose.model('Place', placeSchema);
