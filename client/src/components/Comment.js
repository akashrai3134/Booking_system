import React from 'react'

function Comment({username, rating, comment}) {
    return (
        <div className="bg-white shadow-md rounded-2xl p-5 w-full max-w-md border border-gray-200">
          {/* Username and Rating Section */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-gray-900">{username}</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className={`text-xl ${index < rating ? "text-yellow-400" : "text-gray-300"}`}>
                  {index < rating ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>
    
          {/* Comment Section */}
          <p className="mt-2 text-gray-700">{comment}</p>
        </div>
      );
}

export default Comment