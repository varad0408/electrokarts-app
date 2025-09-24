import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/slug/${slug}`);
        setProduct(data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>;
  if (error) return <p style={{ color: 'white', textAlign: 'center' }}>{error}</p>;

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      {product.imageUrls && product.imageUrls.length > 0 && (
        <img src={product.imageUrls[0]} alt={product.name} style={{ maxWidth: '400px' }} />
      )}
      <p>{product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
    </div>
  );
}

export default ProductPage;
