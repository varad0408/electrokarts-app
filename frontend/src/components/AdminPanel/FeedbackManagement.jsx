import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchFeedback = async () => {
    try {
      const { data } = await apiClient.get('/feedback');
      // ✅ Prevent unnecessary re-renders
      setFeedbacks(prev => JSON.stringify(prev) === JSON.stringify(data) ? prev : data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  if (loading) return <p>Loading feedback...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h3>User Feedback</h3>
      <ul>
        {feedbacks.map(fb => (
          <li key={fb._id} style={{borderBottom:'1px solid #ccc', padding:'10px 0'}}>
            <p><strong>{fb.user?.name || 'User'}</strong> ({fb.user?.email || ''})</p>
            <p>{fb.message}</p>
            <small>{new Date(fb.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
