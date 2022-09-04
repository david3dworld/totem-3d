/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/index"
import Image from 'next/image'
import Footer from '../footer/index'
import facebook from "../../images/facebook.png"
import discord from "../../images/discord.png"
import twitter from "../../images/twitter.png"
import instagram from "../../images/instagram.png"

import polygon1 from "../../images/polygon-matic-logo.png"
import SingleModelView from '../components/singleModelView/index'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import axios from 'axios'
import { getProductsByBrandId } from '../../api/product'
import { getProductsByCategoryId } from '../../api/product'
import ProductItem from '../../components/ProductItem'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useMoralis } from 'react-moralis'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BabylonModelView from '../components/BabylonModelView'

export default function product() {
  const [brand, setBrand] = useState({})
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const [filters, setFilters] = useState([]);
<<<<<<< HEAD
  const { Moralis, account, user } = useMoralis();
=======
  const { Moralis, account } = useMoralis();
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
  const [totalMaxCap, setTotalMaxCap] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);
  const router = useRouter()
  const token = useSelector(function (state) {
    return state.token;
  });
  useEffect(() => {
    // console.log("NEXT_PUBLIC_API_BASE_URL", process.env.NEXT_PUBLIC_API_BASE_URL)
    // console.log("NEXT_PUBLIC_stripeToken", process.env.NEXT_PUBLIC_stripeToken)
    // console.log("NEXT_PUBLIC_CONTRACT_ADDRESS", process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
    // console.log("NEXT_PUBLIC_POLYGON_CHAIN_ID", process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID)
    // console.log("NEXT_PUBLIC_Moralis_URL", process.env.NEXT_PUBLIC_Moralis_URL)
    // console.log("NEXT_PUBLIC_Moralis_App_ID", process.env.NEXT_PUBLIC_Moralis_App_ID)
    if (!router.isReady) return;
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${router.query.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(function (data) {
      setProduct(data.data)
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brand`)
        .then(function (dataBrands) {
          if (dataBrands.data) {
            let product = data.data;
            let brand = dataBrands.data.find(item => item._id == product.brandId)
            setBrand(brand)
            getProductsByBrandId(brand._id, (error, res) => {
              if (res?.data) {
                if (window.innerWidth <= 768) {
                  setFilters(res.data.result.slice(0, 4))
                } else {
                  setFilters(res.data.result.slice(0, 10))
                }
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
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${router.query.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(function (data) {
      setProduct(data.data)
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`)
        .then(function (dataCategories) {
          if (dataCategories.data) {
            let product = data.data;
            let category = dataCategories.data.find(item => item._id == product.categoryId)
            setCategory(category)
            getProductsByCategoryId(category._id, (error, res) => {
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
  const onPressBuyNow = () => {

<<<<<<< HEAD
    if (!token && !user) {
=======
    if (!token && !account) {
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
      router.push(`/login1?returnUrl=/payment/${router.query.id}`)
    } else {
      router.push(`/payment/${router.query.id}`)
    }

  }
  console.log('product', product)
  return (
    <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex flex-col items-center w-full'>
      <div className='max-w-7xl w-full'>

        <Navbar></Navbar>
        <ToastContainer />
        <div className='mt-20  mx-5 lg:mx-0'>
          <div style={{ background: '#161A42 0% 0% no-repeat padding-box', borderRadius: '16px' }}
            className=' lg:h-16 w-full mt-8 flex items-center lg:flex-row flex-col text-white'>
            <div className='lg:ml-5'>
              {brand?.logoUrl && <Image src={brand?.iconUrl} width={85} height={85} className="rounded-full"></Image>}
            </div>
            <div className='m-3'>
              <p style={{ fontFamily: "Poppins" }} className='text-3xl'>{brand?.name}</p>
            </div>
            <div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1'>
            </div>
            <div className='ml-2 mr-4'>
              <p className='text-2xl'>{filters.length} figurines</p>
            </div>
            <div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1 m-2'>
            </div>
            <div className='mr-4'>
<<<<<<< HEAD
              <p className='text-2xl'>{totalRemaining}/{totalMaxCap} minted</p>
=======
              <p className='text-2xl'>{totalRemaining}/{totalMaxCap} remaining</p>
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
            </div>
            <div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1 m-2'>
            </div>
            <div className='flex items-center justify-center lg:justify-end mx-auto mt-1 w-3/5'>
              <div className='m-1 cursor-pointer hover:opacity-80'>
                <a target="_blank" href='https://www.facebook.com/TOTEMUNIVERSE'><Image src={facebook}></Image></a>
              </div>
              <div className='m-1 cursor-pointer hover:opacity-80'>
                <a target="_blank" href='https://twitter.com/totem_universe'><Image src={twitter}></Image></a>
              </div>
              <div className='m-1 cursor-pointer hover:opacity-80'>
                <a target="_blank" href='https://discord.gg/totem-universe'><Image src={discord}></Image></a>
              </div>
              <div className='m-1 cursor-pointer hover:opacity-80'>
                <a target="_blank" href='https://www.instagram.com/totem.universe'><Image src={instagram}></Image></a>
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        <div className='mt-16 flex lg:flex-row flex-col px-5 lg:px-0'>
          <div className='relative lg:w-4/12 overflow-hidden' style={{ background: 'white', height: "525px", borderRadius: '20px' }}>
            {!product?.image3D && product?.imageUrl && <Image width={393} height={525} src={product.is_comming_soon && product.comming_soon_image_url ? product.comming_soon_image_url : product?.imageUrl}></Image>}
            {product?.image3D && <SingleModelView
              modelUrl={product.image3D ? product.image3D : null}
              radius='20px'
              key={product._id}
              allowChangeBackground={false}
              zoom={0}
              isFitZoom={true}
              padding={{
                paddingTop: 0.2,
                paddingLeft: 0.2,
                paddingBottom: 0.2,
                paddingRight: 0.2
              }}
              showLoadedPecent={true}
              loadingBackgroundUrl={product.imageUrl ? product.imageUrl : ''}
            />}
=======

<<<<<<< HEAD
        <div className='mt-16 flex lg:flex-row flex-col px-5 lg:px-0'>
          <div className='relative lg:w-4/12' style={{ background: 'white', height: "525px", borderRadius: '20px' }}>
            {!product?.image3D && product?.imageUrl && <Image width={393} height={525} src={product?.imageUrl}></Image>}
            {product?.image3D && <SingleModelView 
=======
        <div className='mt-16 flex lg:flex-row flex-col'>
          <div className='relative lg:w-4/12' style={{ background: 'white', height: "525px", width: "393px", borderRadius: '20px' }}>
          {Object.keys(product).length != 0 && <SingleModelView 
>>>>>>> origin
                modelUrl={product.image3D ? product.image3D : null} 
                radius='20px'
                key={product._id}
                allowChangeBackground={false}
                zoom={0}
                isFitZoom={true}
                padding={{
                  paddingTop: 0.2,
                  paddingLeft: 0.2,
                  paddingBottom: 0.2,
                  paddingRight: 0.2
                }}
                showLoadedPecent = {true}
                loadingBackgroundUrl = {product.imageUrl ? product.imageUrl : ''}
              />}
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
          </div>
          <div className='lg:w-8/12 flex justify-center'>
            <div style={{ borderRadius: '20px', background: "#161A42 0% 0% no-repeat padding-box" }} className='w-full mt-5 lg:mt-0 py-5 px-5 lg:px-9 flex lg:flex-row flex-col'>
              <div className='w-full flex flex-col items-start'>
                <div className='flex flex-col lg:flex-row text-left'>
                  <div className='text-md'>
                    <p className='text-white text-base'>NFT name</p>
                    <p className='relative bottom-1 text-lg uppercase w-40' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.name}</p>
                  </div>
                  <div className='text-md lg:ml-8'>
                    <p className='text-white text-base'>Edition</p>
                    <p className='relative bottom-1 text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.series}</p>
                  </div>
                  <div className='text-md lg:ml-8'>
<<<<<<< HEAD
                    <p className='text-white text-base'>Scarcity</p>
                    <p style={{ fontFamily: "Poppins" }} className='relative bottom-1 text-white text-lg'>{product.scaracity}</p>
                  </div>
                </div>
                <div className='flex-col h-full hidden lg:flex '>
=======
                    <p className='text-white text-base'>Scarity</p>
                    <p style={{ fontFamily: "Poppins" }} className='relative bottom-1 text-white text-lg'>{product.scaracity}</p>
                  </div>
                </div>
                <div className='hidden lg:block'>
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                  <div className='mt-3 text-white lg:p-0'>
                    <p className='text-sm lg:pr-12 ' style={{ fontFamily: "Poppins" }}>{product.description}</p>
                  </div>
                  <div className='mt-auto mb-4'>
                    <div className='flex items-center'>
                      <p className='text-white text-base'>Price</p>
                      <p className='text-3xl ml-2 font-medium' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.priceUsd}$</p>
                      <p className='ml-3 text-xl font-medium' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{parseFloat(product.priceMatic).toFixed(2)}</p>
                      <div className='ml-1'>
                        <Image src={polygon1}></Image>
                      </div>
                    </div>
                  </div>

                  {product.mintedCount < product.maxCap && <a style={{ color: '#161A42', background: "#0EA8D6", borderRadius: '10px', width: "161px", height: "40px" }}
<<<<<<< HEAD
                    onClick={product.is_comming_soon ? undefined : onPressBuyNow}
                    className='font-bold text-xl flex justify-center items-center mt-5 cursor-pointer'>
                    {product.is_comming_soon ? 'COMING SOON' : 'COLLECT NOW'}
=======
                    onClick={() => onPressBuyNow()}
                    className='font-bold text-xl flex justify-center items-center mt-5 cursor-pointer'>
                    COLLECT NOW
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                  </a>}
                  {product.mintedCount >= product.maxCap && (<a style={{ background: "rgb(203 203 203)", borderRadius: '10px', width: "161px", height: "40px" }}
                    className='font-bold text-xl flex justify-center items-center mt-5 text-red-600'>
                    SOLD OUT
                  </a>
                  )}
                </div>

              </div>
              <div className='mt-5 lg:mt-0 flex flex-col items-start h-full justify-between'>
                <div>
                  <div className='text-md flex flex-col items-start'>
<<<<<<< HEAD
                    <p className='text-white text-base'>Minted</p>
=======
                    <p className='text-white text-base'>Remain</p>
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                    <p className='relative text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.mintedCount}/{product.maxCap}</p>
                  </div>
                  <div className='text-md mt-4 flex flex-col items-start'>
                    <p className='text-white text-base'>ID</p>
                    <p className='relative text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins", wordBreak: "break-all" }}>#{product._id}</p>
                  </div>
                  <div className='text-md mt-4 flex flex-col items-start'>
                    <p className='text-white text-base'>Thematic</p>
                    <p className='relative text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.thematics}</p>
                  </div>
                  <div className='text-md mt-4 flex flex-col items-start'>
                    <p className='text-white text-base'>Release date</p>
                    <p className='relative text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{convertISOStringToMonthDay(product.release_date)}</p>
                  </div>
                  <div className='text-md mt-4 flex flex-col items-start'>
                    <p className='text-white text-base'>Tags</p>
                    <p className='relative text-lg' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.tags}</p>
                  </div>
                </div>
                <div className='text-md mt-12 flex flex-col flex-1 items-start'>
                  <p className='text-white text-base mb-2'>Legal</p>
                  <p className='relative bottom-0 text-sm text-primary flex' style={{ fontFamily: "Poppins" }}>
                    © {brand.copyright_information}
                  </p>
                </div>
              </div>
              <div className='block lg:hidden'>
                <div className='mt-3 text-white lg:p-0'>
                  <p className='text-sm lg:pr-12 mb-9' style={{ fontFamily: "Poppins" }}>{product.description}</p>
                </div>
                <div className='flex mb-4'>
                  <div className='flex items-center m-auto'>
                    <p className='text-white text-base'>Price</p>
                    <p className='text-3xl ml-2 font-medium' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{product.priceUsd}$</p>
                    <p className='ml-3 text-xl font-medium' style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{parseFloat(product.priceMatic).toFixed(2)}</p>
                    <div className='ml-1'>
                      <Image src={polygon1}></Image>
                    </div>
                  </div>
                </div>

                {product.mintedCount < product.maxCap && <a style={{ color: '#161A42', background: "#0EA8D6", borderRadius: '10px', width: "161px", height: "40px" }}
<<<<<<< HEAD
                  onClick={product.is_comming_soon ? undefined : onPressBuyNow}
                  className='font-bold text-xl flex justify-center items-center mx-auto mt-5 cursor-pointer'>
                  {product.is_comming_soon ? 'COMING SOON' : 'COLLECT NOW'}
=======
                  onClick={() => onPressBuyNow()}
                  className='font-bold text-xl flex justify-center items-center mx-auto mt-5 cursor-pointer'>
                  COLLECT NOW
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                </a>}
                {product.mintedCount >= product.maxCap && (<a style={{ background: "rgb(203 203 203)", borderRadius: '10px', width: "161px", height: "40px" }}
                  className='font-bold text-xl flex justify-center items-center mx-auto mt-5 text-red-600'>
                  SOLD OUT
                </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <p className='text-xl text-white'>From other collections</p>
          {/* desktop loading */}
          {filters.length == 0 && <div className='w-full hidden lg:block'>
            <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'} width={'150px'} />
          </div>}
          {/* mobile loading */}
          {filters.length == 0 && <div className='w-full lg:hidden'>
            <Skeleton containerClassName='flex justify-around items-center' className='loading-bar' inline={true} count={2} height={'170px'} width={'150px'} />
          </div>}
          <div className='mt-5 lg:mt-0 px-2 lg:px-8 flex w-full flex-wrap '>
            {filters.map(function (data, index) {
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
=======
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
              } = data
              return (
                <div className='lg:w-1/5 w-1/2 mb-5 px-2' key={index}>
                  <ProductItem
<<<<<<< HEAD
                    isComingSoon={is_comming_soon}
                    comingSoonImageUrl={comming_soon_image_url}
=======
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
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
