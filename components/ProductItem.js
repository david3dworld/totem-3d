import React, { useRef, useState } from 'react'
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

import music from "../images/Icon awesome-music.svg"
import movies from "../images/Icon material-local-movies.svg"
import games from "../images/Icon metro-gamepad.svg"
import sport from "../images/Icon awesome-football-ball.svg"
import comics from "../images/Icon awesome-book-open.svg"
import art from "../images/Icon map-art-gallery.svg"
import polygon from "../images/polygon-matic-logo.svg"
import SingleModelView from '../pages/components/singleModelView/index'

const categoryIcon = {
  music,
  movies,
  games,
  sport,
  comics,
  art
}

const ProductItem = (props) => {
  const {
    imageUrl,
    name,
    thematics,
    scarcity,
    series,
    priceUsd,
    priceMatic,
    productNo,
    maxCap,
    mintedCount,
    id,
    index,
<<<<<<< HEAD
    image3D,
    isComingSoon,
    comingSoonImageUrl
=======
    image3D
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
  } = props
  const router = useRouter()
  const isMaxedOut = mintedCount >= maxCap
  const [loadingItems,setLoadingItems] = useState([]);
  const [figureRotate,setFigureRotate] = useState({
    index: null,
    rotate: 0
  });
  const loadingItemsRef = useRef(null);
  const widthItem = 180;

  const checkForRemainedAmount = (data, e) => {
    toast.error("Max number has been reached already");
  }
  const onPress = (e) => {
    e.preventDefault()
    router.push(`/product/${id}`)
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

  const onRemoveLoadingItem = (index) => {
    clearTimeout(loadingItemsRef.current);
    const item = loadingItems.find(item => item.index == index);
    if(item && item.progress != 100) {
      const data = [...loadingItems].filter(item => item.index != index)
      setLoadingItems(data);
    }
  }

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

  return (
    <button onClick={onPress} className='flex items-center justify-center w-[200px] product-parent'>
      <div className='p-1 bg-jeep'>
<<<<<<< HEAD
        <div className='bg-white m-2 rounded-lg flex flex-col justify-center'>
          <div className='flex justify-center items-center'>
            <div className='w-full lg:h-48 relative'>
              {
                (!loadingItems.find(item => item.index == index) || (loadingItems.find(item => item.index == index) && loadingItems.find(item => item.index == index).progress != 100)) && 
                <div
                  className='rounded-lg overflow-hidden h-[192px] width-full relative'>
                  <Image
                    src={isComingSoon && comingSoonImageUrl ? comingSoonImageUrl : imageUrl}
=======
        <div className='bg-white m-2 rounded-lg'>
          <div className='flex justify-center items-center'>
            <div className='w-full lg:h-48 relative'>
              {
                (!loadingItems.find(item => item.index == index) || (loadingItems.find(item => item.index == index) && loadingItems.find(item => item.index == index).progress != 100)) && <div
                  style={{ height: 192, width: widthItem, position: "relative" }}>
                  <Image
                    src={imageUrl}
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                    alt={`${name}-asset`}
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    onMouseEnter={(e) => onLoadItem(index, 0)}
                    onMouseOut={() => onRemoveLoadingItem(index)}
                  />
                  {loadingItems.find(item => item.index == index) && <div style={{
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
                  style={{ height: 192, width: widthItem, position: "relative", display: loadingItems.find(item => item.index == index).progress == 100 ? 'block' : 'none' }}
                  onMouseEnter={(e) => onMouseEnter(e, index)}
                  onMouseMove={(e) => onMouseMove(e, index)}
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
                    modelUrl={image3D ? image3D : null}
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

              {categoryIcon[thematics.toLowerCase()] && (
                <div className='category'>
                  <Image alt='category' src={categoryIcon[thematics.toLowerCase()]} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='p-3'>
          <p className='text-lg text-white text-left line-clamp-2 h-14 text-muted'>{name}</p>
          <div className='relative flex items-center mt-3'>
            <p className=' text-white font-bold text-xs lg:text-base'>{scarcity}</p>
            <p className='absolute right-0 text-xs lg:text-base text-white'>{series}</p>
          </div>
          <div className="w-full mt-2 border border-border" />
          <div style={{ fontFamily: "Poppins" }} className='flex items-center relative mt-4'>
            <div>
              <p className='text-primary text-left text-2xl'>{priceUsd}$</p>
              <div className='flex'>
                <p className='text-primary ml-1 mr-1 text-xs'>{parseFloat(priceMatic).toFixed(2)}</p>
                <Image src={polygon} objectFit='contain' alt='polygon-icon' />
              </div>
            </div>
            <p style={{ color: "#E0E3FF" }} className='absolute right-0 text-[10px]'>
              {mintedCount} / {maxCap}
            </p>
          </div>
          <div className="w-full mt-2 border border-border" />
          <div className='flex items-center justify-center mt-2 hover:opacity-80 cursor-pointer font-bold'>
            {!isMaxedOut&& <p style={{ fontFamily: "Chakra Petch" }} className='text-white'>COLLECT</p>}
            {isMaxedOut && <p style={{ fontFamily: "Chakra Petch" }} className='text-red-600'>SOLD OUT</p>}
          </div>
        </div>
      </div>
    </button>
  )
}

export default ProductItem