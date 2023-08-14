import React , {useContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ProductList from './Pages/ProductList';
import SP from './Pages/SingleProduct/SP';
import CartsRedux from './Pages/Cart/CartsRedux';
import { AuthContext } from './redux/user';
import NotFound from './Pages/NotFound';
import ProfilePage from './Pages/ProfilePage';


function App() {
  const user = JSON.parse(localStorage.getItem('user'))
console.log(user)
  return (
    <div style={{ fontFamily: 'Raleway, sans-serif' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/products/" element={<ProductList />} />
          <Route path="/register" element={user ? <Home/>:<Register />} />
          <Route path="/login" element={user ? <Home/>:<Login />} />
          <Route path="/product/:id" element={user ? <SP />: <Login />} />
          <Route path="/cart" element={user ? <CartsRedux/>:<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={user ? <ProfilePage /> :<Login/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
