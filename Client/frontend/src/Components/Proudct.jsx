import React, { useState } from 'react';
import LinkIcon from '@mui/icons-material/Link';

function Product({ item }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className="relative m-2 flex items-center justify-center min-w-[280px] h-[350px] rounded-lg bg-white shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute top-0 left-0 w-1/2 h-[200px] bg-white rounded-full overflow-hidden ${
          hovered ? 'hidden sm:block' : ''
        }`}
      ></div>
      <img className="object-cover h-[75%] z-10" src={item.images[0]} alt={item.title} />
      <div
        className={`absolute top-0 left-0 w-full z-[999] h-full flex items-center justify-center transition-opacity ${
          hovered ? 'opacity-100 cursor-pointer' : 'opacity-0'
        }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <div className="flex space-x-4">
          
          <a href={`/product/${item._id}`}>
            <div className="w-10 h-10 flex justify-center items-center bg-white rounded-full hover:bg-[#e0f5f5] hover:scale-110 transition duration-300 ease">
              <LinkIcon />
            </div>
          </a>
          
        </div>
      </div>
    </div>
  );
}

export default Product;
