import React from 'react'
import {Link} from "react-router-dom"
import Ads from '../../Components/Ads'
import Categories from '../../Components/Categories'
import Footer from '../../Components/Footer'
import Newnavbar from '../../Components/Newnavbar'
import Newsletter from '../../Components/Newsletter'
import Proudcts from '../../Components/Proudcts'
import Slider from '../../Components/Slider'


function Home() {
  return (
    <div className=''>
      <Ads/>
      <Newnavbar />
        <Slider />
        <Categories />
        <Proudcts />
        <Newsletter />
        <Footer/>
    </div>
  )
}

export default Home