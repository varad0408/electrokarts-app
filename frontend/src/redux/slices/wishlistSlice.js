import { createSlice } from '@reduxjs/toolkit';

const wishlistFromStorage = localStorage.getItem('wishlist')
  ? JSON.parse(localStorage.getItem('wishlist'))
  : { wishlistItems: [] };

const initialState = {
  wishlistItems: wishlistFromStorage.wishlistItems,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existItem = state.wishlistItems.find((x) => x.product === item.product);

      if (!existItem) {
        state.wishlistItems.push(item);
      }
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (x) => x.product !== action.payload
      );
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;