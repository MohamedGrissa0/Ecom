import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

function Slider() {
  const [slides, setSlides] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const slideCount = slides.length;

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/slides');
      setSlides(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (dir) => {
    if (dir === 'left') {
      setSlideIndex((prevIndex) => (prevIndex === 0 ? slideCount - 1 : prevIndex - 1));
    } else if (dir === 'right') {
      setSlideIndex((prevIndex) => (prevIndex === slideCount - 1 ? 0 : prevIndex + 1));
    }
  };

  return (
    <div className="w-full h-screen  relative overflow-hidden">
      <div className="w-12 h-12 p-2 cursor-pointer flex justify-center items-center ml-4 bg-gray-200 rounded-full opacity-50 absolute top-1/2 transform -translate-y-1/2 z-10">
        <IconButton onClick={() => handleClick("left")} className="z-3">
          <ChevronLeft />
        </IconButton>
      </div>
      <div className="wrapper h-screen flex" style={{ width: `${slideCount * 100}%`, transform: `translateX(-${(100 / slideCount) * slideIndex}%)`, transition: "transform 0.5s ease" }}>
        {slides.map((item) => (
          <div key={item._id} className="flex items-center h-screen w-screen">
            <div className="flex-1 h-full">
              <img className="object-cover w-full h-full" src={item.img} alt="" />
            </div>
            <div className="flex-1 flex flex-col items-center p-8 sm:p-16 md:p-24">
              <h1 className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center">
                {item.title}
              </h1>
              <p className="my-8 text-lg sm:text-xl md:text-2xl lg:text-2xl text-center">
                {item.description}
              </p>
              <button className="py-4 px-8 text-xl border-2 border-black shadow-xl hover:bg-black hover:text-white transition-colors duration-300">
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-12 h-12 z-999 cursor-pointer p-2 flex justify-center items-center mr-4 bg-gray-200 rounded-full opacity-50 absolute top-1/2 transform -translate-y-1/2 right-0">
        <IconButton onClick={() => handleClick("right")} className="z-3">
          <ChevronRight />
        </IconButton>
      </div>
    </div>
  );
}

export default Slider;
