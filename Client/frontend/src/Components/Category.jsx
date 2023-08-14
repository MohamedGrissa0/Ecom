import React from 'react';
import { Link } from 'react-router-dom';

function Category({ item }) {
  const { name, img } = item;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
      <Link to={`/products/${name.toLowerCase()}`} className="block">
        <div className="flex justify-center items-center my-2 h-48">
          <img src={img} alt={name} className="object-cover max-h-full max-w-full" />
        </div>
        <hr className="border-t-2 border-gray-200 my-4 mx-auto w-1/2" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-center text-gray-800 truncate">{name}</h3>
        </div>
      </Link>
    </div>
  );
}

export default Category;
