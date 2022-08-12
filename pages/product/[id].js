/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/index"
import Image from 'next/image'
import Footer from '../footer/index'
import facebook from "../../images/facebook.png"
import discord from "../../images/discord.png"
import twitter from "../../images/twitter.png"
import instagram from "../../images/instagram.png"

import jeep from "../../images/jeep.png"
import polygon1 from "../../images/polygon-matic-logo.png"
import popeyeDetail from "../../images/popeye-detail.png"
import SingleModelView from '../components/singleModelView/index'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import axios from 'axios'
import { getProductsByBrandId } from '../../api/product'

export default function product() {
  const [brand, setBrand] = useState({})
  const [product, setProduct] = useState({});
  const [filters, setFilters] = useState([]);
  const [totalMaxCap, setTotalMaxCap] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);
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
      axios.get("https://shop.totem-universe.io/brand")
        .then(function (dataBrands) {
          if (dataBrands.data) {
            let product = data.data;
            let brand = dataBrands.data.find(item => item._id == product.brandId)
            setBrand(brand)
            getProductsByBrandId(brand._id, (error, res) => {
              if (res?.data) {
                setFilters(res.data.result)
                let totalMax = 0;
                let remainingTotal = 0
                res.data.result.length > 0 && res.data.result.map((item) => {
                  totalMax = totalMax + item.maxCap;
                  remainingTotal = remainingTotal + item.mintedCount;
                })
                setTotalMaxCap(totalMax);
                setTotalRemaining(remainingTotal);
              }
            })
          }
        })
    }).catch(function (error) {
      console.log(error);
    })

  }, [router.isReady, router])

  const convertISOStringToMonthDay = date => {
    const tempDate = new Date(date).toString().split(' ');
    const formattedDate = `${tempDate[1]} ${+tempDate[2]}`;
    return formattedDate;
  };
  return (
    <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex flex-col items-center w-full'>
      <div className='max-w-7xl w-full'>

        <Navbar></Navbar>

        <div className='mt-20'>
          <div style={{ background: '#161A42 0% 0% no-repeat padding-box', borderRadius: '16px' }} className=' lg:h-16 w-full mt-8 flex items-center lg:flex-row flex-col text-white'>
            <div className='lg:ml-5'>
              {brand?.logoUrl && <Image src={brand?.iconUrl} width={85} height={85}></Image>}
            </div>
            <div className='m-3'>
              <p style={{ fontFamily: "Poppins" }} className='text-3xl'>{brand?.name}</p>
            </div>
            <div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1 m-2'>
            </div>
            <div className='lg:m-8 m-6'>
              <p className='text-2xl'>{filters.length} figurines</p>
            </div>
            <div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1 m-2'>
            </div>
            <div className='lg:m-8 m-6'>
              <p className='text-2xl'>{totalRemaining}/{totalMaxCap} remaining</p>
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
          <div className='relative lg:w-4/12' style={{ background: 'white', height: "525px", width: "393px", borderRadius: '20px' }}>
            <SingleModelView 
              key={product._id}
              radius='20px'
              modelUrl={product.image3D ? product.image3D : null} 
              allowChangeBackground={false}
              zoom={0}
              isFitZoom={true}
              padding={{
                paddingTop: 0.03,
                paddingLeft: 0.03,
                paddingBottom: 0.03,
                paddingRight: 0.03
              }}
              />
          </div>
          <div className='lg:w-8/12 flex justify-center'>
            <div style={{ borderRadius: '20px', background: "#161A42 0% 0% no-repeat padding-box" }} className='w-11/12 py-5 px-9 flex lg:flex-row flex-col'>
              <div className='w-full flex flex-col items-center lg:items-start'>
                <div className='flex'>
                  <div className='text-md'>
                    <p className='text-white text-base'>NFT name</p>
                    <p className='relative bottom-1 text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.name}</p>
                  </div>
                  <div className='text-md ml-12'>
                    <p className='text-white text-base'>Edition</p>
                    <p className='relative bottom-1 text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.series}</p>
                  </div>
                  <div className='text-md ml-12'>
                    <p className='text-white text-base'>Scarity</p>
                    <p style={{ fontFamily: "Poppins" }} className='relative bottom-1 text-white text-lg'>{product.scaracity}</p>
                  </div>
                </div>

                <div className='mt-3 text-white p-6 lg:p-0'>
                  <p className='text-sm lg:pr-12' style={{ fontFamily: "Poppins" }}>{product.description}</p>
                </div>

                <div className='lg:mt-5'>
                  <div className='flex items-center'>
                    <p className='text-white text-base'>Price</p>
                    <p className='text-3xl ml-2 font-medium' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.priceUsd}$</p>
                    <p className='ml-3 text-xl font-medium' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.priceMatic}</p>
                    <div className='ml-1'>
                      <Image src={polygon1}></Image>
                    </div>
                  </div>
                </div>

                <Link href={'/payment/' + product?._id}>
                  <a style={{ color: '#161A42', background: "#0EA8D6", borderRadius: '10px', width: "161px", height: "40px" }}
                    className='font-bold text-xl flex justify-center items-center mt-5'>COLLECT NOW</a>
                </Link>

              </div>
              <div className='mt-5 lg:mt-0 flex flex-col items-center lg:items-start h-full justify-between'>
                <div>
                  <div className='text-md flex flex-col items-center lg:items-start'>
                    <p className='text-white text-base'>Remain</p>
                    <p className='relative text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.collectionId}/{product.maxCap}</p>
                  </div>
                  <div className='text-md mt-4 flex flex-col items-center lg:items-start'>
                    <p className='text-white text-base'>ID</p>
                    <p className='relative text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>#{product._id}</p>
                  </div>
                  <div className='text-md mt-4 flex flex-col items-center lg:items-start'>
                    <p className='text-white text-base'>CATEGORY</p>
                    <p className='relative text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.category}</p>
                  </div>
                  <div className='text-md mt-4 flex flex-col items-center lg:items-start'>
                    <p className='text-white text-base'>Release date</p>
                    <p className='relative text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{convertISOStringToMonthDay(product.createdAt)}</p>
                  </div>
                  <div className='text-md mt-4 flex flex-col items-center lg:items-start'>
                    <p className='text-white text-base'>Tags</p>
                    <p className='relative text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.tags}</p>
                  </div>
                </div>
                <div className='text-md mt-12 flex flex-col items-center lg:items-start'>
                  <p className='text-white text-base mb-2'>Legal</p>
                  <p className='relative bottom-0 text-sm' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>© 2022 King Features Syndicate, Inc. © Totem Digital</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <p className='text-xl text-white'>Other collectibles</p>
          <div className='flex flex-col items-center lg:grid grid-cols-5 mt-5 gap-x-5 gap-y-12'>
            {filters.map(function (data, index) {
              return (
                <Link href={`/product/${data._id}`} key={index}>
                  <a>
                    <div style={{ background: "#161A42", width: "200px", height: "426px" }} className=' mt-0 w-full lg:w-max rounded-lg'>
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
                  </a>
                </Link>
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
