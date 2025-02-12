import { axiosInstance } from "./index";

// Get all reviews for a specific movie
export const getReviewsByMovie = async (movieId) => {
    try {
        const response = await axiosInstance.get(`/api/reviews/get-reviews/${movieId}`);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

// Add a single review
export const addReview = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/reviews/add-review', payload);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

// Get a single review by its id
export const getReviewById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/reviews/review/${id}`);
        return response.data;
    } catch (err) {
        return err.response;
    }
}

// Update a review
export const updateReview = async (payload) => {
    try {
        const response = await axiosInstance.put('/api/reviews/update-review', payload);
        return response.data;
    } catch (err) {
        return err.message;
    }
}

// Delete a review
export const deleteReview = async (payload) => {
    try {
        const response = await axiosInstance.delete('/api/reviews/delete-review', { data: payload });
        return response.data;
    } catch (err) {
        return err.message;
    }
}
