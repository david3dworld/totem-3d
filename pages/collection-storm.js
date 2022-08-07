import React from 'react'
import Navbar from "./navbar/index"
import Image from 'next/image'
import popeyeDetail from "../images/popeye-detail.png"
import facebook from "../images/facebook.png"
import discord from "../images/discord.png"
import twitter from "../images/twitter.png"
import instagram from "../images/instagram.png"
import polygon from "../images/polygon.png"
import intersection from "../images/Intersection.png"
import Footer from './footer'
import popeye from "../images/popeye@2x.png"
import flash from "../images/flash_gordon@2x.png"
import benfica from "../images/benfica@2x.png"
import stormStrooper from "../images/original_stormtrooper.png"
import group from "../images/Groupe 275@2x.png"
import phantom from "../images/phantom@2x.png"
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
import polygon1 from "../images/polygon-matic-logo.png"
import { useState,useEffect } from 'react'
import { CheckBox, CheckBoxOutlineBlankRounded } from '@mui/icons-material'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { height } from '@mui/system'
import bgCollection from '../images/bg-collection.png'
import popeyeHome from "../images/popeyeHome.png"
import bgStorm from "../images/bg-storm.png"
import red from "../images/red.png"
import stormTitle from "../images/storm-title.png"
import white from "../images/white.png"
import red2x from "../images/red2x.png"
import yellow from "../images/yellow.png"

export default function collectionStorm() {
  const lastDrop = [
    {
      title : stormStrooper,
      image : white,
      name : "Classic",
      rare : "COMMON",
      cost : 59,
      divide : "8760/16,000"
    },
    {
      title : stormStrooper,
      image : red2x,
      name : "Red",
      rare : "RARE",
      cost : 79,
      divide : "2340/11,000"
    },
    {
      title : stormStrooper,
      image : yellow,
      name : "Gold",
      rare : "ULTRA RARE",
      cost : 149,
      divide : "930/3,000 "
    },
  ];
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [filters,setFilters] = useState(lastDrop);
  const [tag,setTag] = useState("");
  
  useEffect(function(){
    setFilters(lastDrop);
    setFilters(filters.filter(function(data){
      if (tag == ""){
        return data;
      }
      if (data.name.toLocaleLowerCase().includes(tag.toLocaleLowerCase())){
        return data;
      }
    }));
    if (checked && checked2 && checked3 && checked4){
      setFilters(lastDrop);
    }
    else if (checked && checked2 && checked3){
      setFilters(filters.filter(function(data){
        return data.rare == "COMMON" || data.rare == "UNCOMMON" || data.rare == "RARE";
      }))
    }
    else if (checked && checked2 && checked4){
      setFilters(filters.filter(function(data){
        return data.rare == "COMMON" || data.rare == "UNCOMMON" || data.rare == "ULTRA RARE";
      }))
    }
    else if (checked && checked3 && checked4){
      setFilters(filters.filter(function(data){
        return data.rare == "COMMON" || data.rare == "ULTRA RARE" || data.rare == "RARE";
      }))
    }
    else if (checked2 && checked4 && checked3){
      setFilters(filters.filter(function(data){
        return data.rare == "ULTRA RARE" || data.rare == "UNCOMMON" || data.rare == "RARE";
      }))
    }
    else if (checked && checked2){
      setFilters(filters.filter(function(data){
        return data.rare == "COMMON" || data.rare == "UNCOMMON";
      }))
    }
    else if (checked && checked3){
      setFilters(filters.filter(function(data){
        return data.rare == "COMMON" || data.rare == "RARE";
      }))
    }
    else if (checked && checked4){
      setFilters(filters.filter(function(data){
        return data.rare == "COMMON" || data.rare == "ULTRA RARE";
      }))
    }
    else if (checked2 && checked3){
      setFilters(filters.filter(function(data){
        return data.rare == "RARE" || data.rare == "UNCOMMON";
      }))
    }
    else if (checked4 && checked2){
      setFilters(filters.filter(function(data){
        return data.rare == "ULTRA RARE" || data.rare == "UNCOMMON";
      }))
    }
    else if (checked3 && checked4){
      setFilters(filters.filter(function(data){
        return data.rare == "RARE" || data.rare == "ULTRA RARE";
      }))
    }
    else if (checked){
      setFilters(filters.filter(function(data){
        return data.rare == "COMMON";
      }))
    }
    else if (checked2){
      setFilters(filters.filter(function(data){
        return data.rare == "UNCOMMON";
      }))
    }
    else if (checked3){
      setFilters(filters.filter(function(data){
        return data.rare == "RARE";
      }))
    }
    else if (checked4){
      setFilters(filters.filter(function(data){
        return data.rare == "ULTRA RARE";
      }))
    }
  },[tag,checked,checked2,checked3,checked4,value]);

  function valuetext(value) {
    return "$" + value + "!";
  }
  const [value, setValue] = React.useState([10, 200]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilters(filters.filter(function(data){
      if (data.cost > value[0] && data.cost < value[1]){
        return data;
      }
    }));
  };
  return (
    <div className='text-sm flex flex-col items-center' style={{ backgroundColor : "#0D0F23",color : "#919CC1",fontFamily:"Chakra Petch" }}>
        <div className='w-4/5'>
        <Navbar></Navbar>

        <div className=' lg:h-96 mt-10 p-8 lg:p-0 flex items-center justify-center lg:flex-row flex-col bg-storm rounded-lg'>
<div className='flex flex-col h-full lg:w-1/2 w-3/4' >
<div className='lg:m-10'>
<Image height={140} width={392} src={stormTitle}></Image>
</div>
<div className='lg:m-10 w-full text-white mt-5 lg:mt-0'>
<p style={{ fontFamily:"Poppins" }} className=''>Known for never hitting their targets or taking a break from their uniforms, these mischievous stormtroopers are now hitting the digital NFT world in the form of collectible figurines! There’s a reason these stormtroopers have taken over the internet with their clumsiness and paradoxically terrifying yet harmless character, and why they’ve become so popular. Now you can have this exclusive sensation added to your digital collection!</p>
</div>
</div>
<div className=' h-full relative left-5 lg:mt-0 mb-2'>
    <Image objectFit='cover' width={655} height={443} src={red}></Image>
</div>
</div>

<div style={{background: 'var(--unnamed-color-161a42) 0% 0% no-repeat padding-box;',
background: '#161A42 0% 0% no-repeat padding-box',borderRadius: '16px' }} className='lg:h-16 w-full mt-8 flex items-center lg:flex-row flex-col text-white'>
<div className='ml-5 w-1/2'>
<Image src={popeyeDetail}></Image>
</div>
<div className='m-3'>
    <p style={{ fontFamily:"Poppins" }} className='text-3xl'>THE ORIGINAL STORMTROOPER</p>
</div>
<div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1 m-2'>
</div>
<div className='lg:m-0 m-6 w-full flex justify-center items-center'>
    <p className='text-2xl'>3 figurines</p>
</div>
<div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1 m-2'>
</div>
<div className='lg:m-0 m-6 w-full flex justify-center items-center'>
    <p className='text-2xl'>007654/30,000 remaining</p>
</div>
<div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1 m-2'>
</div>
<div className='flex items-center justify-center mt-3 w-full'>
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

<div className='flex mt-16 lg:flex-row flex-col '>
    <div  style={{ background : "#161A42" ,height:"350px" }} className='lg:w-1/4 w-full rounded-lg p-5 flex flex-col items-center lg:items-start'>
        <p className='text-2xl'>FILTERS</p>
        <div>
            <p className='mt-6 text-lg' style={{ color : "#0EA8D6" }}>SCARCITY</p>
            <div style={{ fontFamily : "Poppins" }}>
            <div className='flex items-center'>
            <input type="checkbox"
        defaultChecked={checked}
        onChange={() => {setChecked(!checked);
          setFilters(lastDrop);
        }
        } 
      />
            <p className='ml-2'>Common</p>
            </div>
            <div className='flex items-center'>
            <input type="checkbox"
        defaultChecked={checked2}
        onChange={() => {setChecked2(!checked2);
          setFilters(lastDrop)}
        }
        
      />
            <p className='ml-2'>Uncommon</p>
            </div>
            <div className='flex items-center'>
            <input type="checkbox"
        defaultChecked={checked3}
        onChange={() => {setChecked3(!checked3);
          setFilters(lastDrop)}
        } 
      />
            <p className='ml-2'>Rare</p>
            </div>
            <div className='flex items-center'>
            <input type="checkbox"
        defaultChecked={checked4}
        onChange={() => { setChecked4(!checked4);
          setFilters(lastDrop)}
        } 
      />
            <p className='ml-2'>Ultra rare</p>
            </div>
            </div>
        </div>
        <div className='flex flex-col items-center lg:items-start'>
            <p className='mt-3 text-lg' style={{ color : "#0EA8D6" }}>PRICE RANGE</p>
        </div>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={250}
        o
      />
              <div className='flex flex-col items-center lg:items-start'>
            <p className='text-lg mt-2 mb-2 ' style={{ color : "#0EA8D6" }}>TAG</p>
            <input onChange={function(e){
              setTag(e.target.value);
              setFilters(lastDrop);
            }} className='rounded-lg p-1' style={{ border: '1px solid #2E357B;',background : "#161A42",fontFamily:"Poppins" }} placeholder='Enter tag' type="text"></input>
        </div>
    </div>

    <div className='lg:grid lg:grid-cols-4 mt-5 gap-10 ml-5 lg:mt-0 flex flex-col items-center'>
              {filters.map(function(data){
                return (
                  <div style={{background:"#161A42" ,width:"199px",height : "436px" }} className=' mt-0 w-full lg:w-max rounded-lg'>
                    <div style={{ borderRadius : '8px' }} className=' bg-white m-2'>
                      <div className='relative top-2 left-2'>
                      <Image height={20} width={60} src={data.title}></Image>
                      </div>
                      <div style={{ borderRadius : '8px' }}  className=' flex justify-center items-center'>
                      <Image width={163} height={219} src={data.image}></Image>
                      </div>
                    </div>
                    <div className='p-3'>
                      <p className='text-lg text-white'>{data.name}</p>

                      <div className='relative flex items-center mt-3'>
                        <p className=' text-white'>{data.rare}</p>
                        <p className='absolute right-0 text-white'>Serie 1</p>
                      </div>

                      <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                      </div>
                      <div style={{ fontFamily:"Poppins" }} className='flex items-center relative mt-4'>
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

<Footer></Footer>
        </div>
    </div>
  )
}
