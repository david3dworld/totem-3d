import React, { useEffect, useState } from 'react'
import Navbar from "./navbar/index"
import Image from 'next/image'
import Footer from './footer'
import Link from 'next/link'
import speedometer from "../images/Icon ionic-ios-speedometer.svg"

export default function Payment1() {

    return (
        <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex w-full flex-col items-center'>
            <div className='max-w-7xl w-full'>
                <Navbar></Navbar>

                <div className='mt-24 w-full lg:max-w-lg text-center m-auto'>
                    <div style={{ borderRadius: '16px' }} className='bg-white p-5 flex lg:flex-row flex-col m-auto'>
                        <div className='max-w-md w-full flex flex-col m-auto justify-center'>
                            <div className='text-center'>
                                <Image src={speedometer} />
                                <h1 className='text-2xl text-center lg:max-w-sm m-auto mt-3 mb-6 font-medium' style={{ color: "#161A42 " }}>
                                    Your purchase is on the way,<br /> It will be deliver in couple minutes on your dashboard
                                </h1>
                                <Link href='/dashboard'><a className='text-white mt-3 flex justify-center items-center px-4 hover:opacity-80 m-auto rounded-full text-sm font-light' style={{ background: "#161A42 ", height: "32px", width: "195px", fontFamily: "Poppins" }}>GO TO MY DASHBOARD</a></Link>
                                <Link href='/'><a className='text-white mt-3 flex justify-center items-center px-4 hover:opacity-80 m-auto rounded-full text-sm font-light' style={{ background: "#161A42 ", height: "32px", width: "195px", fontFamily: "Poppins" }}>CONTINUE SHOPPING</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='h-6'></div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    )
}
