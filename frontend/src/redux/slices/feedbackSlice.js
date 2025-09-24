import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

// Async thunk for submitting feedback
export const submitFeedback = createAsyncThunk(
  'feedback/submit',
  async (feedbackData, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post('/feedback', feedbackData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for fetching all feedback (admin)
export const fetchAllFeedback = createAsyncThunk(
  'feedback/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get('/feedback');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  feedbacks: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Submit Feedback
      .addCase(submitFeedback.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feedbacks.push(action.payload); // Optionally add to state
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch All Feedback
      .addCase(fetchAllFeedback.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllFeedback.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feedbacks = action.payload;
      })
      .addCase(fetchAllFeedback.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;