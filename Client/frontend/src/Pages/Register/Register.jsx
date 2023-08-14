import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const userData = {
      name,
      lastname,
      username,
      email,
      password,
      cpassword,
    };

    axios.post('http://localhost:5000/api/auth/register', userData)
      .then((response) => {
        console.log(response.data);
        window.location.assign("/login");

        setName('')
        setLastname('')
        setUsername('')
        setEmail('')
        setPassword('')
        setCpassword('')
      })
      .catch((error) => {
        console.error('Error:', error); // Handle the error
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")' }}>
      <div className="w-full max-w-md px-6 py-8 bg-white bg-opacity-90 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">CREATE AN ACCOUNT</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input onChange={(e) => setName(e.target.value)} value={name} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" placeholder="Name" />
          <input onChange={(e) => setLastname(e.target.value)} value={lastname} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" placeholder="Last Name" />
          <input onChange={(e) => setUsername(e.target.value)}  value={username}className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" placeholder="Username" />
          <input onChange={(e) => setEmail(e.target.value)}  value={email}className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" placeholder="Email" />
          <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" placeholder="Password" type="password" />
          <input onChange={(e) => setCpassword(e.target.value)} value={cpassword} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" placeholder="Confirm Password" type="password" />
          <p className="text-xs text-gray-600">
            By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>.
          </p>
          <button className="w-full py-3 px-4 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none">
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
