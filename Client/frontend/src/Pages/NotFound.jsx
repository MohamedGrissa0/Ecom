import React from "react";

const NotFound = () => {
  return (
    <div className="mt-[110px] h-screen w-full flex flex-col justify-center items-center">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
    <p className="text-xl text-gray-600 mb-8">The page you are looking for does not exist.</p>
    <a href="/" className="text-blue-600 hover:text-blue-800">Return to Home</a>
  </div>
  
  );
};

export default NotFound;
