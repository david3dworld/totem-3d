import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import Navbar from "../navbar/index"
import facebook from "../../images/facebook.png"
import discord from "../../images/discord.png"
import twitter from "../../images/twitter.png"
import instagram from "../../images/instagram.png"
import Footer from '../footer'
import flash from "../../images/flash_gordon@2x.png"
import popeyeGreen from "../../images/popeyeGreen.png"
import popeyeEnemy from "../../images/popeyeEnemy.png"
import phantomAnimal from "../../images/phantomAnimal.png"
import flashKing from "../../images/flashKing.png"
import food from "../../images/food.png"
import popeyeBlue from "../../images/popeyeBlue.png"
import polygon1 from "../../images/polygon-matic-logo.png"
import { getBrand } from '../../api/brand'
import placeholderImage from "../../images/loading.png"
import { getProductsByBrandId } from '../../api/product'
import { data } from 'autoprefixer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Slide } from '@mui/material'
import SingleModelView from '../components/singleModelView'

import music from "../../images/Icon awesome-music.svg"
import movies from "../../images/Icon material-local-movies.svg"
import games from "../../images/Icon metro-gamepad.svg"
import sports from "../../images/Icon awesome-football-ball.svg"
import comics from "../../images/Icon awesome-book-open.svg"
import art from "../../images/Icon map-art-gallery.svg"
const lastDrop = [
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
    title : popeyeBlue,
    image : phantomAnimal,
    name : "Devil",
    rare : "RARE",
    cost : 79,
    divide : "345/3000 "
  },
  {
    title : flash,
    image : flashKing,
    name : "Prince Vultan",
    rare : "RARE",
    cost : 79,
    divide : "770/2300"
  },
  {
    title : popeyeBlue,
    image : food,
    name : "Spinach Can",
    rare : "ULTRA RARE",
    cost : 99,
    divide : "1190/2300"
  },
];
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
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
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
export default function Collection() {
  const { query } = useRouter()
  const [brand, setBrand] = useState({})
  const [products, setProducts] = useState({})
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [filters,setFilters] = useState([]);
  const [totalMaxCap, setTotalMaxCap] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);
  const [tag,setTag] = useState("");
  const [loadingItems,setLoadingItems] = useState([]);
  const [figureRotate,setFigureRotate] = useState({
    index: null,
    rotate: 0
  });

  const loadingItemsRef = useRef(null);
  useEffect(() => {
    const { id: brandId } = query 
    if(brandId){
      getBrand(brandId, (error, res) => {
        if(res?.data) {
          setBrand(res.data)
        }
      })
      getProductsByBrandId(brandId, (error, res) => {
        if(res?.data) {
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
    
  }, [query])
  useEffect(function(){
    setFilters(filters?.filter(function(data){
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
  const settingsCollection = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
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

  const widthItem = 180;

  const onMouseEnter = (e, index) => {
    const boundingBox = e.target.getBoundingClientRect();
    const x = (e.clientX - boundingBox.left).toFixed(0);
    setFigureRotate({
      index: index,
      rotate: (x*360/widthItem)*Math.PI/180
    })
  }
  
  const onMouseMove = (e, index) => {
    const boundingBox = e.target.getBoundingClientRect();
    const x = (e.clientX - boundingBox.left).toFixed(0);
    setFigureRotate({
      index: index,
      rotate: (x*360/widthItem)*Math.PI/180
    })
  }

  const onMouseOut = (index) => {
    setFigureRotate({
      index: null,
      rotate: 0
    })
  }
  
  const onLoadItem = (index) => {
    clearTimeout(loadingItemsRef.current);
    loadingItemsRef.current = setTimeout(() => {
      const item = loadingItems.find(item => item.index == index);
      if (!item) {
        setLoadingItems([...loadingItems, {
          index: index,
          progress: 0
        }])
      }
    }, 1500);
  }

  const onLoadingItem = (index, progress, e) => {
    const item = loadingItems.find(item => item.index == index);
    if (item) {
      setLoadingItems([...loadingItems].map(it => {
        if (it.index == index) {
          return {
            index: index,
            progress: +progress
          }
        }
        return it;
      }))
    }
  }

  const onRemoveLoadingItem = (index) => {
    clearTimeout(loadingItemsRef.current);
    const item = loadingItems.find(item => item.index == index);
    if(item && item.progress != 100) {
      const data = [...loadingItems].filter(item => item.index != index)
      setLoadingItems(data);
    }
  }

  return (
    <div className='text-sm flex flex-col items-center' style={{ backgroundColor : "#0D0F23",color : "#919CC1",fontFamily:"Chakra Petch" }}>
      <div className='max-w-7xl'>
      <Navbar></Navbar>

    <div 
      style={{ backgroundSize:"cover", height: 383, backgroundImage:`url('${brand?.backgroundUrl}')`}}
      className=' mt-10 p-5 lg:p-0 flex items-center lg:flex-row flex-col rounded-2xl bg-no-repeat bg-contain bg-center bg-collection'
    >
      <p className='w-2/5 lg:m-10 text-white mt-5 lg:mt-0'>{brand.description}</p>
    </div>

  <div
    style={{background: 'var(--unnamed-color-161a42) 0% 0% no-repeat padding-box;',
    background: '#161A42 0% 0% no-repeat padding-box',borderRadius: '16px' }} 
    className='lg:h-16 w-full mt-8 flex items-center lg:flex-row flex-col text-white '
  >
    <div className='ml-5 lg:mt-0 mt-2'>
      <Image
        alt={`${brand.name} logo`}
        src={brand.iconUrl || placeholderImage}
        width={85}
        height={85}
        className='rounded-full object-cover mt-2'
      />
    </div>
    <div className='m-3'>
      {brand?.name?.length > 10
      ?
        <p className='text-lg'>{brand.name}</p>
        :
        <p className='text-3xl'>{brand.name}</p>
      }
    </div>
    <div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1 m-2' />
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
      <div className='flex items-center justify-center lg:justify-end mt-3 lg:w-1/4 w-full'>
          <a 
            className='m-1'
            href='https://facebook.com/'
            target="_blank"
            rel="noreferrer"
          >
            <div className='hover:opacity-80'>
            <Image src={facebook} alt='facebook-url' />
            </div>
          </a>
          <a 
            className='m-1'
            href='https://twitter.com/'
            target="_blank"
            rel="noreferrer"
          >
            <div className='hover:opacity-80'>
            <Image src={twitter} alt='twitter-url' />
            </div>
          </a>
          <a 
            className='m-1'
            href='https://discord.com/'
            target="_blank"
            rel="noreferrer"
          >
            <div className='hover:opacity-80'>
            <Image src={discord} alt='discord-url' />
            </div>
          </a>
          <a 
            className='m-1'
            href='https://www.instagram.com/'
            target="_blank"
            rel="noreferrer"
          >
            <div className='hover:opacity-80'>
            <Image src={instagram} alt='instagram-url' />
            </div>
          </a>
      </div>
    </div>
    <div className='flex items-center mt-16 '>
      {filters.length == 0 && <div className='w-full'>
        <Skeleton containerClassName='flex justify-between' className='loading-bar' inline={true} count={4} height={'170px'} width={'150px'} />
      </div>}
    </div>
<div className='flex mt-16 lg:flex-row flex-col '>
    <div  style={{ 
      //background : "#161A42" 
      height:"350px" }} className='lg:w-1/4 w-full rounded-lg p-5 flex flex-col items-center lg:items-start'>
      {/*
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
          */}
    </div>

    
    <div className='mt-5 ml-5 lg:mt-0 w-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-6xl '>
    <Slider  {...settingsBrands}>
        {filters?.map(function(data, index){
          const renderRarity = () => {
            let color
            switch(data.rarity) {
              case 'RARE': {
                color = '#7AF4AE'
                break;
              }
              case 'ULTRA RARE': {
                color = '#F4D96C'
                break;
              }
              case 'UNCOMMON': {
                color = '#ED5B62'
                break;
              }
              default: {
                color = 'white'
                break;
              }
            }
            return <p style={{color}}>{data.rarity}</p>
          }
          return (
            <div key={index}>
            <Link href={`/payment/${data._id}`}>
              <a>
                <div className=''>
                <div style={{background:"#161A42" }} className='p-1 mt-0 w-full lg:w-max rounded-lg m-5'>
                  <div style={{ borderRadius : '8px', width: 'fit-content' }} className='bg-white m-2'>
                    {/* <div className='relative top-2 left-2'>
                    <Image height={20} width={60} src={popeyeBlue} />
                    </div> */}
                    <div  className='rounded overflow-hidden flex justify-center items-center'>
                    {
                      (!loadingItems.find(item => item.index == index) || (loadingItems.find(item => item.index == index) && loadingItems.find(item => item.index == index).progress != 100)) && <div
                      style={{ height: 200, width: widthItem, position: "relative" }}>
                        <Image 
                          src={data.imageUrl} 
                          objectFit="cover" 
                          width={widthItem} 
                          height={200} 
                          alt={`${data.name}'s image`} 
                          onMouseEnter={(e) => onLoadItem(index, 0)}
                          onMouseOut={() => onRemoveLoadingItem(index)}/>
                      { loadingItems.find(item => item.index == index) && <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          height: 5,
                          width: `${loadingItems.find(item => item.index == index).progress}%`,
                          background: 'rgb(14, 168, 214)',
                          zIndex: 2
                        }}></div>}
                      </div>
                    }
                    {
                      !!loadingItems.find(item => item.index == index) && <div
                      style={{ height: 200, width: widthItem, position: "relative", display: loadingItems.find(item => item.index == index).progress == 100 ? 'block' : 'none' }}
                      onMouseEnter={(e) => onMouseEnter(e,index)}
                      onMouseMove={(e) => onMouseMove(e,index)}
                      onMouseOut={() => onMouseOut(index)}>
                        <SingleModelView
                          key={index}
                          isHasControl={false}
                          initCanvasConfig={{
                            orthographic: true,
                            shadows: true,
                            orbitControls: {
                                enableZoom: false,
                                enablePan: false,
                                enableRotate: false,
                                minPolarAngle: 0,
                                maxPolarAngle: Math.PI
                            },
                          }}
                          hoverRotateAngle={index == figureRotate.index ? figureRotate.rotate : 0}
                          isShowProgress={true}
                          index={index}
                          onLoading={(index, progress) => onLoadingItem(index, progress, loadingItems)}
                          modelUrl={data.image3D ? data.image3D : null}
                        />
                      </div>
                    }
                    <div className='category'>
                      {data.category == 'music' && <Image alt='' className='music' src={music}/>}
                      {data.category == 'movies' && <Image alt='' className='movies' src={movies}/>}
                      {data.category == 'games' && <Image alt='' className='games' src={games}/>}
                      {data.category == 'sports' && <Image alt='' className='sports' src={sports}/>}
                      {data.category == 'comics' && <Image alt='' className='comics' src={comics}/>}
                      {data.category == 'art' && <Image alt='' className='art' src={art}/>}
                    </div>
                    </div>
                  </div>
                  <div className='p-3'>
                    <p className='text-lg text-white'>{data.name}</p>

                    <div className='relative flex items-center mt-3'>
                      {renderRarity()}
                      <p className='absolute right-0 text-white mb-2'>{data.series}</p>
                    </div>

                    <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                    </div>
                    <div className='flex items-center relative mt-4'>
                      <p style={{ color : "#0EA8D6" }} className='text-white text-2xl'>{data.priceUsd}$</p>
                      <p style={{ color : "#0EA8D6" }} className='ml-1 text-lg '>{data.priceMatic}</p>
                      <Image src={polygon1} alt='polygon-icon' />
                      <p className='absolute right-0'>{data?.productNo}/{data?.maxCap}</p>
                    </div>
                    <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2" />
                    <div className='pt-3'>
                      <p className='text-white cursor-pointer text-center hover:opacity-80'>COLLECT</p>
                    </div>
                  </div>
                </div>
                </div>
              </a>
            </Link>
            </div>
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
