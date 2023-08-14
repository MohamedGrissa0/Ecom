import React, { useState, useEffect } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { MailLockOutlined, Phone, Room } from '@mui/icons-material';
import axios from 'axios';

function Footer() {
  const [categories, setCategories] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [storeInfo, setStoreInfo] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const categoriesResponse = await fetch('http://localhost:5000/api/categories');
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);

      const contactResponse = await fetch('http://localhost:5000/api/contacts');
      const contactData = await contactResponse.json();
      setContactInfo(contactData[0]);

      const storeResponse = await axios.get('http://localhost:5000/api/stores');
      setStoreInfo(storeResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-800 text-white py-12">
      <div className="container mx-auto flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col p-8">
          <div className="logo mb-6">
            <h1 className="text-2xl font-bold">{storeInfo && storeInfo.name ? storeInfo.name : ""}</h1>
            <p className="mt-2 text-gray-300">{storeInfo && storeInfo.description ? storeInfo.description : ""}</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600">
              <InstagramIcon />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600">
              <FacebookIcon />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600">
              <WhatsAppIcon />
            </a>
          </div>
        </div>
        <div className="flex-1 p-8">
          <h3 className="mb-6 text-xl font-bold">Useful Links</h3>
          <ul className="grid grid-cols-2 gap-2">
            {categories.map(category => (
              <li key={category._id} className="mb-2 text-gray-300 hover:text-white transition">
                <a href="#">{category.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-8">
          <h3 className="mb-6 text-xl font-bold">Contact</h3>
          <p className="mb-4 flex items-center text-gray-300">
            <Room className="mr-2" />
            {contactInfo.address}
          </p>
          <p className="mb-4 flex items-center text-gray-300">
            <Phone className="mr-2" />
            {contactInfo.phone}
          </p>
          <p className="mb-4 flex items-center text-gray-300">
            <MailLockOutlined className="mr-2" />
            {contactInfo.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
