import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Category from './Category';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="bg-gray-100">
    <div className="flex items-center justify-center py-8">
  <div className="bg-white rounded-full p-4 shadow-md">
    <h1 className="text-4xl font-semibold text-gray-800">
      <span className="relative inline-block">
        <span className="relative">Categories</span>
      </span>
    </h1>
  </div>
</div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center -mx-4">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8"
              >
                <Category item={category} />
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
