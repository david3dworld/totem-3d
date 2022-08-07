import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/index"
import Image from 'next/image'
import Footer from '../footer'
import Router, { useRouter } from 'next/router'

import polygon1 from "../../images/polygon-matic-logo.png"
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function Categories() {
  const [lastDrop, setLastDrop] = useState([])
  const [loadingProduct, setLoadingProduct] = useState(true)

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setLoadingProduct(true)
    setLastDrop([])
    axios.get(`https://shop.totem-universe.io/product?category=${router.query.id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      setLoadingProduct(false)
      setLastDrop(data.data.result)
    }).catch(function (error) {
      console.log(error.request);
    })
  }, [])

  return (
    <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex flex-col items-center'>
      <div className='max-w-7xl'>
        <Navbar></Navbar>
        <div className='mt-20 text-white'>
          <p style={{ font: "normal normal Chakra Petch" }} className='text-4xl'>{router.query.id}</p>
        </div>
        <div className='mt-16'>
          <div className='flex flex-col items-center mt-5'>
            {loadingProduct && <div className='w-full'>
              <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'} width={'150px'} />
            </div>}
          </div>
          <div className='flex flex-col items-center lg:grid grid-cols-5 mt-5 gap-x-5 gap-y-12'>
            {lastDrop.map(function (data, index) {
              return (
                <div key={index} style={{ background: "#161A42", width: "200px", height: "426px" }} className=' mt-0 w-full lg:w-max rounded-lg'>
                  <div style={{ borderRadius: '8px', height: "230px" }} className=' bg-white m-2'>
                    <div style={{ borderRadius: '8px' }} className=' flex justify-center items-center'>

                      <Image width={154} height={206} src={data.imageUrl}></Image>
                    </div>
                  </div>
                  <div className='p-3'>
                    <p className='text-lg text-white'>{data.name}</p>

                    <div className='relative flex items-center mt-3'>
                      <p className='text-white'>{data?.scaracity}</p>

                      <p className='absolute right-0 text-white'>{data.series}</p>
                    </div>

                    <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                    </div>
                    <div style={{ fontFamily: "Poppins" }} className='flex items-center relative mt-4'>
                      <p style={{ color: "#0EA8D6" }} className='text-white text-2xl'>{data.priceUsd}$</p>
                      <p style={{ color: "#0EA8D6" }} className='ml-1 text-lg '>{data.priceMatic}</p>
                      <Image src={polygon1}></Image>
                      <p className='absolute right-0'>{data?.productNo}/{data?.maxCap}</p>
                    </div>

                    <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                    </div>
                    <div className='flex items-center justify-center mt-2'>
                      <p className='text-white cursor-pointer'>COLLECT</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className='mt-20'>

        </div>

        <Footer></Footer>

      </div>
    </div>
  )
}
