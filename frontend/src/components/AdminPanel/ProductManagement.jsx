import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await apiClient.get('/products');
      // ✅ Prevent unnecessary re-renders if data is same
      setProducts(prev => JSON.stringify(prev) === JSON.stringify(data) ? prev : data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await apiClient.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product');
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h3>Product Management</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td>
                {/* You can add an edit link here */}
                <button onClick={() => deleteHandler(p._id)} className="btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
