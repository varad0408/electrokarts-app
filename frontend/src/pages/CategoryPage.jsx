import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/Products/ProductCard';

function CategoryPage() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (categoryName) {
      // Correctly call the unified fetchProducts action
      dispatch(fetchProducts({ category: categoryName }));
    }
  }, [dispatch, categoryName]);

  if (status === 'loading') return <p style={{ color: 'white', textAlign: 'center' }}>Loading Products...</p>;
  if (error) return <p className="error" style={{ textAlign: 'center' }}>{error}</p>;

  return (
    <div className="content-wrapper">
      <h1 className="category-title">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p style={{ color: 'white' }}>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;