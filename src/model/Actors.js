  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");
const ActorsSchema = new Schema({
    users:{
        type: Schema.Types.ObjectId,
        ref: 'user'
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