import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  const removeHandler = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlist.wishlistItems.length === 0 ? (
        <p>Your wishlist is empty. <Link to="/">Shop now</Link></p>
      ) : (
        <ul>
          {wishlist.wishlistItems.map(item => (
            <li key={item._id}>
              <img src={item.imageUrl} alt={item.name} width="50" />
              <Link to={`/product/${item._id}`}>{item.name}</Link>
              <span>₹{item.price}</span>
              <button onClick={() => removeHandler(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}