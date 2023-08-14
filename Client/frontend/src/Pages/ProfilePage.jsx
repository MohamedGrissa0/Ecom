import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from '../firebase';
import Newnavbar from '../Components/Newnavbar';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const storage = getStorage(app); // Initialize the storage service

  useEffect(() => {
    // Retrieve userId from localStorage or wherever you store it after authentication
    const usera = JSON.parse(localStorage.getItem('user'));
    const userId = usera._id;
    console.log(userId);
    // Fetch user data based on userId
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
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = {
        username: username || user.username,
        email: email || user.email,
        password: password || '',
        img: profilePicture || user.img // Update the img field with profilePicture
      };

      const response = await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedUser);
      console.log(response.data); // Updated user object

      // Reset form fields
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `profilePictures/${user._id}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setProfilePicture(downloadURL); // Update the profile picture URL
          try {
            const updatedUser = {
              username: username || user.username,
              email: email || user.email,
              password: password || '',
              img: downloadURL // Update the img field with the downloadURL
            };

            const response = await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedUser);
            console.log(response.data); // Updated user object

            // Reset form fields
            setUsername('');
            setEmail('');
            setPassword('');
          } catch (error) {
            console.log(error);
          }
        });
      }
    );
  };

  console.log(profilePicture);

  return (

    <div className="">
      <Newnavbar  />
      <div className='mt-10'>
      <div className="flex justify-center items-center">
        <img
          src={user.img}
          alt="Profile Picture"
          className="w-40 h-40 rounded-full object-cover"
        />
      </div>
      <form onSubmit={handleUpdate} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 text-lg">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-lg">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-lg">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profilePicture" className="block mb-1 text-lg">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>
      </div>
    </div>
  );
};

export default ProfilePage;
