import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

// Helper component to render star ratings visually
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} style={{ color: i <= rating ? '#ffc107' : '#e4e5e9', fontSize: '1.2rem' }}>
        ★
      </span>
    );
  }
  return <div>{stars}</div>;
};

function Reviews({ productId, reviews }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await apiClient.post(`/products/${productId}/review`, { rating, comment });
      setLoading(false);
      setSuccess('Review submitted! It will appear after the page is refreshed.');
      setRating(5);
      setComment('');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to submit review.');
    }
  };

  return (
    <div className="reviews-section" style={{ marginTop: '2rem' }}>
      <h3>Customer Reviews</h3>
      
      {/* Display Existing Reviews */}
      {reviews && reviews.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {reviews.map((review) => (
            <li key={review._id} style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
              <strong>{review.name}</strong>
              <StarRating rating={review.rating} />
              <p>{review.comment}</p>
              <small>{new Date(review.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}

      {/* Review Submission Form */}
      <div className="review-form-container" style={{ marginTop: '2rem' }}>
        <h4>Write a Review</h4>
        {isLoggedIn ? (
          <form onSubmit={submitHandler}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="rating">Rating: </label>
              <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                style={{ width: '100%', display: 'block' }}
              ></textarea>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        ) : (
          <p>
            Please <Link to="/login">log in</Link> to write a review.
          </p>
        )}
      </div>
    </div>
  );
}

export default Reviews;