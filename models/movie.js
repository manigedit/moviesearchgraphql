const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },
    locations: {
        type: Array,
        default: [],
        required: false
    },
    production_company: {
        type: String,
        required: false
    },
    director: {
        type: String,
        required: false
    },
    actor1: {
        type: String,
        required: false
    },
    actor2: {
        type: String,
        required: false
    },
    actor3: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('Movie', movieSchema);
