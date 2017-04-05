var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Movie = new Schema({
    title: String,
    rating: Number,
    isReleased: { type: Boolean, default: false }
});

module.exports = mongoose.model("movie", Movie);