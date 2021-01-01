const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb+srv://admin-mezba:mezba017529@cluster0.y37cv.mongodb.net/mernDB', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(!err) {
        console.log('MongooDB connection successfull');
    }
    else
    {
        console.log('Error in DB connection' + JSON.stringify(err, undefined,2));
    }
});

module.exports = mongoose;