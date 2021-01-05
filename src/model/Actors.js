const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");
const ActorSchema = new Schema({

    role: {
        type: String,
        required: true
    }
});
const ActorsSchema = new Schema({
    actorname: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    actorss: [ActorSchema]

});
module.exports = Actors = mongoose.model('Actors', ActorsSchema);