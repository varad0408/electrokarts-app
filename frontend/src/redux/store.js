import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import feedbackReducer from './slices/feedbackSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice'; // 1. IMPORT the product reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer, // 2. ADD the product reducer here
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
    feedback: feedbackReducer,
  },
});