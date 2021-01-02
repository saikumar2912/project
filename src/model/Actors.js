const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");
const ActorsSchema = new Schema({

    role: {
        type: String,
        required: true
    },
    actorname: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }


});
module.exports = Actors = mongoose.model('Actors', ActorsSchema);