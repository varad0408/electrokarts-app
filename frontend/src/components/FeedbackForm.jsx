import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitFeedback } from '../redux/slices/feedbackSlice';

export default function FeedbackForm() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.feedback);

  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted && status === 'succeeded') {
      setMessage('');
    }
  }, [submitted, status]);

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(submitFeedback({ message }));
  };

  const loading = status === 'loading';
  const showSuccess = submitted && status === 'succeeded';

  return (
    <div className="feedback-container">
      <h2>Send us your Feedback</h2>
      <form onSubmit={submitHandler} className="feedback-form">
        <textarea
          className="feedback-textarea"
          rows="5"
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading || !message.trim()} className="btn-submit">
          {loading ? <span className="btn-spinner" aria-label="Loading" /> : 'Send Feedback'}
        </button>
      </form>
      {showSuccess && <p className="feedback-success">Thank you for your feedback!</p>}
      {error && <p className="feedback-error">{error}</p>}
    </div>
  );
}