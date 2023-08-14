import React, { useState, useEffect } from 'react';
import Proudct from './Proudct';
import axios from "axios";

function Products({ Filtres, Sort, category }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get(category ? `http://localhost:5000/api/products?category=${category.toLowerCase()}` : 'http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [category]);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = [...products];

      if (Object.keys(Filtres || {}).length > 0) {
        filtered = filtered.filter(item =>
          Object.entries(Filtres).every(([key, value]) => {
            if (key === 'price') {
              return item[key] <= parseInt(value);
            } else {
              return item[key].includes(value);
            }
          })
        );
      }

      if (Sort === 'newest') {
        filtered.sort((a, b) => a.createdAt - b.createdAt);
      } else if (Sort === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (Sort === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [products, Filtres, Sort]);

  return (
    <div>
      <div className="flex items-center justify-center py-8">
        <div className="bg-black rounded-full p-4 shadow-md">
          <h1 className="text-4xl font-semibold text-white">
            <span className="relative inline-block">
              <span className="relative">{category ? category : 'Products'}</span>
            </span>
          </h1>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((item) => (
            <Proudct key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
