import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cart';
import NewNavbar from '../../Components/Newnavbar';
import Ads from '../../Components/Ads';
import Footer from '../../Components/Footer';
import Newsletter from '../../Components/Newsletter';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';

export default function SP() {
  const [products, setProducts] = useState({});
  const [tab, setTab] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizef, setsize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const { id } = useParams();
  const [count, setCount] = useState(1);
  const user = JSON.parse(localStorage.getItem('user'));
  const userid = user._id;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/find/${id}`)
      .then((response) => {
        setProducts(response.data);
        setTab(response.data.size);
        setColors(response.data.color);
        setSelectedImage(response.data.img);

        if (response.data.categories) {
          axios
            .get(`http://localhost:5000/api/products?category=${response.data.categories[0]}`)
            .then((relatedResponse) => {
              setRelatedProducts(relatedResponse.data);
            })
            .catch((error) => {
              console.error('Error fetching related products:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [id]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClick = () => {
    dispatch(
      addProduct({
        ...products,
        userid: user ? user._id : null,
        quantity: count,
        total: products.price * count,
        selectedColor,
        sizef,
      })
    );
  };

  const productImages = products.images || [];

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const handleSizeClick = (size) => {
    setsize(size);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Ads />
      <NewNavbar />
      <div className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
            <img
  className="rounded-lg shadow-md h-96 w-max object-contain mb-8"
  src={productImages[currentImageIndex] || ''}
  alt="Product"
/>

              <div className="flex justify-center space-x-2">
                {productImages.map((image, index) => (
                  <img
                    key={index}
                    className={`w-12 h-12 rounded-md cursor-pointer ${
                      index === currentImageIndex ? 'border-2 border-blue-500' : 'border border-gray-300'
                    }`}
                    src={image}
                    alt="Product Thumbnail"
                    onClick={() => handleImageChange(index)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{products.title}</h2>
                <p className="text-gray-700 mb-4">{products.desc}</p>
                <p className="text-3xl font-bold mb-2">{products.price}Dt</p>
                <div className="flex items-center my-3">
                  <div className="mr-3">Colors:</div>
                  <div className="flex">
                    {colors.map((c) => (
                      <div
                        key={c}
                        className={`w-6 h-6 rounded-full mx-1 ${
                          selectedColor === c ? 'border-2 border-black' : ''
                        }`}
                        style={{ backgroundColor: c }}
                        onClick={() => handleColorClick(c)}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="flex  justify-start flex-col ">
                  <div className="flex">
                    {tab.map((size, index) => (
                      <div
                        key={index}
                        className={`w-11 p-4 h-11 flex items-center justify-center mx-1 rounded-full border ${
                          sizef === size ? 'border-black' : 'border-gray-300'
                        } cursor-pointer`}
                        onClick={() => handleSizeClick(size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-3 border border-gray-300 rounded-md px-2 w-max">
                    <button
                      className="text-gray-500 focus:outline-none"
                      onClick={() => (count > 1 ? setCount(count - 1) : setCount(1))}
                    >
                      <Remove />
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center mx-2 md:mx-5 text-center rounded-md">
                      {count}
                    </span>
                    <button
                      className="text-gray-500 focus:outline-none"
                      onClick={() => setCount(count + 1)}
                    >
                      <Add />
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                onClick={handleClick}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {relatedProducts.length > 1 && (
  <div className="bg-gray-100 py-8 flex-grow">
    <div className="container mx-auto px-4">
      <h3 className="text-3xl font-semibold mb-8">Products You May Like</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {relatedProducts.map((product) => {
          if (product._id !== product._id) {
            return (
              <div key={product._id} className="bg-white rounded-lg  shadow-lg p-4 flex flex-col items-center">
                <img
                  className="rounded-lg shadow-md flex justify-center items-center h-40 w-40 object-cover mb-4"
                  src={product.images[0]}
                  alt="Related Product"
                />
                <h4 className="text-lg font-semibold mb-2">{product.title}</h4>
                <p className="text-gray-700">${product.price}</p>
                <a
                  href={`/product/${product._id}`}
                  className="block bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 text-center w-full"
                >
                  View Product
                </a>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  </div>
)}


      <Footer />
    </div>
  );
}
