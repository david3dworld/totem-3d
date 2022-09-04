import React from 'react'
import Navbar from "../navbar/index"
import fireman from "../../images/fireman.png"
import games from "../../images/games.png"
import soccer from "../../images/soccer.png"
import music from "../../images/music.png"
import popeyePunch from "../../images/popeyePunch.png"
import art from "../../images/art.png"
import localMovies from "../../images/localMovies.png"
import gamepad from "../../images/gamepad.png"
import football from "../../images/footballIcon.png"
import musicIcon from "../../images/musicIcon.png"
import book from "../../images/book.png"
import artIcon from "../../images/articon.png"
import Image from 'next/image'
import popeye from "../../images/popeye@2x.png"
import flash from "../../images/flash_gordon@2x.png"
import benfica from "../../images/benfica@2x.png"
import stormStrooper from "../../images/original_stormtrooper@2x.png"
import group from "../../images/Groupe 275@2x.png"
import phantom from "../../images/phantom@2x.png"
import Footer from '../footer'
import facebook from "../../images/facebook.png"
import discord from "../../images/discord.png"
import twitter from "../../images/twitter.png"
import instagram from "../../images/instagram.png"
import intersection from "../../images/Intersection1.png"
import popeyeCollection from "../../images/popeye-collection.png"
import flashGordon from "../../images/flash-gordon.png"
import phantomCollection from "../../images/phantom.png"
import benficasc from "../../images/benfica.png"
import storm from "../../images/storm.png"
import bg1 from "../../images/bg1.png"
import bg2 from "../../images/bg2.png"
import bg3 from "../../images/bg3.png"
import bg4 from "../../images/bg4.png"
import bg5 from "../../images/bg5.png"
import popeyeGreen from "../../images/popeyeGreen.png"
import popeyeEnemy from "../../images/popeyeEnemy.png"
import phantomAnimal from "../../images/phantomAnimal.png"
import flashKing from "../../images/flashKing.png"
import food from "../../images/food.png"
import popeyeBlue from "../../images/popeyeBlue.png"
import totem from '../../images/totem.png'
import polygon from "../../images/polygon-matic-logo.png"
import { useRouter } from 'next/router'
import phantomPurple from "../../images/phantomPurple.png"
import jeep from "../../images/jeep.png"
import polygon1 from "../../images/polygon-matic-logo.png"
import { CheckBox, CheckBoxOutlineBlankRounded } from '@mui/icons-material'
import popeye2x from "../../images/popeye2x.png"
import popeyeDetail from "../../images/popeye-detail.png"
import rotation from "../../images/3d.png"
import spinach from "../../images/spinach.png"
import a from "../../images/a.png"

export default function Spinach() {
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
        }
      ]
  return (
    <div style={{ backgroundColor : "#0D0F23",color : "#919CC1",fontFamily:"Chakra Petch" }} className='text-sm flex flex-col items-center'>
    <div className='max-w-7xl'>

    <Navbar></Navbar>

    <div className='mt-20'>
    <div style={{background: '#161A42 0% 0% no-repeat padding-box',borderRadius: '16px' }} className=' lg:h-16 w-full mt-8 flex items-center lg:flex-row flex-col text-white'>
<div className='lg:ml-5'>
<Image src={popeyeDetail}></Image>
</div>
<div className='m-3'>
    <p style={{ fontFamily:"Poppins" }} className='text-3xl'>POPEYE</p>
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
    <div className=' flex flex-col justify-center bg-white product-img relative' style={{ borderRadius : "20px" }}>
        <Image width={393} height={525} src={spinach}></Image>
        <div className=' absolute right-0 top-0 m-2'>
            <Image width={52} height={52} src={rotation}></Image>
        </div>
    </div>
    <div className='w-full flex justify-center'>
    <div style={{ borderRadius: '20px',background : "#161A42 0% 0% no-repeat padding-box" }} className='w-11/12 p-5 flex lg:flex-row flex-col mt-5 lg:mt-0'>
        <div className='w-7/12 flex flex-col items-center lg:items-start'>
            <div className='flex'>
                <div className='text-md'>
                <p className='text-white'>NFT name</p>
                <p className='relative bottom-1' style={{ color : "#0EA8D6",fontFamily:"Poppins" }}>SPINACH CAN</p>
                </div>
                <div className='text-md ml-10'>
                <p className='text-white'>Edition</p>
                <p className='relative bottom-1' style={{ color : "#0EA8D6",fontFamily:"Poppins" }}>Serie 1</p>
                </div>
                <div className='text-md ml-10'>
                <p className='text-white'>Scarcity</p>
                <p style={{fontFamily:"Poppins" }} className='relative bottom-1 text-white'>RARE</p>
                </div>
                <div className='text-md ml-10'>
                    <Image src={a}></Image>
                </div>
            </div>

            <div style={{ width : "285px" }} className='mt-3 text-white p-6 lg:p-0'>
                <p style={{fontFamily:"Poppins" }}>Spinach is a leafy vegetable with a high vitamin content, making it a healthy and nutritious food for human consumption. In most media featuring Popeye, it is used as a last-minute device in which the hero, in danger, pulls out a can of spinach from his shirt or otherwise acquires the vegetable and eats it. This gives his already extraordinary strength a tremendous boost, helping him withstand his enemies’ attacks and all kinds of adverse situations.</p>
            </div>

            <div className='lg:mt-5'>
                <div className='flex items-center'>
                    <p className='text-white'>Price</p>
                    <p className='text-2xl ml-2' style={{ color : "#0EA8D6",fontFamily:"Poppins" }}>$49</p>
                    <p className='ml-3' style={{ color : "#0EA8D6",fontFamily:"Poppins" }}>25</p>
                    <div className='ml-1'>
                    <Image src={polygon1}></Image>
                    </div>
                </div>
            </div>

            <div style={{ background : "#0EA8D6",borderRadius: '10px',width : "161px",height : "40px" }} className=' cursor-pointer hover:opacity-80 flex justify-center items-center mt-5'>
                <p style={{ color : '#161A42' }} className="font-bold text-lg ">COLLECT NOW</p>
            </div>

        </div>
        <div className='mt-5 lg:mt-0 flex flex-col items-center lg:items-start'>
        <div className='text-md flex flex-col items-center lg:items-start'>
                <p className='text-white '>Remain</p>
                <p className='relative ' style={{ color : "#0EA8D6",fontFamily:"Poppins" }}>6,756/8,0000</p>
                </div>
                <div className='text-md mt-4 flex flex-col items-center lg:items-start'>
                <p className='text-white'>ID</p>
                <p className='relative ' style={{ color : "#0EA8D6",fontFamily:"Poppins" }}>#1099607081964</p>
                </div>
                <div className='text-md mt-4 flex flex-col items-center lg:items-start'>
                <p className='text-white'>CATEGORY</p>
                <p className='relative ' style={{ color : "#0EA8D6",fontFamily:"Poppins" }}>#1099607081964</p>
                </div>
                <div className='text-md mt-4 flex flex-col items-center lg:items-start'>
                <p className='text-white'>Release date</p>
                <p className='relative ' style={{ color : "#0EA8D6",fontFamily:"Poppins" }}>05/04/22</p>
                </div>
                <div className='text-md mt-4 flex flex-col items-center lg:items-start'>
                <p className='text-white'>Tags</p>
                <p className='relative ' style={{ color : "#0EA8D6",fontFamily:"Poppins" }}>Pop culture, Sailor, Vintage, Spinash</p>
                </div>
                <div className='text-md mt-12 flex flex-col items-center lg:items-start'>
                <p className='text-white'>Legal</p>
                <p className='relative bottom-0' style={{ color : "#0EA8D6",fontFamily:"Poppins" }}>© 2022 King Features Syndicate, Inc.</p>
                <p style={{ color : "#0EA8D6",fontFamily:"Poppins" }}>© Totem Digital</p>
                </div>
        </div>
    </div>
    </div>
    </div>

    <div className='mt-12'>
        <p className='text-xl text-white'>Other collectibles</p>
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
                        <p className='text-white'>{data.rare}</p>
                        <p className='absolute right-0 text-white'>Serie 1</p>
                      </div>

                      <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                      </div>
                      <div style={{fontFamily:"Poppins" }} className='flex items-center relative mt-4'>
                        <p style={{ color : "#0EA8D6" }} className='text-white text-2xl'>{data.cost}$</p>
                        <p style={{ color : "#0EA8D6" }} className='ml-1 text-lg '>25</p>
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
        
        <div className='mt-10'>
        <Footer></Footer>
        </div>
        
    </div>
    </div>
  )
}
