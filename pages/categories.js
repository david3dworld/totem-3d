import React from 'react'
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

export default function Categories() {
    const thematics = [
        {
            image : fireman,
            name : "Movies",
            icon : localMovies
        },
        {
            image : games,
            name : "Games",
            icon :  gamepad
        },
        {
            image : soccer,
            name : "Sport",
            icon : football
        },
        {
            image : music,
            name : "Music",
            icon : musicIcon
        },
        {
            image : popeyePunch,
            name : "Comics",
            icon : book
        },
        {
            image : art,
            name : "Art",
            icon : artIcon
        },
    ];
    const lastDrop = [
        {
          title : popeyeBlue,
          image : popeyeCollection,
          name : "Popeye",
          rare : "COMMON",
          cost : 49,
          divide : "8760/10,000"
        },
        {
          title : popeyeBlue,
          image : popeyeEnemy,
          name : "Bluto",
          rare : "UNCOMMON",
          cost : 59,
          divide : "2340/8000"
        },
        {
          title : popeyeBlue,
          image : jeep,
          name : "The Jeep",
          rare : "RARE",
          cost : 79,
          divide : "3230/5,500"
        },
        {
            title : popeyeBlue,
            image : food,
            name : "Spinach Can",
            rare : "ULTRA RARE",
            cost : 99,
            divide : "1190/2300"
        },
        {
            title : popeyeBlue,
            image : popeyeGreen,
            name : "Popeye animated",
            rare : "ULTRA RARE",
            cost : 49,
            divide : "1190/2300"
        },
        {
            title : popeyeBlue,
            image : popeyeGreen,
            name : "Popeye animated",
            rare : "ULTRA RARE",
            cost : 49,
            divide : "1190/2300"
          },
          {
            title : popeyeBlue,
            image : popeyeEnemy,
            name : "Bluto",
            rare : "UNCOMMON",
            cost : 59,
            divide : "2340/8000"
          },
          {
            title : phantomPurple,
            image : phantomAnimal,
            name : "Devil",
            rare : "RARE",
            cost : 79,
            divide : "345/3000"
          },
          {
            title : phantomPurple,
            image : phantomCollection,
            name : "The Phantom",
            rare : "UNCOMMON",
            cost : 49,
            divide : "1256/6,000"
          },
          {
            title : phantomPurple,
            image : phantomAnimal,
            name : "Devil",
            rare : "RARE",
            cost : 79,
            divide : "345/3000 "
          },
      ]
      const router = useRouter();
  return (
    <div  style={{ backgroundColor : "#0D0F23",color : "#919CC1" ,fontFamily:"Chakra Petch"}} className='text-sm flex flex-col items-center'>
        <div className='w-4/5'>
        <Navbar></Navbar>
        <div className='mt-20 text-white'>
            <p style={{ font : "normal normal Chakra Petch" }} className='text-4xl'>Thematics</p>  
        </div>

        <div className='mt-5 text-white lg:w-2/3'>
            <p style={{ fontFamily:"Poppins" }}>TOTEM digital collectible figurines include an extensive array of categories by iconic brands worldwide. Discover your favorite licenses in a new way and create a digital collection like never before.</p>
        </div>

        <div className='flex items-center lg:grid lg:grid-cols-6 gap-5 mt-8 flex-col lg:flex-row'>
            {thematics.map(function(data){
                return (
                    <div style={{ width : "162px",height:"335px",background : "#161A42",color:"#E0E3FF" }} className='flex flex-col'>
                       <div className='m-2'>
                           <Image src={data.image}></Image>
                        </div>
                        <div className='flex justify-center'>
                        <div style={{ background : "#161A42",border : "2px solid #2E357B" ,width : "34px",height : "34px" }} className='relative flex justify-center items-center rounded-full bottom-7'>
                            <Image src={data.icon}></Image>
                        </div>
                        </div>
                        <div className='relative bottom-7'>
                        <div className=''>
                            <p className=' text-2xl text-center'>{data.name}</p>
                        </div>
                        <div style={{ border: '1px solid #2E357B' }} className='mt-3 mb-3'>
                        </div>
                        <div onClick={function(){
                          router.push("/collection");
                        }} className='cursor-pointer text-center flex justify-center items-center text-md w-full'>
                            <p>DISCOVER THE COLLECTIONS</p>
                        </div>
                        </div>
                    </div>
                )
            })}
        </div>

        <div className='mt-16'>
            <p className='text-white text-xl'>Other collectibles</p>

            <div className='flex flex-col items-center lg:grid grid-cols-5 mt-5 gap-x-5 gap-y-12'>
              {lastDrop.map(function(data){
                return (
                  <div style={{background:"#161A42",width : "200px",height:"426px" }} className=' mt-0 w-full lg:w-max rounded-lg'>
                    <div style={{ borderRadius : '8px',height : "230px" }} className=' bg-white m-2'>
                      <div className='relative top-2 left-2'>
                      <Image height={20} width={60} src={data.title}></Image>
                      </div>
                      <div style={{ borderRadius : '8px' }}  className=' flex justify-center items-center'>
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
                            data.rare=="RARE" && <p style={{ color : "#7AF4AE" }}>{data.rare}</p> 
                        }
                                                {
                            data.rare=="UNCOMMON" && <p style={{ color : "#ED5B62  " }}>{data.rare}</p>
                        }
                        {
                            data.rare=="ULTRA RARE" && 
                            <p style={{ color : "#F4D96C" }}>{data.rare}</p>
                        }
                                                                {
                            data.rare=="COMMON" && <p className='text-white'>{data.rare}</p>
                        }
                        <p className='absolute right-0 text-white'>Serie 1</p>
                      </div>

                      <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                      </div>
                      <div style={{ fontFamily : "Poppins" }} className='flex items-center relative mt-4'>
                        <p style={{ color : "#0EA8D6" }} className='text-white text-2xl'>{data.cost}$</p>
                        <p style={{ color : "#0EA8D6" }} className='ml-1 text-lg '>25</p>
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

              <div className='mt-20'>

              </div>

              <Footer></Footer>

        </div>
    </div>
  )
}
