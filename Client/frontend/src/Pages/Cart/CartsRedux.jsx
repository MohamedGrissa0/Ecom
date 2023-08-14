import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Add, Remove, Delete, ClosedCaption, Close } from "@material-ui/icons";
import axios from "axios";
import Swal from "sweetalert2";

import Ads from "../../Components/Ads";
import Footer from "../../Components/Footer";
import NewNavbar from "../../Components/Newnavbar";
import { deleteProduct } from "../../redux/cart";

const CartsRedux = () => {
  const shipping = 7;
  let usercartlength = 0;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const [click, setClick] = useState(false);
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      userId,
      address,
      number,
      products: cart.products,
      amount: cart.total + shipping,
      quantity: cart.quantity,
      total: cart.total,
    };

    axios
      .post("http://localhost:5000/api/orders/", payload)
      .then((response) => {
        setClick(false);
        setAddress("");
        setNumber("");
        Swal.fire({
          icon: "success",
          text: "Order submitted successfully!",
          timer: 5000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        Swal.fire({
          icon: "error",
          text: "Error submitting order. Please try again.",
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {click && (
        <form
          onSubmit={handleSubmit}
          className="absolute top-[30%] md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-white p-8 rounded-lg mx-auto mt-16 max-w-md"
        >
          <button
            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"
            onClick={() => setClick(false)}
          >
            <Close/>
          </button>
          <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="Enter address"
            className="mb-4 p-2 border rounded"
          />
          <input
            type="text"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
            placeholder="Enter number"
            className="mb-4 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 font-semibold checkout-button"
          >
            DONE
          </button>
        </form>
      )}
      <Ads />
      <NewNavbar />
      <div className="flex-grow p-5">
        <h1 className="text-center font-light text-3xl mb-5">
          YOUR BAG ({usercartlength})
        </h1>
        <section className="flex justify-between items-center mb-5">
          <a href="/">
            <button className="border-black border-2 py-2 px-4 font-semibold bg-white text-black cursor-pointer checkout-button">
              CONTINUE SHOPPING
            </button>
          </a>
          <button
            className="border-black py-2 px-4 font-semibold bg-black text-white cursor-pointer checkout-button"
            onClick={() => setClick(true)}
          >
            CHECKOUT NOW
          </button>
        </section>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-3/5">
            {cart.products.map((product) => {
              if (user._id === product.userid) {
                usercartlength++

                return (
                  <div
                    className="flex justify-between items-center border-b pb-5"
                    key={product.id}
                  >
                    <div className="flex">
                      <img
                        className="w-[250px] h-[250px] object-cover"
                        src={product.images[0]}
                        alt="product"
                      />
                      <div className="ml-3">
                        <h2 className="font-semibold text-lg">
                          {product.title}
                        </h2>
                        <p className="text-sm">
                          ID: <span>{product.id}</span>
                        </p>
                        <div className="flex items-center mt-2">
                          <p className="text-sm">Size: {product.sizef}</p>
                        </div>
                        <div className="flex items-center mt-2">
                          <div
                            className="w-4 h-4 rounded-full bg-black mr-2"
                            style={{ backgroundColor: product.selectedColor }}
                          ></div>
                          <p className="text-sm">
                            Color: {product.selectedColor}
                          </p>
                        </div>
                        <p className="text-sm">
                          Quantity: {product.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="border-black p-1"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Delete className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="w-full md:w-2/5 mt-10 md:mt-0">
            <div className="border border-gray-200 rounded p-5">
              <h2 className="font-semibold text-lg">ORDER SUMMARY</h2>
              <div className="flex justify-between items-center mt-5">
                <p className="font-semibold">Subtotal</p>
                <p>${cart.total}</p>
              </div>
              <div className="flex justify-between items-center mt-5">
                <p>Estimated Shipping</p>
                <p>${shipping}</p>
              </div>
              <div className="flex justify-between items-center mt-5">
                <p className="font-semibold">Total</p>
                <p className="text-xl">${cart.total + shipping}</p>
              </div>
              <button
                className="bg-black text-white py-2 px-4 mt-8 font-semibold w-full checkout-button"
                onClick={() => setClick(true)}
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartsRedux;
