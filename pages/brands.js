/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import Navbar from './navbar/index'
import Image from 'next/image'
import Footer from './footer'
import { useRouter } from 'next/router'
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Link from 'next/link'

export default function brands() {
    const router = useRouter();
   
    const [brands, setBrands] = useState([])
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brand`)
            .then(function (data) {
                if (data.data) {
                    console.log(data.data);
                    setBrands(data.data)
                }
            })
    }, [])
  
   
    return (
        <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex flex-col items-center'>
            <div className='max-w-7xl'>
                <Navbar></Navbar>

                <div className='mt-20 text-white px-6 lg:px-0'>
                    <p className='text-5xl font-semibold'>Brands</p>
                    <p style={{ fontFamily: "Poppins" }} className='mt-5 mb-10'>The future of pop culture is here. Now all of your favorite brands are available as digital assets for collection. The most iconic and popular brands have partnered with TOTEM to create unique, authentic, and officially licensed figurines for digital collection in the NFT market.</p>
                </div>

                <div className='flex items-center'>
                    {/* desktop loading */}
                    {brands.length == 0 && <div className='w-full hidden lg:block'>
                        <Skeleton containerClassName='flex space-y-8 lg:space-y-0 justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={4} height={'230px'} width={'150px'} />
                    </div>}
                    {/* mobile loading */}
                    {brands.length == 0 && <div className='w-full lg:hidden'>
                        <Skeleton containerClassName='flex justify-between flex-col items-center' className='loading-bar' inline={true} count={2} height={'230px'} width={'150px'} />
                    </div>}
                </div>
                <div className='w-full mt-8 flex flex-col md:grid lg:grid md:grid-cols-3 lg:grid-cols-4 gap-10 items-center '>
                    {brands?.map(function (data, index) {
                        return (
                            <Link href={`/collection/${data._id}`} key={index}>
                                <div className='w-72 lg:w-80 px-4 cursor-pointer' >
                                    <div key={index} style={{ background: "#161A42", color: "#E0E3FF", height: "388px" }} className=' flex flex-col rounded-lg'>
                                        <div className='w-full h-full p-2-5'>
                                            <div style={{ borderRadius: '8px', overflow: 'hidden' }} className='h-64 relative'>
                                            {data?.brand_cover_image && <Image src={data?.brand_cover_image} objectFit="fill"
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
                                        <div className=' hover:opacity-80 text-center flex justify-center items-center w-full mb-5'>
                                            <p className='m-2 cursor-pointer text-white text-sm '>DISCOVER THE COLLECTIONS</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
           
                <div className='mt-20 px-6 lg:px-0'>
                    <Footer></Footer>
                </div>

            </div>
        </div>
    )
}
