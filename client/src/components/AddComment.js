import React from 'react'

function AddComment({userId, movieId}) {

    const [newComment, setNewComment] = React.useState({ username: "", rating: 5, comment: "" });
    const handleChange = (e) => { setNewComment({ ...newComment, [e.target.name]: e.target.value }); };

    const handleSubmit = async (e) => { e.preventDefault(); console.log(newComment); };



  return (
    <>
    <h2 className="text-xl font-bold mb-4">Add a Comment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="rating"
          value={newComment.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} Stars
            </option>
          ))}
        </select>
        <textarea
          name="comment"
          value={newComment.comment}
          onChange={handleChange}
          placeholder="Write your comment..."
          rows={3}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Comment
        </button>
      </form>
      </>
  )
}

export default AddComment