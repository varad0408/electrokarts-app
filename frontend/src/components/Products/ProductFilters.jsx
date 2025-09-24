import React from 'react';

const categories = ['All', 'Mobiles', 'Laptops', 'Cameras', 'Tablets', 'Smartwatches', 'Refrigerators', 'ACs', 'Speakers'];

// This component now receives the filter values and the handler function as props
function ProductFilters({ filters, onFilterChange }) {
  // This is a single handler for all filter inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="product-filters" style={{ display: 'flex', gap: '20px', marginBottom: '20px', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
      
      <div className="filter-group">
        <label htmlFor="category-select" style={{ marginRight: '10px', color: 'white' }}>Category:</label>
        <select
          id="category-select"
          name="category" // The 'name' attribute is important
          value={filters.category}
          onChange={handleInputChange}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select" style={{ marginRight: '10px', color: 'white' }}>Sort By:</label>
        <select
          id="sort-select"
          name="sort" // The 'name' attribute is important
          value={filters.sort}
          onChange={handleInputChange}
        >
          <option value="latest">Latest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default ProductFilters;