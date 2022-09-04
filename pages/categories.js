import React, { useState, useEffect } from 'react'
import Navbar from "./navbar/index"

import Footer from './footer'
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductItem from '../components/ProductItem'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Categories() {


  const [thematics, setThematics] = useState([])
  const [lastDrop, setLastDrop] = useState([])
  const [loadingProduct, setLoadingProduct] = useState(true)
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setLoadingProduct(true)
    setLastDrop([])
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/thematic`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      setLoadingProduct(false)
      setThematics(data.data.result)
    }).catch(function (error) {
      console.log(error.request);
    })
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product?&onSale=true`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      setLoadingProduct(false)
      if (window.innerWidth <= 768) {
        setLastDrop(data.data.result.slice(0, 4))
      } else {
        setLastDrop(data.data.result.slice(0, 10))
      }
    }).catch(function (error) {
      console.log(error.request);
    })

  }, [router.isReady, router])
  return (
    <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex flex-col items-center'>
      <div className='max-w-7xl'>
        <Navbar></Navbar>
        <ToastContainer />
        <div className='mt-20 text-white'>
          <p style={{ font: "normal normal Chakra Petch" }} className='text-4xl mx-4 lg:mx-0'>Thematics</p>
        </div>

        <div className='mt-5 text-white lg:w-2/3 mx-4 lg:mx-0'>
          <p style={{ fontFamily: "Poppins" }}>TOTEM digital collectible figurines include an extensive array of categories by iconic brands worldwide. Discover your favorite licenses in a new way and create a digital collection like never before.</p>
        </div>

        <div className='flex items-center lg:grid lg:grid-cols-6 gap-5 mt-8 flex-col lg:flex-row'>
          {thematics.map(function (data, index) {
            return (
              <div key={index} style={{ width: "162px", height: "335px", background: "#161A42", color: "#E0E3FF" }} className='flex flex-col'>
                <div className='m-2'>
                  <img src={data.imageUrl} />
                </div>
                <div className='flex justify-center'>
                  <div style={{ background: "#161A42", border: "2px solid #2E357B", width: "34px", height: "34px" }} className='relative flex justify-center items-center rounded-full bottom-7'>
                    <img src={data.iconUrl} />
                  </div>
                </div>
                <div className='relative bottom-7'>
                  <div className=''>
                    <p className=' text-2xl text-center'>{data.name}</p>
                  </div>
                  <div style={{ border: '1px solid #2E357B' }} className='mt-3 mb-3'>
                  </div>
                  <div className='cursor-pointer text-center flex justify-center items-center text-md w-full'>
                    <Link href={'/category/' + (data.name).toLowerCase()}><a>DISCOVER THE COLLECTIONS</a></Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className='mt-16'>
          <p className='text-white text-xl mx-4 lg:mx-0'>Other collectibles</p>
          <div className='flex flex-col items-center mt-5'>
            {/* desktop loading */}
            {loadingProduct && <div className='w-full hidden lg:block'>
              <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'} width={'150px'} />
            </div>}
            {/* mobile loading */}
            {loadingProduct && <div className='w-full lg:hidden'>
<<<<<<< HEAD
              <Skeleton containerClassName='flex justify-between items-center' className='loading-bar' inline={true} count={2} height={'170px'} width={'150px'} />
=======
              <Skeleton containerClassName='flex justify-between flex-col items-center' className='loading-bar' inline={true} count={2} height={'170px'} width={'150px'} />
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
            </div>}
          </div>
          <div className='mt-5 px-2 lg:px-8 flex w-full flex-wrap justify-around'>
            {lastDrop.map(function (data, index) {
              const {
                imageUrl,
                name,
                thematics,
                scaracity,
                series,
                priceUsd,
                priceMatic,
                productNo,
                maxCap,
                mintedCount,
                _id,
<<<<<<< HEAD
                is_comming_soon,
                comming_soon_image_url
              } = data
              return (
                <div className='lg:w-1/5 w-1/2 mb-5 px-2' key={index}>
                  <ProductItem
                    isComingSoon={is_comming_soon}
                    comingSoonImageUrl={comming_soon_image_url}
                    key={index}
                    imageUrl={imageUrl}
                    name={name}
                    thematics={thematics}
                    scarcity={scaracity}
                    series={series}
                    priceUsd={priceUsd}
                    priceMatic={priceMatic}
                    productNo={productNo}
                    maxCap={maxCap}
                    mintedCount={mintedCount}
                    id={_id}
                  />
                </div>
=======
              } = data
              return (
                <ProductItem
                  key={index}
                  imageUrl={imageUrl}
                  name={name}
                  thematics={thematics}
                  scarcity={scaracity}
                  series={series}
                  priceUsd={priceUsd}
                  priceMatic={priceMatic}
                  productNo={productNo}
                  maxCap={maxCap}
                  mintedCount={mintedCount}
                  id={_id}
                />
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
              )
            })}
          </div>
        </div>

        <div className='mt-20'>

        </div>

        <Footer></Footer>

      </div>
    </div >
  )
}
