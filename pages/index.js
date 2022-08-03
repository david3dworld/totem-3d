import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from "./navbar/index"
import popeye from "../images/popeye@2x.png"
import flash from "../images/flash_gordon@2x.png"
import benfica from "../images/benfica@2x.png"
import TotemAbi from '../contracts/TotemABI.json'
import stormStrooper from "../images/original_stormtrooper@2x.png"
import group from "../images/Groupe 275@2x.png"
import phantom from "../images/phantom@2x.png"
import Footer from './footer'
import facebook from "../images/facebook.png"
import discord from "../images/discord.png"
import twitter from "../images/twitter.png"
import instagram from "../images/instagram.png"
import intersection from "../images/Intersection1.png"
import popeyeCollection from "../images/popeye-collection.png"
import flashGordon from "../images/flash-gordon.png"
import phantomCollection from "../images/phantom.png"
import benficasc from "../images/benfica.png"
import storm from "../images/storm.png"
import bg1 from "../images/bg1.png"
import bg2 from "../images/bg2.png"
import bg3 from "../images/bg3.png"
import bg4 from "../images/bg4.png"
import bg5 from "../images/bg5.png"
import popeyeGreen from "../images/popeyeGreen.png"
import popeyeEnemy from "../images/popeyeEnemy.png"
import phantomAnimal from "../images/phantomAnimal.png"
import flashKing from "../images/flashKing.png"
import food from "../images/food.png"
import popeyeBlue from "../images/popeyeBlue.png"
import totem from '../images/totem.png'
import polygon from "../images/polygon-matic-logo.png"
import { useRouter } from 'next/router'
import phantomPurple from "../images/phantomPurple.png"
import popeyeHome from "../images/popeyeHome.png"
import { useEffect, useState } from 'react'
import CONTRACT from '../contracts/totem.json'
import useWeb3Modal from '../hooks/useWeb3Modal'
import { useMoralis } from 'react-moralis'
import useMoralisLogin from '../hooks/useMoralisLogin'
import USDT_CONFIG from '../contracts/USDT.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import book2x from "../images/book2x.png"
import music from "../images/Icon awesome-music.svg"
import movies from "../images/Icon material-local-movies.svg"
import games from "../images/Icon metro-gamepad.svg"
import sports from "../images/Icon awesome-football-ball.svg"
import comics from "../images/Icon awesome-book-open.svg"
import art from "../images/Icon map-art-gallery.svg"
const CONTRACT_ADDRESS = "0x3D9F895C786E2bBe7785763566ABe6db3c2F546c"

export default function Home() {
  const { isLogin, fetchLoginState } = useMoralisLogin()
  const { Moralis, account, web3 } = useMoralis();
  const router = useRouter();
  const img = [popeyeCollection, flashGordon, phantomCollection, benficasc, storm];
  const bg = [bg1, bg2, bg3, bg4, bg5];
  const [collections, setCollections] = useState([])
  const [featured, setFeatured] = useState(null)
  const [lastDrop2, setLastDrop2] = useState([])
  const settingsLastdrop = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive : [
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
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const settingsCollection = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive : [
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
          slidesToShow: 1,
          slidesToScroll: 1
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
    responsive : [
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
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  useEffect(() => {
    axios.get("https://shop.totem-universe.io/product?&onSale=true", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(JSON.parse(localStorage['persist:root']).token)}`
      }
    }).then(function (data) {
      console.log('data', data);
      const products = data.data.result
      setLastDrop2(products)
    }).catch(function (error) {
      console.log(error.request);
    })
    axios.get("https://shop.totem-universe.io/brand", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(JSON.parse(localStorage['persist:root']).token)}`
      }
    }).then(function (data) {
      setCollections(data.data)
      setFeatured(data.data.find(item => item.featured))
      console.log('featured', featured)
    }).catch(function (error) {
      console.log(error.request);
    });
  }, [])

  const approvePayment = async () => {

    const approve_request = {
      chain: "rinkeby",
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
  const checkForRemainedAmount = (data, e) => {
    toast.error("Max number has been reached already");
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
          <div className=''>
            <div className='m-5 relative'>
              <h1 style={{ fontFamily: "Chakra Petch" }} className='w-60 text-left text-4xl text-white font-semibold'>{featured?.featuredHeadline}</h1>
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
        <div className='max-w-7xl mx-auto'>

        <div className='text-white text-center flex justify-center mt-14'>
          <p style={{ width: "852px" }}>Ready to take your digital collection to the next level? Expand your collection with officially licensed TOTEM figurines from your favorite world-leading and popular brands. With limited-edition releases and a variety in scarcity, stay up-to-date with our newest drops. TOTEM collectibles can be purchased, stacked, sold, and traded.</p>
        </div>

           
        <div className='mt-10 text-white'>
          <p style={{ fontFamily: "Chakra Petch" }} className='text-xl '>The collections</p>
        </div>
        <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center'>
          {collections.length == 0 && <div className='w-full'>
          <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'}  width={'150px'} />
          </div>}
        </div>
        <div style={{ height:"271px" }} className='mt-5 lg:px-12'>
        <Slider {...settingsBrands}>
          {collections?.map(function (data, index) {

            return (
              <div className=''>
              <div key={index} onClick={function () { router.push(`/collection/${data._id}`); }} style={{borderRadius: '16px',height:"271px", width: "194px", background: "#161A42" }} className=' flex items-start justify-start flex-col cursor-pointer bg-collections'>
                <div className='w-full flex flex-col h-full relative'>
                  <div className='w-full h-full'>
                    <div style={{borderRadius: '16px', overflow: 'hidden'}} className='w-full h-52 relative'>
                      <Image src={data.imageUrl}
                        objectFit="cover" layout='fill'
                      ></Image>
                    </div>
                  </div>
                  <div className='h-2'></div>
                  <div className='w-40 h-40 text-center mx-auto'>
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
          </Slider>
        </div>

        <div className='text-white mt-20'>
          <p style={{ fontFamily: "Chakra Petch" }} className='text-xl' id="lastdrops">Last Drops</p>
        </div>
        <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center'>
          {lastDrop2.length == 0 && <div className='w-full'>
          <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'}  width={'150px'} />
          </div>}
        </div>

        <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 lg:px-12'>
        <Slider {...settingsLastdrop}>
          {lastDrop2.length > 0 && lastDrop2?.map(function (data, index) {
            console.log("data in lastdrop2-->")
            
            if (data && data.mintedCount >= data.maxCap) {
              return (
                <div className='flex items-center justify-center' key={index}>
                <div className='p-1 bg-jeep '  onClick={() => checkForRemainedAmount(data)}>
                  <div style={{ borderRadius: '8px' }} className=' bg-white m-2'>
                    <div className=' top-2 left-2'>
                      {/* <Image height={20} width={60} src={data.title}></Image> */}
                    </div>
                    <div style={{ borderRadius: '8px' }} className=' flex justify-center items-center'>

                      <div className='w-full h-48 relative'>
                        <Image src={data.imageUrl}
                          width="95%" height="95%" layout="responsive" objectFit="contain"
                        ></Image>
                         <div className='category'>
                          {data.category == 'music' && <Image className='music' src={music}/>}
                          {data.category == 'movies' && <Image className='movies' src={movies}/>}
                          {data.category == 'games' && <Image className='games' src={games}/>}
                          {data.category == 'sports' && <Image className='sports' src={sports}/>}
                          {data.category == 'comics' && <Image className='comics' src={comics}/>}
                          {data.category == 'art' && <Image className='art' src={art}/>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='p-3'>          
                    <p className='text-lg text-white'>{data.name}</p>

                    <div className='relative flex items-center mt-3'>
                      {
                        data.rarity == "ULTRA RARE" &&
                      <p style={{ color: "#F4D96C" }}>{data?.rarity}</p>
            }
            {
                      data.rarity == "UNCOMMON" && 
                      <p style={{ color: "#ED5B62" }}>{data?.rarity}</p>
            }
                        {
                      data.rarity == "RARE" && 
                      <p style={{ color: "#7AF4AE" }}>{data?.rarity}</p>
            }
                        {
                      data.rarity == "COMMON" && 
                      <p style={{ color: "#E7E7E7" }}>{data?.rarity}</p>
            }
            {
              (data?.rarity != "COMMON" && data?.rarity != "UNCOMMON" && data?.rarity != "ULTRA RARE" && data?.rarity != "RARE") &&
              <p>{data?.rarity}</p>
            }
            {
              !data?.rarity && 
              <p>-</p>
            }

                      <p className='absolute right-0 text-white'>{data?.series}</p>
                    </div>

                    <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                    </div>
                    <div style={{ fontFamily: "Poppins" }} className='flex items-center relative mt-4'>
                      <p style={{ color: "#0EA8D6" }} className='text-white text-2xl'>{data.priceUsd}$</p>
                      <p style={{ color: "#0EA8D6" }} className='ml-1 text-lg '>{data.priceMatic}</p>
                      <Image src={polygon}></Image>
                      <p style={{color : "#E0E3FF"}} className='absolute right-0'>{data?.productNo} / {data?.maxCap}</p>
                    </div>

                    <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                    </div>
                    <div className='flex items-center justify-center mt-2 hover:opacity-80 cursor-pointer'>
                      <p style={{ fontFamily: "Chakra Petch" }} className='text-white'>COLLECT</p>
                    </div>
                  </div>
                </div>
                </div>
              )
            } else {
              return (
                <Link href={`/product/${data._id}`} key={index}>
                  <a>
                    <div className='p-1 ' style={{borderRadius:"16px", width: "194px", background: "#161A42" }}>
                      <div style={{ borderRadius: '8px' }} className=' bg-white m-2'>
                        <div className='relative top-2 left-2'>
                          {/* <Image height={20} width={60} src={data.title}></Image> */}
                        </div>
                        <div style={{ borderRadius: '8px' }} className=' flex justify-center items-center'>

                          <div className='w-full h-48 relative'>
                            <Image src={data.imageUrl}
                              width="95%" height="95%" layout="responsive" objectFit="contain"
                            ></Image>
                            <div className='category'>
                              {data.category == 'music' && <Image className='music' src={music}/>}
                              {data.category == 'movies' && <Image className='movies' src={movies}/>}
                              {data.category == 'games' && <Image className='games' src={games}/>}
                              {data.category == 'sports' && <Image className='sports' src={sports}/>}
                              {data.category == 'comics' && <Image className='comics' src={comics}/>}
                              {data.category == 'art' && <Image className='art' src={art}/>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='p-3'>
                        <p className='text-lg text-white'>{data.name}</p>

                        <div className='relative flex items-center mt-3'>
                        {
                        data.rarity == "ULTRA RARE" &&
                      <p style={{ color: "#F4D96C" }}>{data?.rarity}</p>
            }
            {
                      data.rarity == "UNCOMMON" && 
                      <p style={{ color: "#ED5B62" }}>{data?.rarity}</p>
            }
                        {
                      data.rarity == "RARE" && 
                      <p style={{ color: "#7AF4AE" }}>{data?.rarity}</p>
            }
                        {
                      data.rarity == "COMMON" && 
                      <p style={{ color: "#E7E7E7" }}>{data?.rarity}</p>
            }
            {
              (data?.rarity != "COMMON" && data?.rarity != "UNCOMMON" && data?.rarity != "ULTRA RARE" && data?.rarity != "RARE") &&
              <p>{data?.rarity}</p>
            }
            {
              !data?.rarity && 
              <p>-</p>
            }

                          <p className='absolute right-0 text-white'>{data?.series}</p>
                        </div>

                        <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                        </div>
                        <div style={{ fontFamily: "Poppins" }} className='flex items-center relative mt-4'>
                          <p style={{ color: "#0EA8D6" }} className='text-white text-2xl'>{data.priceUsd}$</p>
                          <p style={{ color: "#0EA8D6" }} className='ml-1 text-lg '>{data.priceMatic}</p>
                          <Image src={polygon}></Image>
                          <p style={{color : "#E0E3FF"}} className='absolute right-0'>{data?.productNo} / {data?.maxCap}</p>
                        </div>

                        <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                        </div>
                        <div className='flex items-center justify-center mt-2 hover:opacity-80'>
                          <p style={{ fontFamily: "Chakra Petch" }} className='text-white'>COLLECT</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              )
            }
          })}
          </Slider>
        </div>
        {/* 
        <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center lg:flex-row flex-col lg:grid grid-cols-5 gap-5'>
          {lastDrop.map(function (data) {
            return (
              <div style={{ width: "194px", background: "#161A42" }} className=''>
                <div style={{ borderRadius: '8px' }} className=' bg-white m-2'>
                  <div className='relative top-2 left-2'>
                    <Image height={20} width={60} src={data.title}></Image>
                  </div>
                  <div style={{ borderRadius: '8px' }} className=' flex justify-center items-center'>
                    <Image src={data.image}></Image>
                  </div>
                </div>
                <div className='p-3'>
                  <p className='text-lg text-white'>{data.name}</p>

                  <div className='relative flex items-center mt-3'>
                    {data.image == popeyeGreen &&
                      <p style={{ color: "#F4D96C" }}>{data.rare}</p>
                    }
                    {data.image == popeyeEnemy &&
                      <p style={{ color: "#ED5B62  " }}>{data.rare}</p>
                    }
                    {data.image == phantomAnimal &&
                      <p style={{ color: "#7AF4AE" }}>{data.rare}</p>
                    }
                    {data.image == flashKing &&
                      <p style={{ color: "#7AF4AE" }}>{data.rare}</p>
                    }
                    {data.image == food &&
                      <p style={{ color: "#F4D96C" }}>{data.rare}</p>
                    }
                    <p className='absolute right-0 text-white'>Serie 1</p>
                  </div>

                  <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                  </div>
                  <div style={{ fontFamily: "Poppins" }} className='flex items-center relative mt-4'>
                    <p style={{ color: "#0EA8D6" }} className='text-white text-2xl'>{data.cost}$</p>
                    <p style={{ color: "#0EA8D6" }} className='ml-1 text-lg '>25</p>
                    <Image src={polygon}></Image>
                    <p className='absolute right-0'>{data.divide}</p>
                  </div>

                  <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                  </div>
                  <div className='flex items-center justify-center mt-2'>
                    <p style={{ fontFamily: "Chakra Petch" }} className='text-white'>COLLECT</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div> */}

        <div style={{ background: "transparent linear-gradient(175deg, #161A42 0%, #161A4200 100%) 0% 0% no-repeat padding-box" }}>
          <div className='flex lg:flex-row flex-col items-center text-white mt-10'>
            <div className='w-full p-10'>
              <p style={{
                font: 'normal normal normal 30px/35px Chakra Petch'
              }}>Join the digital collectibles revolution!</p>
            </div>
            <div className='w-full p-10'>
              <p style={{ font: 'normal normal normal 14px/24px Poppins' }} className="text-left">With TOTEM collectible figurines, we make it easy for everyone to create and expand a digital collection with officially licensed digital assets. Whether you are experienced with the NFT market or not, creating your collection can be done with or without a digital wallet, so all avid fans and collectors are welcome. Get started today!
              </p>
            </div>
          </div>
        </div>

        <div>
          <p style={{ fontFamily: 'Chakra Petch' }} className='text-white text-xl mt-5'>Our brands</p>
        </div>



        <div className='lg:px-12'>
          <Slider {...settingsBrands}>
            {collections?.map(function (data, index) {
              return checkURLisValid(data.logoUrl) && (
                <Link href={`/collection/${data._id}`} key={index}>
                  <div key={index} className='m-5 cursor-pointer flex justify-center items-center'>
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
