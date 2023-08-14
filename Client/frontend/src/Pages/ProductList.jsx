import React, { useState } from 'react';
import Newnavbar from '../Components/Newnavbar';
import Ads from '../Components/Ads';
import Products from '../Components/Proudcts';
import Footer from '../Components/Footer';
import Newsletter from '../Components/Newsletter';
import { useLocation } from 'react-router-dom';

export default function ProductList() {
  const category = useLocation().pathname.split('/')[2];
  const [Filtres, setFiltres] = useState({});
  const [Sort, setSort] = useState('newest');

  const handleSort = (e) => {
    setSort(e.target.value);
  };
  console.log(category)

  console.log(Sort);

  const handleFiltre = (e) => {
    const { name, value } = e.target;
    setFiltres((prev) => ({
      ...prev,
      [name]: value.toLowerCase(),
    }));
  };

  console.log(Filtres);

  return (
    <div className="">
      <Ads />
      <Newnavbar />
      <div className="flex flex-col md:flex-row justify-between">
        <div className="m-4 flex flex-col md:flex-row ">
          <span className="text-xl font-semibold mr-4">Filter Products:</span>
          <select
            onChange={handleFiltre}
            name="color"
            className="p-2 mr-4 border-2 border-black w-[50%] md:w-max mt-2 md:mt-0"
          >
            <option value="blue" disabled>
              Color
            </option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
          </select>
          <select
            onChange={handleFiltre}
            name="size"
            className="p-2 mr-4 border-2 border-black w-[50%] md:w-max mt-2 md:mt-0"
          >
            <option value="size" disabled selected>
              Size
            </option>
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
          </select>
        </div>
        <div className="m-4 flex flex-col md:flex-row">
          <span className="text-xl font-semibold mr-4">Sort Products:</span>
          <select
            className="p-2 mr-4 border-2 border-black w-[50%] md:w-max mt-2 md:mt-0"
            name="price"
            onChange={handleSort}
          >
            <option value="newest"> Newest </option>
            <option value="asc">Price (ASC)</option>
            <option value="desc">Price (DESC)</option>
          </select>
        </div>
      </div>
      <Products category={category} Filtres={Filtres} Sort={Sort} />
      <Newsletter />
      <Footer />
    </div>
  );
}
