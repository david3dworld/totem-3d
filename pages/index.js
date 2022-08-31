import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from "./navbar/index"

import TotemAbi from '../contracts/TotemABI.json'

import Footer from './footer'


import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CONTRACT from '../contracts/totem.json'
import useWeb3Modal from '../hooks/useWeb3Modal'
import { useMoralis, useChain } from 'react-moralis'
import useMoralisLogin from '../hooks/useMoralisLogin'
import USDT_CONFIG from '../contracts/USDT.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Skeleton from 'react-loading-skeleton'
import ProductItem from '../components/ProductItem'
import 'react-loading-skeleton/dist/skeleton.css'
import CONTRACT_ADDRESS from '../contracts/address'

export default function Home() {
  const { isLogin, fetchLoginState } = useMoralisLogin()
  const { switchNetwork, chainId } = useChain()
  const { Moralis, account, web3, isAuthenticated } = useMoralis();
  const router = useRouter();
  const [collections, setCollections] = useState([])
  const [featured, setFeatured] = useState(null)
  const [lastDrop2, setLastDrop2] = useState([])
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [loadingBrand, setLoadingBrand] = useState(true)

  const WrongChain = () => {
    const onChangeNetwork = async () => {
      await Moralis.enableWeb3()
      switchNetwork(process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID)
    }
    return (
      <button onClick={onChangeNetwork}>
        You are connected to a wrong network. Tap here to change network to Polygon
      </button>
    )
  }
  useEffect(() => {
    if (chainId !== process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID && account && isAuthenticated) {
      toast.error(<WrongChain />, {
        bodyClassName: { backgroundColor: 'red' },
        hideProgressBar: true,
        autoClose: false,
        closeButton: false

      })
    }
  }, [chainId, account, isAuthenticated])

  const settingsCollection = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  const settingsBrands = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          variableWidth: true,
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  };
  useEffect(() => {

    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product?&onSale=true`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      console.log('data', data);
      setLoadingProduct(false);
      const products = data.data.result
      if (window.innerWidth <= 768) {
        setLastDrop2(products.slice(0, 4))
      } else {
        setLastDrop2(products.slice(0, 10))
      }
    }).catch(function (error) {
      setLoadingProduct(false);
      console.log(error.request);
    })
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brand`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      setCollections(data.data)
      setLoadingBrand(false);
      setFeatured(data.data.find(item => item.featured))
      console.log('featured', featured)
    }).catch(function (error) {
      setLoadingBrand(false);
      console.log(error.request);
    });
  }, [])

  const approvePayment = async () => {

    const approve_request = {
      chain: "mumbai",
      contractAddress: USDT_CONFIG.address,
      functionName: "approve",
      abi: USDT_CONFIG.abi,
      // abi: mint721ABI.abi,
      params: {
        spender: CONTRACT_ADDRESS,
        amount: 99999999999
      },
    }
    console.log('approve_request', approve_request);
    try {
      const result = await Moralis.executeFunction(approve_request)
      // setIsFullLoading(false);
      console.log("")
    } catch (e) {
      console.log('eeeeeeeeeeeee', e)
      // setIsFullLoading(false);
      return false;
    }
  }

  const onCollect = async (data) => {
    console.log("oncollect---->", data)
    console.log("typeof data.priceMatic--->", typeof data)
    await approvePayment()
    console.log("Payment is approved!")

    const finalParams = {
      id: data.collectionId,
      items: 1
    }
    let options = {
      contractAddress: CONTRACT_ADDRESS,
      functionName: "mint",
      abi: TotemAbi,
      msgValue: Moralis.Units.ETH("0.0000001"),
      params: finalParams
    };

    const message = await Moralis.executeFunction(options);
    // console.log("mint success----")
  }
  const checkURLisValid = (url) => {
    return url && url.includes('http') && url;
  }
  return (
    <div style={{ backgroundColor: "#0D0F23", color: "#919CC1" }} className='text-sm flex flex-col items-center w-full'>
      <div className='max-w-7xl w-full'>
        <Navbar></Navbar>
        <ToastContainer />
        {featured && <div
          className='bg-top lg:h-96 w-full max-w-7xl mx-auto overflow-hidden bg-no-repeat bg-cover rounded-2xl mt-10 flex lg:flex-row flex-col relative'
        >
          <style jsx>{`
          .bg-top {
            background-image: url("${featured?.featuredImage}");
            background-position : right;

            }
        `}</style>
          <div className='pl-8 hidden lg:block'>
            <div className='m-5 relative'>
              <h1 style={{ fontFamily: "Chakra Petch" }} className='w-60 text-center lg:text-left text-4xl text-white font-semibold'>{featured?.featuredHeadline}</h1>
            </div>
            <div className='m-5'>
              <p>{featured?.featuredSubHeadline}</p>
            </div>
            <div style={{ font: 'var(--unnamed-font-style-normal) normal normal 14px/var(--unnamed-line-spacing-24) Poppins', color: "white" }} className='m-5'>
              <p>{featured?.featuredSeries}</p>
            </div>
            <div style={{ border: "#0EA8D6 solid 2px", borderRadius: "24px", width: "220px", height: "48px" }} className='m-5 flex justify-center items-center cursor-pointer hover:opacity-80'>
              <Link href={'/collection/' + featured?._id}><a className='text-white'>Discover the collection</a></Link>
            </div>
          </div>
          {/* <div className={`lg:block hidden bg-right bg-no-repeat ml-auto  w-[32rem]`}
            style={{ backgroundImage: 'url("' + featured?.imageUrl + '")' }}>
          </div>
          <div className={'lg:hidden block bg-contain bg-no-repeat h-32 w-3/4'}
            style={{ backgroundImage: 'url("' + featured?.imageUrl + '")' }}></div> */}
        </div>}
        <div className='lg:hidden  text-center'>
          <div className='my-5 relative'>
            <h1 style={{ fontFamily: "Chakra Petch" }} className='w-72 m-auto text-4xl text-white font-semibold'>{featured?.featuredHeadline}</h1>
          </div>
          <div className='my-5 w-60 m-auto '>
            <p>{featured?.featuredSubHeadline}</p>
          </div>
          <div style={{ font: 'var(--unnamed-font-style-normal) normal normal 14px/var(--unnamed-line-spacing-24) Poppins', color: "white" }} className='m-5'>
            <p>{featured?.featuredSeries}</p>
          </div>
          <div style={{ border: "#0EA8D6 solid 2px", borderRadius: "24px", width: "220px", height: "48px" }} className='my-5 mx-auto flex justify-center items-center cursor-pointer hover:opacity-80'>
            <Link href={'/collection/' + featured?._id}><a className='text-white'>Discover the collection</a></Link>
          </div>
        </div>
        <div className='max-w-7xl mx-auto'>

          <div className='text-white text-center flex justify-center mt-14'>
            <p style={{ width: "852px" }}>Ready to take your digital collection to the next level? Expand your collection with officially licensed TOTEM figurines from your favorite world-leading and popular brands. With limited-edition releases and a variety in scarcity, stay up-to-date with our newest drops. TOTEM collectibles can be purchased, stacked, sold, and traded.</p>
          </div>


          <p style={{ fontFamily: "Chakra Petch" }} className='text-xl mt-10 text-white mx-4 lg:mx-0'>The collections</p>
          <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center'>
            {/* desktop loading */}
            {loadingBrand && <div className='w-full hidden lg:block'>
              <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'} width={'150px'} />
            </div>}
            {/* mobile loading */}
            {loadingBrand && <div className='w-full lg:hidden'>
              <Skeleton containerClassName='flex justify-around flex-row items-center' className='loading-bar' inline={true} count={2} height={'170px'} width={'150px'} />
            </div>}
            {!loadingBrand && collections.length == 0 && <div className='w-full text-3xl text-center text-white'>
              0 Brands
            </div>}
          </div>
          <div className='mt-5 px-2 flex flex-wrap'>
            {collections?.map(function (data, index) {
              return (
                <div key={index} className='w-full w-1/2 lg:w-52 px-2'>
                  <div
                    onClick={function () { router.push(`/collection/${data._id}`); }}
                    style={{ borderRadius: '16px', height: "271px", background: "#161A42" }}
                    className='flex items-start justify-start flex-col cursor-pointer bg-collections w-full lg:w-48'
                  >
                    <div className='w-full flex flex-col h-full relative'>
                      <div className='w-full h-full'>
                        <div style={{ borderRadius: '16px', overflow: 'hidden' }} className='w-full h-52 relative'>
                          <Image src={data.imageUrl}
                            objectFit="cover" layout='fill'
                          />
                        </div>
                      </div>
                      <div className='h-2'></div>
                      <div className='w-28 lg:w-40 h-40 text-center mx-auto'>
                        <div style={{ borderRadius: '8px', overflow: 'hidden' }} className='h-full w-full relative'>
                          <Image objectFit='contain' width={100} height={50}
                            src={data.logoUrl} ></Image>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <p style={{ fontFamily: "Chakra Petch" }} className='text-xl text-white mt-20 mx-4 lg:mx-0' id="lastdrops">Last Drops</p>
          <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center'>
            {/* desktop loading */}
            {loadingProduct && <div className='w-full hidden lg:block'>
              <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'} width={'150px'} />
            </div>}
            {/* mobile loading */}
            {loadingProduct && <div className='w-full lg:hidden'>
              <Skeleton containerClassName='flex justify-around flex-row items-center' className='loading-bar' inline={true} count={2} height={'170px'} width={'150px'} />
            </div>}
            {!loadingProduct && lastDrop2.length == 0 && <div className='w-full text-3xl text-center text-white'>
              0 Products
            </div>}
          </div>

          <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 px-2 lg:px-8 flex w-full flex-wrap justify-around'>
            {lastDrop2.length > 0 && lastDrop2?.map(function (data, index) {
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
              } = data
              return (
                <div className='lg:w-1/5 w-1/2 mb-5 px-2' key={index}>
                  <ProductItem
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


          <div style={{ background: "transparent linear-gradient(175deg, #161A42 0%, #161A4200 100%) 0% 0% no-repeat padding-box" }}>
            <div className='flex lg:flex-row flex-col items-center text-white mt-10'>
              <div className='w-full py-10 px-4 lg:p-10 text-center lg:text-left'>
                <p style={{
                  font: 'normal normal normal 30px/35px Chakra Petch'
                }} >Join the digital collectibles revolution!</p>
              </div>
              <div className='w-full px-4 lg:p-10 '>
                <p style={{ font: 'normal normal normal 14px/24px Poppins' }} className="text-left">With TOTEM collectible figurines, we make it easy for everyone to create and expand a digital collection with officially licensed digital assets. Whether you are experienced with the NFT market or not, creating your collection can be done with or without a digital wallet, so all avid fans and collectors are welcome.
                  <br />
                  <b className='text-lg'> Get started today!</b>
                </p>
              </div>
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'Chakra Petch' }} className='text-white text-xl mt-5 mx-4 lg:mx-0'>Our brands</p>
          </div>



          <div className='px-12'>
            <Slider {...settingsBrands}>
              {collections?.map(function (data, index) {
                return checkURLisValid(data.logoUrl) && (
                  <Link href={`/collection/${data._id}`} key={index}>
                    <div key={index} style={{ height: "271px", width: "194px" }} className='m-5 h-96 cursor-pointer flex justify-center items-center'>
                      <div className='w-full relative'>
                        <Image src={data.logoUrl}
                          width="95%" height="95%" layout="responsive" objectFit="contain"
                        ></Image>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </Slider>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  )
}
