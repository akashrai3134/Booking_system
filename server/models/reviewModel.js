
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number, 
        required: true    
    },
    description: {
        type: String, 
        required: true    
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

module.exports = mongoose.model('reviews', reviewSchema)