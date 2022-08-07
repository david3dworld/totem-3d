import React, { useState, useEffect } from 'react'
import Navbar from "./navbar/index"
import fireman from "../images/fireman.png"
import games from "../images/games.png"
import soccer from "../images/soccer.png"
import music from "../images/music.png"
import popeyePunch from "../images/popeyePunch.png"
import art from "../images/art.png"
import localMovies from "../images/localMovies.png"
import gamepad from "../images/gamepad.png"
import football from "../images/footballIcon.png"
import musicIcon from "../images/musicIcon.png"
import book from "../images/book.png"
import artIcon from "../images/articon.png"
import Image from 'next/image'
import Footer from './footer'
import { useRouter } from 'next/router'
import polygon1 from "../images/polygon-matic-logo.png"
import Link from 'next/link';
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Categories() {
  const thematics = [
    {
      image: fireman,
      name: "Movies",
      icon: localMovies
    },
    {
      image: games,
      name: "Games",
      icon: gamepad
    },
    {
      image: soccer,
      name: "Sport",
      icon: football
    },
    {
      image: music,
      name: "Music",
      icon: musicIcon
    },
    {
      image: popeyePunch,
      name: "Comics",
      icon: book
    },
    {
      image: art,
      name: "Art",
      icon: artIcon
    },
  ];

  const [lastDrop, setLastDrop] = useState([])
  const [loadingProduct, setLoadingProduct] = useState(true)
  useEffect(() => {
    if (!router.isReady) return;
    setLoadingProduct(true)
    setLastDrop([])
    axios.get(`https://shop.totem-universe.io/product`, {
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
  const router = useRouter();
  return (
    <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex flex-col items-center'>
      <div className='max-w-7xl'>
        <Navbar></Navbar>
        <div className='mt-20 text-white'>
          <p style={{ font: "normal normal Chakra Petch" }} className='text-4xl'>Thematics</p>
        </div>

        <div className='mt-5 text-white lg:w-2/3'>
          <p style={{ fontFamily: "Poppins" }}>TOTEM digital collectible figurines include an extensive array of categories by iconic brands worldwide. Discover your favorite licenses in a new way and create a digital collection like never before.</p>
        </div>

        <div className='flex items-center lg:grid lg:grid-cols-6 gap-5 mt-8 flex-col lg:flex-row'>
          {thematics.map(function (data, index) {
            return (
              <div key={index} style={{ width: "162px", height: "335px", background: "#161A42", color: "#E0E3FF" }} className='flex flex-col'>
                <div className='m-2'>
                  <Image src={data.image}></Image>
                </div>
                <div className='flex justify-center'>
                  <div style={{ background: "#161A42", border: "2px solid #2E357B", width: "34px", height: "34px" }} className='relative flex justify-center items-center rounded-full bottom-7'>
                    <Image src={data.icon}></Image>
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
          <p className='text-white text-xl'>Other collectibles</p>
          <div className='flex flex-col items-center mt-5'>
            {loadingProduct && <div className='w-full'>
              <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'} width={'150px'} />
            </div>}
          </div>
          <div className='flex flex-col items-center lg:grid grid-cols-5 mt-5 gap-x-5 gap-y-12'>
            {lastDrop.map(function (data, index) {
              return (
                <div key={index} style={{ background: "#161A42", width: "200px" }} className='relative mt-0 w-full mx-2 lg:w-max rounded-lg'>
                  <div style={{ borderRadius: '8px', height: "230px" }} className=' bg-white m-2'>
                    <div style={{ borderRadius: '8px' }} className='w-full h-full flex justify-center items-center'>
                      <div className='w-full'>
                        <Image 
                          src={data.imageUrl}
                          width='100%'
                          height="100%" 
                          layout="responsive"
                          objectFit="contain"
                          alt={`nft-${data.name}`}
                          />
                      </div>
                    </div>
                  </div>
                  <div className='p-3'>
                    <p className='text-lg text-white line-clamp-2 h-14'>{data.name}</p>
                      <div className='flex justify-between text-white'>
                        <p>{data?.scaracity}</p>
                        <p>{data.series}</p>
                      </div>

                    <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                    </div>
                    <div style={{ fontFamily: "Poppins" }} className='flex items-center relative mt-4'>
                      <p style={{ color: "#0EA8D6" }} className='text-white text-2xl'>{data.priceUsd}$</p>
                      <p style={{ color: "#0EA8D6" }} className='ml-1 text-xs'>{data.priceMatic}</p>
                      <Image src={polygon1}></Image>
                      <p className='absolute right-0 text-[10px]'>{data?.productNo}/{data?.maxCap}</p>
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
    </div >
  )
}
