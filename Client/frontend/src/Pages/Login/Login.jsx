import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../redux/user";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, loading, dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password
      });

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setTimeout(() => {
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data, loading: true });
          window.location.assign("/");
        }, 2000);
      } else {
        // Handle other status codes or error conditions here
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://images.pexels.com/photos/1234547/pexels-photo-1234547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")' }}>
      <div className="w-full max-w-md px-6 py-8 bg-white bg-opacity-90 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">LOGIN</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" placeholder="Email" />
          <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500" placeholder="Password" type="password" />
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-xs text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-xs text-teal-500 hover:text-teal-600">Forgot Password?</a>
          </div>
          <button className="w-full py-3 px-4 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none">
            LOGIN
          </button>
          <p className="text-xs text-gray-600">
            Don't have an account? <a href="#" className="text-teal-500 hover:text-teal-600">Register now</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
