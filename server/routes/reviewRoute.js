const router = require('express').Router();
const Movie = require('../models/movieModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');

// Add Review
router.post('/add-review', async (req, res) => {
    try {
        const { rating, description, movieId, userId } = req.body;

        // Ensure the movie and user exist
        const movie = await Movie.findById(movieId);
        const user = await User.findById(userId);

        if (!movie || !user) {
            return res.status(400).send({
                success: false,
                message: 'Invalid movie or user ID'
            });
        }

        // Create new review
        const newReview = new Review({
            rating,
            description,
            movie: movieId,
            user: userId
        });

        await newReview.save();
        res.send({
            success: true,
            message: 'Review has been added!',
            data: newReview
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});

// Fetch all reviews of a movie
router.get('/get-reviews/:movieId', async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const reviews = await Review.find({ movie: movieId }).populate('user', 'username');  // Populating user field with username

        res.send({
            success: true,
            message: 'Reviews fetched successfully!',
            data: reviews
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});

// Fetch a single review by ID
router.get('/review/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('user', 'username');
        if (!review) {
            return res.status(404).send({
                success: false,
                message: 'Review not found!'
            });
        }
        res.send({
            success: true,
            message: 'Review fetched successfully!',
            data: review
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});

// Update Review
router.put('/update-review', async (req, res) => {
    try {
        const { reviewId, rating, description } = req.body;
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { rating, description },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).send({
                success: false,
                message: 'Review not found to update!'
            });
        }

        res.send({
            success: true,
            message: 'Review has been updated!',
            data: updatedReview
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});

// Delete Review
router.delete('/delete-review', async (req, res) => {
    try {
        const { reviewId } = req.body;
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).send({
                success: false,
                message: 'Review not found to delete!'
            });
        }

        res.send({
            success: true,
            message: 'Review has been deleted!'
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;
