import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../redux/slices/productSlice';
import Reviews from '../Reviews';
import { addToCart } from '../../redux/slices/cartSlice';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentProduct: product, status, error } = useSelector((state) => state.products);

  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    document.body.classList.add('light-theme');
    return () => {
      document.body.classList.remove('light-theme');
    };
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  // --- GUARD CLAUSES: We check for loading/error states FIRST ---
  if (status === 'loading') {
    return <p style={{ color: 'black', textAlign: 'center' }}>Loading Product...</p>;
  }

  if (error) {
    return <p className="error" style={{ textAlign: 'center' }}>{error}</p>;
  }

  // This is the most important check. It prevents the crash.
  if (!product) {
    return <p style={{ color: 'black', textAlign: 'center' }}>Product not found.</p>;
  }

  // --- This code only runs AFTER we know the product exists ---

 const handleAddToCart = () => {
  dispatch(addToCart({
    product: product.slug,   // ✅ use slug consistently
    name: product.name,
    price: product.price,
    imageUrls: product.imageUrls,
    qty: 1,
    ...selectedVariants
  }));
  alert(`${product.name} added to cart!`);
};


  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const groupedVariants = (product.variants || []).reduce((acc, variant) => {
    acc[variant.type] = acc[variant.type] || [];
    acc[variant.type].push(variant);
    return acc;
  }, {});

  const handleVariantSelect = (type, value) => {
    setSelectedVariants(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-image-gallery">
        <img 
          src={product.imageUrls?.[0] || '/images/placeholder.jpg'} 
          alt={product.name} 
          className="product-detail-main-image" 
        />
      </div>

      <div className="product-detail-info">
        <h1 className="product-detail-name">{product.name} {product.color && `(${product.color})`}</h1>
        <p className="product-detail-price">₹{product.price.toLocaleString()}.00</p>

        {product.keyFeatures && product.keyFeatures.length > 0 && (
          <div className="key-features">
            <h4>Key Features</h4>
            <ul>
              {product.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {Object.entries(groupedVariants).map(([type, options]) => (
          <div key={type} className="product-variants">
            <h4 className="variant-title">{type}</h4>
            <div className="variant-options">
              {options.map((option) => (
                <button
                  key={option.value}
                  className={`variant-button ${selectedVariants[type] === option.value ? 'active' : ''}`}
                  onClick={() => handleVariantSelect(type, option.value)}
                >
                  {option.value}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="product-detail-actions">
          <button onClick={handleBuyNow} className="btn-buy-now">Buy Now</button>
          <button onClick={handleAddToCart} className="btn-add-to-cart">Add to Cart</button>
        </div>
      </div>

      <div className="product-detail-reviews">
        <Reviews productId={product._id} reviews={product.reviews || []} />
      </div>
    </div>
  );
}

export default ProductDetail;