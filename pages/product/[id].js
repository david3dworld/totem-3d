/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/index"
import Image from 'next/image'
import Footer from '../footer/index'
import facebook from "../../images/facebook.png"
import discord from "../../images/discord.png"
import twitter from "../../images/twitter.png"
import instagram from "../../images/instagram.png"
import popeyeCollection from "../../images/popeye-collection.png"
import phantomCollection from "../../images/phantom.png"
import popeyeGreen from "../../images/popeyeGreen.png"
import popeyeEnemy from "../../images/popeyeEnemy.png"
import phantomAnimal from "../../images/phantomAnimal.png"
import food from "../../images/food.png"
import popeyeBlue from "../../images/popeyeBlue.png"
import phantomPurple from "../../images/phantomPurple.png"
import jeep from "../../images/jeep.png"
import polygon1 from "../../images/polygon-matic-logo.png"
import popeyeDetail from "../../images/popeye-detail.png"
import SingleModelView from '../components/singleModelView/index'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import axios from 'axios'
export default function product() {
  const lastDrop = [
    {
      title: popeyeBlue,
      image: popeyeCollection,
      name: "Popeye",
      rare: "COMMON",
      cost: 49,
      divide: "8760/10,000"
    },
    {
      title: popeyeBlue,
      image: popeyeEnemy,
      name: "Bluto",
      rare: "UNCOMMON",
      cost: 59,
      divide: "2340/8000"
    },
    {
      title: popeyeBlue,
      image: jeep,
      name: "The Jeep",
      rare: "RARE",
      cost: 79,
      divide: "3230/5,500"
    },
    {
      title: popeyeBlue,
      image: food,
      name: "Spinach Can",
      rare: "ULTRA RARE",
      cost: 99,
      divide: "1190/2300"
    },
    {
      title: popeyeBlue,
      image: popeyeGreen,
      name: "Popeye animated",
      rare: "ULTRA RARE",
      cost: 49,
      divide: "1190/2300"
    },
    {
      title: popeyeBlue,
      image: popeyeGreen,
      name: "Popeye animated",
      rare: "ULTRA RARE",
      cost: 49,
      divide: "1190/2300"
    },
    {
      title: popeyeBlue,
      image: popeyeEnemy,
      name: "Bluto",
      rare: "UNCOMMON",
      cost: 59,
      divide: "2340/8000"
    },
    {
      title: phantomPurple,
      image: phantomAnimal,
      name: "Devil",
      rare: "RARE",
      cost: 79,
      divide: "345/3000"
    },
    {
      title: phantomPurple,
      image: phantomCollection,
      name: "The Phantom",
      rare: "UNCOMMON",
      cost: 49,
      divide: "1256/6,000"
    },
    {
      title: phantomPurple,
      image: phantomAnimal,
      name: "Devil",
      rare: "RARE",
      cost: 79,
      divide: "345/3000 "
    },
  ]

  const [product, setProduct] = useState({});
  const router = useRouter()
  const token = useSelector(function (state) {
    return state.token;
  });
  useEffect(() => {
    if (!router.isReady) return;
    axios.get(`https://shop.totem-universe.io/product/${router.query.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(function (data) {
      setProduct(data.data)
    }).catch(function (error) {
      console.log(error);
    })
  }, [router.isReady])
  return (
    <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex flex-col items-center'>
      <div className='max-w-7xl'>

        <Navbar></Navbar>

        <div className='mt-20'>
          <div style={{ background: '#161A42 0% 0% no-repeat padding-box', borderRadius: '16px' }} className=' lg:h-16 w-full mt-8 flex items-center lg:flex-row flex-col text-white'>
            <div className='lg:ml-5'>
              <Image src={popeyeDetail}></Image>
            </div>
            <div className='m-3'>
              <p style={{ fontFamily: "Poppins" }} className='text-3xl'>POPEYE</p>
            </div>
            <div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1 m-2'>
            </div>
            <div className='lg:m-8 m-6'>
              <p className='text-2xl'>5 figurines</p>
            </div>
            <div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1 m-2'>
            </div>
            <div className='lg:m-8 m-6'>
              <p className='text-2xl'>007654/30,000 remaining</p>
            </div>
            <div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1 m-2'>
            </div>
            <div className='flex items-center justify-end mt-3 w-1/4'>
              <div className='m-1'>
                <Image src={facebook}></Image>
              </div>
              <div className='m-1'>
                <Image src={twitter}></Image>
              </div>
              <div className='m-1'>
                <Image src={discord}></Image>
              </div>
              <div className='m-1'>
                <Image src={instagram}></Image>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-16 flex lg:flex-row flex-col'>
          <div className='relative' style={{ background: 'white', height: "525px", width: "393px", borderRadius: '20px' }}>
            {/* <Image width={393} height={525} src={popeye2x}></Image> */}
            <SingleModelView radius='20px' zoom={80} modelUrl={product.image3D ? product.image3D : null} allowChangeBackground={false}/>
          </div>
          <div className='w-full flex justify-center'>
            <div style={{ borderRadius: '20px', background: "#161A42 0% 0% no-repeat padding-box" }} className='w-11/12 p-5 flex lg:flex-row flex-col'>
              <div className='w-full flex flex-col items-center lg:items-start'>
                <div className='flex'>
                  <div className='text-md'>
                    <p className='text-white'>NFT name</p>
                    <p className='relative bottom-1' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.name}</p>
                  </div>
                  <div className='text-md ml-6'>
                    <p className='text-white'>Edition</p>
                    <p className='relative bottom-1' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.series}</p>
                  </div>
                  <div className='text-md ml-6'>
                    <p className='text-white'>Scarity</p>
                    <p style={{ fontFamily: "Poppins" }} className='relative bottom-1 text-white'>{product.scaracity}</p>
                  </div>
                </div>

                <div style={{ width: "285px" }} className='mt-3 text-white p-6 lg:p-0'>
                  <p style={{ fontFamily: "Poppins" }}>Since his first appearance in the daily King Features comic strip, Thimble Theatre, on January 17, 1929, Popeye the Sailor Man has become a pop culture icon. His well-known bulging muscles, rugged look, and confident demeanor have been capsulated in this authentic, 3D digital figurine collectible. Are you a real Popeye fan without Popeye the Sailor Man in your collection? Don’t forget to eat your greens or claim this iconic character and get it today!</p>
                </div>

                <div className='lg:mt-5'>
                  <div className='flex items-center'>
                    <p className='text-white'>Price</p>
                    <p className='text-2xl ml-2' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.priceUsd}$</p>
                    <p className='ml-3' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.priceMatic}</p>
                    <div className='ml-1'>
                      <Image src={polygon1}></Image>
                    </div>
                  </div>
                </div>
              
                <Link href={'/payment/' + product?._id}>
                  <a style={{ color: '#161A42', background: "#0EA8D6", borderRadius: '10px', width: "161px", height: "40px" }}
                    className='font-bold text-lg flex justify-center items-center mt-5'>COLLECT NOW</a>
                </Link>

              </div>
              <div className='mt-5 lg:mt-0 flex flex-col items-center lg:items-start'>
                <div className='text-md flex flex-col items-center lg:items-start'>
                  <p className='text-white '>Remain</p>
                  <p className='relative ' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.collectionId}/{product.maxCap}</p>
                </div>
                <div className='text-md mt-4 flex flex-col items-center lg:items-start'>
                  <p className='text-white'>ID</p>
                  <p className='relative ' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>#{product._id}</p>
                </div>
                <div className='text-md mt-4 flex flex-col items-center lg:items-start'>
                  <p className='text-white'>CATEGORY</p>
                  <p className='relative ' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.category}</p>
                </div>
                <div className='text-md mt-4 flex flex-col items-center lg:items-start'>
                  <p className='text-white'>Release date</p>
                  <p className='relative ' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.createdAt}</p>
                </div>
                <div className='text-md mt-4 flex flex-col items-center lg:items-start'>
                  <p className='text-white'>Tags</p>
                  <p className='relative ' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>Pop culture, Sailor, Vintage, Spinash</p>
                </div>
                <div className='text-md mt-12 flex flex-col items-center lg:items-start'>
                  <p className='text-white'>Legal</p>
                  <p className='relative bottom-0' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>© 2022 King Features Syndicate, Inc. © Totem Digital</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <p className='text-xl text-white'>Other collectibles</p>
          <div className='flex flex-col items-center lg:grid grid-cols-5 mt-5 gap-x-5 gap-y-12'>
            {lastDrop.map(function (data, index) {
              return (
                <div key={index} style={{ background: "#161A42", width: "200px", height: "426px" }} className=' mt-0 w-full lg:w-max rounded-lg'>
                  <div style={{ borderRadius: '8px', height: "230px" }} className=' bg-white m-2'>
                    <div className='relative top-2 left-2'>
                      <Image height={20} width={60} src={data.title}></Image>
                    </div>
                    <div style={{ borderRadius: '8px' }} className=' flex justify-center items-center'>
                      {data.image == jeep
                        ?
                        <div className='mt-3'>
                          <Image width={134} height={186} src={data.image}></Image>
                        </div>
                        :
                        <Image width={154} height={206} src={data.image}></Image>
                      }
                    </div>
                  </div>
                  <div className='p-3'>
                    <p className='text-lg text-white'>{data.name}</p>

                    <div className='relative flex items-center mt-3'>
                      {
                        data.rare == "RARE" && <p style={{ color: "#7AF4AE" }}>{data.rare}</p>
                      }
                      {
                        data.rare == "UNCOMMON" && <p style={{ color: "#ED5B62  " }}>{data.rare}</p>
                      }
                      {
                        data.rare == "ULTRA RARE" &&
                        <p style={{ color: "#F4D96C" }}>{data.rare}</p>
                      }
                      {
                        data.rare == "COMMON" && <p className='text-white'>{data.rare}</p>
                      }
                      <p className='absolute right-0 text-white'>Serie 1</p>
                    </div>

                    <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                    </div>
                    <div style={{ fontFamily: "Poppins" }} className='flex items-center relative mt-4'>
                      <p style={{ color: "#0EA8D6" }} className='text-white text-2xl'>{data.cost}$</p>
                      <p style={{ color: "#0EA8D6" }} className='ml-1 text-lg '>25</p>
                      <Image src={polygon1}></Image>
                      <p className='absolute right-0'>{data.divide}</p>
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

        <div className='mt-10'>
          <Footer></Footer>
        </div>

      </div>
    </div>
  )
}
