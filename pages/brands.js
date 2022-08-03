import React, { useEffect, useState } from 'react'
import Navbar from './navbar/index'
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
import popeye from "../images/popeye@2x.png"
import flash from "../images/flash_gordon@2x.png"
import benfica from "../images/benfica@2x.png"
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
import jeep from "../images/jeep.png"
import polygon1 from "../images/polygon-matic-logo.png"
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

                <div className='mt-20 text-white'>
                    <p className='text-4xl'>Brands</p>
                    <p style={{ fontFamily: "Poppins" }} className='mt-5'>The future of pop culture is here. Now all of your favorite brands are available as digital assets for collection. The most iconic and popular brands have partnered with TOTEM to create unique, authentic, and officially licensed figurines for digital collection in the NFT market.</p>
                </div>

                <div className='flex items-center'>
                    {brands.length == 0 && <div className='w-full'>
                        <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={4} height={'170px'} width={'150px'} />
                    </div>}
                </div>
                <div className='w-full mt-8 lg:px-20'>
                    <Slider {...settingsBrands}>
                    {brands?.map(function (data, index) {

                        return (
                            <div className=''>
                            <div key={index} style={{ background: "#161A42", color: "#E0E3FF", width: "257px", height: "388px" }} className=' flex flex-col rounded-lg'>
                                <div className='w-full h-full'>
                                    <div style={{ borderRadius: '8px', overflow: 'hidden' }} className='w-full h-56 relative'>
                                        <Image src={data.imageUrl}
                                        layout="fill"
                                        ></Image>
                                    </div>
                                </div>
                                {/* <div className='mt-0 text-4xl flex items-center justify-center cursor-pointer mx-5'>
                                    <div className='text-lg'>{data.name}</div>
                                    <div>{data.remarks}</div>

                                </div> */}
                                <div className='w-40 h-40 text-center mx-auto mt-2'>
                                    <div style={{ borderRadius: '8px', overflow: 'hidden' }} className='w-full h-full relative'>
                                        <Image src={data.logoUrl}
                                            width={238} height={228} objectFit="contain" layout='fill'
                                        ></Image>
                                    </div>
                                </div>
                                <div style={{ border: '2px solid #2E357B' }} className='w-full my-2'>
                                </div>
                                <div onClick={function () {
                                    router.push(`/collection/${data._id}`);
                                }} className=' hover:opacity-80 text-center flex justify-center items-center text-md w-full mb-5'>
                                    <p className='m-2 cursor-pointer'>DISCOVER THE COLLECTIONS</p>
                                </div>
                            </div>
                            </div>
                        )
                    })}
                    </Slider>
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

                <div className='mt-20'>
                </div>

                <Footer></Footer>

            </div>
        </div>
    )
}
