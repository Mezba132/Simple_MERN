const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Places', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(!err) {
        console.log('MongooDB connection successfull');
    }
    else
    {
        console.log('Error in DB connection' + JSON.stringify(err, undefined,2));
    }
});

module.exports = mongoose;