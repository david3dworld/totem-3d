import React, { useEffect, useState } from 'react'
import Navbar from './navbar/index'
import Image from 'next/image'
import popeye from "../images/popeye@2x.png"
import flash from "../images/flash_gordon@2x.png"
import benfica from "../images/benfica@2x.png"
import stormStrooper from "../images/original_stormtrooper@2x.png"
import group from "../images/Groupe 275@2x.png"
import phantom from "../images/phantom@2x.png"
import Footer from './footer'
import { useRouter } from 'next/router'
import tsubasaBrands from "../images/tsubasaBrands.png"
import kingBrands from "../images/kingBrands.png"
import flashBrands from "../images/phantomBrands.png"
import benficaBrands from "../images/benficaBrands.png"
import popeyeBrands from "../images/popeyeBrands.png"
import stormBrands from "../images/stormBrands.png"
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function brands() {
    const router = useRouter();
    const thematics = [
        {
            image: popeyeBrands,
            text: popeye
        },
        {
            image: kingBrands,
            text: flash
        },
        {
            image: stormBrands,
            text: stormStrooper
        },
        {
            image: tsubasaBrands,
            text: group
        },
        {
            image: flashBrands,
            text: phantom
        },
        {
            image: benficaBrands,
            text: benfica
        },
    ];
    const [brands, setBrands] = useState([])
    useEffect(() => {
        axios.get("https://shop.totem-universe.io/brand")
            .then(function (data) {
                if (data.data) {
                    console.log(data.data);
                    setBrands(data.data)
                }
            })
    }, [])
    const checkURLisValid = (url) => {
        return url && url.includes('http') && url;
    }
    const settingsBrands = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive : [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
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
    return (
        <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex flex-col items-center'>
            <div className='max-w-7xl'>
                <Navbar></Navbar>

                <div className='mt-20 text-white px-6 lg:px-0'>
                    <p className='text-5xl font-semibold'>Brands</p>
                    <p style={{ fontFamily: "Poppins" }} className='mt-5 mb-10'>The future of pop culture is here. Now all of your favorite brands are available as digital assets for collection. The most iconic and popular brands have partnered with TOTEM to create unique, authentic, and officially licensed figurines for digital collection in the NFT market.</p>
                </div>

                <div className='flex items-center'>
                    {brands.length == 0 && <div className='w-full'>
                        <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={4} height={'170px'} width={'150px'} />
                    </div>}
                </div>
                <div className='w-full mt-8 flex flex-col md:grid lg:grid md:grid-cols-3 lg:grid-cols-4 gap-10 items-center '>
                    {/* <Slider {...settingsBrands}> */}
                    {brands?.map(function (data, index) {

                        return (
                            <div className='w-72 lg:w-80 px-4' key={index}>
                            <div key={index} style={{ background: "#161A42", color: "#E0E3FF", height: "388px" }} className=' flex flex-col rounded-lg'>
                                <div className='w-full h-full p-2-5'>
                                    <div style={{ borderRadius: '8px', overflow: 'hidden' }} className='w-full h-56 relative'>
                                    {data?.brand_cover_image && <Image src={data?.brand_cover_image}
                                        layout="fill"
                                        ></Image> }
                                    </div>
                                </div>
                                {/* <div className='mt-0 text-4xl flex items-center justify-center cursor-pointer mx-5'>
                                    <div className='text-lg'>{data.name}</div>
                                    <div>{data.remarks}</div>

                                </div> */}
                                <div className='w-full h-40 text-center mx-auto mt-2 px-3'>
                                    <div style={{ borderRadius: '8px', overflow: 'hidden' }} className='w-full h-full relative'>
                                        {data?.brand_name_image && <Image src={data?.brand_name_image}
                                            width={238} height={228} objectFit="contain" layout='fill'
                                        ></Image>}
                                    </div>
                                </div>
                                <div style={{ border: '1px solid #2E357B' }} className='w-full my-2'>
                                </div>
                                <div onClick={function () {
                                    router.push(`/collection/${data._id}`);
                                }} className=' hover:opacity-80 text-center flex justify-center items-center w-full mb-5'>
                                    <p className='m-2 cursor-pointer text-white text-sm '>DISCOVER THE COLLECTIONS</p>
                                </div>
                            </div>
                            </div>
                        )
                    })}
                    {/* </Slider> */}
                </div>
                {/* <div className='flex items-center lg:grid lg:grid-cols-4 gap-12 mt-8 flex-col lg:flex-row'>
                    {thematics.map(function (data) {
                        return (
                            <div style={{ background: "#161A42", color: "#E0E3FF", width: "257px", height: "388px" }} className='flex flex-col rounded-lg'>
                                <div className='mt-4 flex items-center justify-center cursor-pointer'>
                                    <Image width={209} height={228} src={data.image}></Image>
                                </div>
                                {data.text != benfica &&
                                    <div className='m-5 flex items-center justify-center cursor-pointer'>
                                        <Image width={141} height={42} src={data.text}></Image>
                                    </div>
                                }
                                {data.text == benfica &&
                                    <div className='m-5 flex items-center justify-center cursor-pointer'>
                                        <Image width={40} height={39} src={data.text}></Image>
                                        <div className=' ml-2'>
                                            <p>BENFICA</p>
                                            <p>FOOTBALL CLUB</p>
                                        </div>
                                    </div>
                                }
                                <div onClick={function () {
                                    router.push("/collection");
                                }} className=' text-center flex justify-center items-center text-md w-full mb-5'>
                                    <p className='m-2 cursor-pointer'>DISCOVER THE COLLECTIONS</p>
                                </div>
                            </div>
                        )
                    })}
                </div> */}

                <div className='mt-20 px-6 lg:px-0'>
                    <Footer></Footer>
                </div>

            </div>
        </div>
    )
}
