import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Navbar from "../navbar/index"
import facebook from "../../images/facebook.png"
import discord from "../../images/discord.png"
import twitter from "../../images/twitter.png"
import instagram from "../../images/instagram.png"
import Footer from '../footer'

import { getBrand } from '../../api/brand'
import placeholderImage from "../../images/loading.png"
import { getProductsByBrandId } from '../../api/product'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductItem from '../../components/ProductItem'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Collection() {
  const { query } = useRouter()
  const [brand, setBrand] = useState({})
  const [products, setProducts] = useState({})
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [filters, setFilters] = useState([]);
  const [isFiltersLoading, setFiltersLoading] = useState(true)
  const [totalMaxCap, setTotalMaxCap] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);
  const [tag, setTag] = useState("");
  const [loadingItems, setLoadingItems] = useState([]);
  const [figureRotate, setFigureRotate] = useState({
    index: null,
    rotate: 0
  });

  const loadingItemsRef = useRef(null);
  useEffect(() => {
    const { id: brandId } = query
    if (brandId) {
      getBrand(brandId, (error, res) => {
        if (res?.data) {
          setBrand(res.data)
        }
      })
      getProductsByBrandId(brandId, (error, res) => {
        if (res?.data) {
          if (window.innerWidth <= 768) {
            setFilters(res.data.result.slice(0, 4))
          } else {
            setFilters(res.data.result.slice(0, 10))
          }
          setFiltersLoading(false)
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
  useEffect(function () {
    setFilters(filters?.filter(function (data) {
      if (tag == "") {
        return data;
      }
      if (data.name.toLocaleLowerCase().includes(tag.toLocaleLowerCase())) {
        return data;
      }
    }));
    if (checked && checked2 && checked3 && checked4) {
      setFilters(lastDrop);
    }
    else if (checked && checked2 && checked3) {
      setFilters(filters.filter(function (data) {
        return data.rare == "COMMON" || data.rare == "UNCOMMON" || data.rare == "RARE";
      }))
    }
    else if (checked && checked2 && checked4) {
      setFilters(filters.filter(function (data) {
        return data.rare == "COMMON" || data.rare == "UNCOMMON" || data.rare == "ULTRA RARE";
      }))
    }
    else if (checked && checked3 && checked4) {
      setFilters(filters.filter(function (data) {
        return data.rare == "COMMON" || data.rare == "ULTRA RARE" || data.rare == "RARE";
      }))
    }
    else if (checked2 && checked4 && checked3) {
      setFilters(filters.filter(function (data) {
        return data.rare == "ULTRA RARE" || data.rare == "UNCOMMON" || data.rare == "RARE";
      }))
    }
    else if (checked && checked2) {
      setFilters(filters.filter(function (data) {
        return data.rare == "COMMON" || data.rare == "UNCOMMON";
      }))
    }
    else if (checked && checked3) {
      setFilters(filters.filter(function (data) {
        return data.rare == "COMMON" || data.rare == "RARE";
      }))
    }
    else if (checked && checked4) {
      setFilters(filters.filter(function (data) {
        return data.rare == "COMMON" || data.rare == "ULTRA RARE";
      }))
    }
    else if (checked2 && checked3) {
      setFilters(filters.filter(function (data) {
        return data.rare == "RARE" || data.rare == "UNCOMMON";
      }))
    }
    else if (checked4 && checked2) {
      setFilters(filters.filter(function (data) {
        return data.rare == "ULTRA RARE" || data.rare == "UNCOMMON";
      }))
    }
    else if (checked3 && checked4) {
      setFilters(filters.filter(function (data) {
        return data.rare == "RARE" || data.rare == "ULTRA RARE";
      }))
    }
    else if (checked) {
      setFilters(filters.filter(function (data) {
        return data.rare == "COMMON";
      }))
    }
    else if (checked2) {
      setFilters(filters.filter(function (data) {
        return data.rare == "UNCOMMON";
      }))
    }
    else if (checked3) {
      setFilters(filters.filter(function (data) {
        return data.rare == "RARE";
      }))
    }
    else if (checked4) {
      setFilters(filters.filter(function (data) {
        return data.rare == "ULTRA RARE";
      }))
    }
  }, [tag, checked, checked2, checked3, checked4, value]);

  function valuetext(value) {
    return "$" + value + "!";
  }
  const [value, setValue] = React.useState([10, 200]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilters(filters.filter(function (data) {
      if (data.cost > value[0] && data.cost < value[1]) {
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
      rotate: (x * 360 / widthItem) * Math.PI / 180
    })
  }

  const onMouseMove = (e, index) => {
    const boundingBox = e.target.getBoundingClientRect();
    const x = (e.clientX - boundingBox.left).toFixed(0);
    setFigureRotate({
      index: index,
      rotate: (x * 360 / widthItem) * Math.PI / 180
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
    if (item && item.progress != 100) {
      const data = [...loadingItems].filter(item => item.index != index)
      setLoadingItems(data);
    }
  }

  return (
    <div className='text-sm flex flex-col items-center w-full' style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }}>
      <div className='max-w-7xl w-full'>
        <Navbar></Navbar>
        <ToastContainer />

        <div
<<<<<<< HEAD
          style={{ backgroundSize: "cover", height: 383}}
          className='bg-top mt-10 p-5 lg:p-5 flex flex-col rounded-2xl bg-no-repeat bg-cover bg-collection'
        >
           <style jsx>{`
          @media and (max-width: 768px){
            .bg-top {
              background-image: url("${brand?.mobile_featured_image}");
              background-position : right;
  
              }
          }
          @media and (min-width: 769px){
            .bg-top {
              background-image: url("${brand?.featuredImage}");
              background-position : right;
  
              }
          }
        `}</style>
=======
          style={{ backgroundSize: "cover", height: 383, backgroundImage: `url('${brand?.backgroundUrl}')` }}
          className=' mt-10 p-5 lg:p-0 flex  flex-col rounded-2xl bg-no-repeat bg-contain bg-center bg-collection'
        >
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
          <div className='hidden lg:block'>
            {brand && brand.brand_name_image && (
              <div className='w-full  text-white mt-14 '>
                <Image alt={brand.name} src={brand.brand_name_image} height={96} width={300} />
              </div>
            )}
            <p className=' text-white mt-5 lg:mt-0 text-sm line-height-24' style={{ fontFamily: "Poppins" }}>{brand.description}</p>
          </div>

        </div>
        <div className='block lg:hidden'>
          {brand && brand.brand_name_image && (
            <div className='h-24 w-full text-white mt-14 text-center'>
              <Image alt={brand.name} src={brand.brand_name_image} height={96} width={300} className=" m-auto" />
            </div>
          )}
          <p className='my-10 mx-5 text-white mt-5 text-sm line-height-24' style={{ fontFamily: "Poppins" }}>{brand.description}</p>
        </div>
        <div
          style={{
            background: 'var(--unnamed-color-161a42) 0% 0% no-repeat padding-box;',
            background: '#161A42 0% 0% no-repeat padding-box', borderRadius: '16px'
          }}
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
<<<<<<< HEAD
            <p className='text-2xl'>{totalRemaining}/{totalMaxCap} minted</p>
=======
            <p className='text-2xl'>{totalRemaining}/{totalMaxCap} remaining</p>
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
          </div>
          <div style={{ border: '2px solid #2E357B' }} className='lg:h-10 w-4/5 lg:w-0 h-1 m-2'>
          </div>
          <div className='flex items-center justify-center lg:justify-end mt-3 lg:w-1/4 w-full'>
            <a
              className='m-1'
              href='https://www.facebook.com/TOTEMUNIVERSE'
              target="_blank"
              rel="noreferrer"
            >
              <div className='hover:opacity-80'>
                <Image src={facebook} alt='facebook-url' />
              </div>
            </a>
            <a
              className='m-1'
              href='https://twitter.com/totem_universe'
              target="_blank"
              rel="noreferrer"
            >
              <div className='hover:opacity-80'>
                <Image src={twitter} alt='twitter-url' />
              </div>
            </a>
            <a
              className='m-1'
              href='https://discord.gg/totem-universe'
              target="_blank"
              rel="noreferrer"
            >
              <div className='hover:opacity-80'>
                <Image src={discord} alt='discord-url' />
              </div>
            </a>
            <a
              className='m-1'
              href='https://www.instagram.com/totem.universe'
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
          {!!isFiltersLoading && <div className='w-full'>
            <Skeleton
              containerClassName='flex flex-col lg:flex-row  w-full items-center justify-center lg:justify-between space-y-8 lg:space-y-0'
              className='loading-bar'
              inline={true}
              count={4}
              height={'170px'}
              width={'150px'}
            />
          </div>}
          {!isFiltersLoading && !filters.length && <p className='w-full text-center text-lg'>No NFT found</p>}
        </div>
        <div className='flex mt-16 lg:flex-row flex-col '>
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
    </div>

    
    <div className='mt-5 ml-5 lg:mt-0 w-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-6xl '>
    <Slider  {...settingsBrands}>
        {filters?.map(function(data, index){
         
          return (
            <Link href={`/product/${data._id}`} key={index}>
              <a>
                <div style={{background:"#161A42" }} className='p-1 mt-0 rounded-lg m-5'>
                  <div style={{ borderRadius : '8px', width: 'fit-content' }} className='bg-white my-2 mx-auto'>
                    {/* <div className='relative top-2 left-2'>
                    <Image height={20} width={60} src={popeyeBlue} />
                    </div> */}
                    <div  className='rounded flex justify-center items-center relative'>
                    {
                      (!loadingItems.find(item => item.index == index) || (loadingItems.find(item => item.index == index) && loadingItems.find(item => item.index == index).progress != 100)) && <div
                      style={{ height: 228, width: widthItem, position: "relative" }}>
                        <Image 
                          src={data.imageUrl} 
                          objectFit="cover" 
                          width={widthItem} 
                          height={228} 
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
                      style={{ height: 228, width: widthItem, position: "relative", display: loadingItems.find(item => item.index == index).progress == 100 ? 'block' : 'none' }}
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
                            zoom={0}
                            isFitZoom={true}
                            padding={{
                              paddingTop: 0.01,
                              paddingLeft: 0.01,
                              paddingBottom: 0.01,
                              paddingRight: 0.01
                            }}
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
                      <p className='text-white'>{data?.scaracity}</p>
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
              </a>
            </Link>
          )
        })}
        </Slider>
    </div>
    

</div>

<Footer></Footer>
>>>>>>> origin
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
        </div>
        <div
          className='mt-5 lg:mt-0 px-2 lg:px-8 flex w-full flex-wrap '
        >
          {filters?.map(function (data, index) {
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
              image3D,
              is_comming_soon,
              comming_soon_image_url
=======
              image3D
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
                  image3D={image3D}
                  index={index}
                />
              </div>

            )
          })}
        </div>
        <Footer></Footer>
      </div>
    </div>
  )
}
