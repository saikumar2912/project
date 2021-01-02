const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    moviename: {
        type: String,
        required: true
    },
    movieGenre: {
        type: String,
        required: true
    },
    movieRating: {
        type: String,
        required: true
    },
    movieLanguage: {
        type: String,
        required: true
    },
    movieReleaseDate: {
        type: String,
        required: true
    },
    movieDirector: {
        type: String,
        required: true
    },
    movieDuration: {
        type: String,
        required: true,
    },





});


module.exports = User = mongoose.model('project', UserSchema);