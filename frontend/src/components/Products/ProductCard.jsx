import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product: product._id, name: product.name, price: product.price, imageUrls: product.imageUrls, qty: 1 }));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`} className="product-card__image-wrap">
        <img
          src={product.imageUrls?.[0] || 'https://via.placeholder.com/300?text=No+Image'}
          alt={product.name}
          className="product-card__image"
        />
      </Link>
      <div className="product-card__body">
        <Link to={`/product/${product.slug}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        <p className="product-card__price">₹{Number(product.price).toLocaleString('en-IN')}</p>
        <button onClick={handleAddToCart} className="btn-add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;