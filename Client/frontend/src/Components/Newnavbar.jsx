import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function Newnavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cart = useSelector((state) => state.cart.products.length);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.assign('/');
    setUser(null);
  };

  const usera = JSON.parse(localStorage.getItem('user')) || null;
  const userId = usera ? usera._id : null;

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
          setUser(response.data);
          setUsername(response.data.username);
          setEmail(response.data.email);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUser();
    }
  }, [userId]);

  const img = user ? user.img : 'default-profile-image-url'; // Replace with default image URL

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center">
          <a href="/" className="text-3xl font-bold text-gray-800">
            Store
          </a>
        </div>
        
        {/* Search */}
        <div className="flex items-center justify-center flex-grow">
          <div className="search border border-black rounded-xl p-2 hidden sm:flex">
            <input
              placeholder="Search"
              className="border-none w-full px-2 text-sm text-gray-600 focus:outline-none"
            />
            <SearchIcon className="text-gray-400" />
          </div>
        </div>
        
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <a href="/cart" className="text-gray-800 flex items-center">
            <ShoppingCartOutlinedIcon />
            <span className="ml-1 text-sm">{cart}</span>
          </a>
          {user === null ? (
            <div className="space-x-4">
              <a href="/Login" className="text-gray-800 hover:text-gray-600">
                Login
              </a>
              <a href="/Register" className="text-gray-800 hover:text-gray-600">
                Register
              </a>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="focus:outline-none"
                aria-label="Profile Menu"
              >
                <img
                  src={img}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover cursor-pointer"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Newnavbar;
