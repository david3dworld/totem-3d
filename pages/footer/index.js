import React from 'react'
import facebook from "../../images/facebook.png"
import discord from "../../images/discord.png"
import twitter from "../../images/twitter.png"
import instagram from "../../images/instagram.png"
import polygon from "../../images/polygon.png"
import Image from 'next/image'
import totem from '../../images/totem.png'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Footer() {
    const router = useRouter();
    return (
        <div style={{ fontFamily: "Poppins" }} className='mt-10 text-sm lg:mb-0 mb-5'>
            <div className=' flex items-center'>
                <div className='w-full lg:w-12 w-16' style={{ border: "1px solid #2E357B" }}>
                </div>
                <div className='w-full w-full ml-14' style={{ border: "1px solid #2E357B" }}>
                </div>
            </div>
            <div className='cursor-pointer relative bottom-2'>
                <Image onClick={function () {
                    router.push("/");
                }} src={totem}></Image>
            </div>
            <div className='flex items-start flex-col lg:flex-row overflow-hidden'>
                <div className='lg:w-8/12 w-full flex items-start flex-col lg:flex-row relative '>
                    <div className=''>
                        <p style={{ fontFamily: "Chakra Petch" }} className='text-xl text-white lg:w-96'>Collect…. Combine…enhance …</p>
                    </div>
                    <div className=' lg:w-1/2 lg:mx-5 mt-5 lg:mt-2'>
                        <ul className=' list-disc'>
                            <Link href='/#lastdrops'><li className='cursor-pointer hover:opacity-80'>Last Drops</li></Link>
                            <li onClick={function () {
                                router.push("/brands");
                            }} className='cursor-pointer hover:opacity-80'>Brands</li>
                            <li onClick={function () {
                                router.push("/categories");
                            }} className='cursor-pointer'>Categories</li>
                        </ul>
                    </div>
                    <div className=' lg:w-1/2 lg:mx-5 mt-5 lg:mt-2'>
                        <ul className=' list-disc'>
                            <li onClick={function () {
                                router.push("/FAQ");
                            }} className='cursor-pointer hover:opacity-80'>FaQs</li>
                            <li onClick={function () {
                                router.push("/contact");
                            }} className='cursor-pointer hover:opacity-80'>Contact us</li>
                            <li onClick={function () {
                                router.push("/licensors");
                            }} className='cursor-pointer hover:opacity-80'>Licensors</li>
                            <li className='cursor-pointer hover:opacity-80'>Help</li>
                        </ul>
                    </div>
                </div>

                <div className=' lg:w-4/12 relative bottom-2'>
                    <div className='flex items-center mt-3 lg:justify-end'>
                        <div onClick={function () {
                            router.push("https://www.facebook.com/")
                        }} className='m-1 cursor-pointer hover:opacity-80'>
                            <Image src={facebook}></Image>
                        </div>
                        <div onClick={function () {
                            router.push("https://twitter.com/")
                        }} className='m-1 cursor-pointer hover:opacity-80'>
                            <Image src={twitter}></Image>
                        </div>
                        <div onClick={function () {
                            router.push("https://discord.com/")
                        }} className='m-1 cursor-pointer hover:opacity-80'>
                            <Image src={discord}></Image>
                        </div>
                        <div onClick={function () {
                            router.push("https://www.instagram.com/")
                        }} className='m-1 cursor-pointer hover:opacity-80'>
                            <Image src={instagram}></Image>
                        </div>
                        <div onClick={function () {
                            router.push("https://polygon.technology/")
                        }} className='m-1 cursor-pointer ml-5 '>
                            <Image src={polygon}></Image>
                        </div>
                    </div>


                </div>

            </div>
            <div className='flex items-center flex-col lg:flex-row overflow-hidden '>
                <div className='lg:w-6/12 w-full flex flex-col lg:flex-row relative '>
                    <p className='mb-5 copyright max-w-md'>© Copyright TOTEM 2022- All trademarks, logos and brand names are the property of their respective owners. All company, product and service names used in this website are for identification purposes only.</p>
                </div>
                <div className='lg:w-6/12 relative'>
                    <div style={{ backgroundColor: "#0D0F23" }} className='flex flex-col lg:flex-row lg:justify-end m-auto text-right'>
                        <p onClick={function () {
                            router.push("/general-condition-use");
                        }} className='mx-auto lg:mr-9 lg:ml-0 cursor-pointer hover:opacity-80'>Terms of Service</p>
                        <p onClick={function () {
                            router.push("/general-condition-sale");
                        }} className='mx-auto lg:mr-9 lg:ml-0 cursor-pointer hover:opacity-80'>Terms and conditions</p>
                        <p onClick={function () {
                            router.push("/privacy-policy");
                        }} className='mx-auto lg:mr-0 lg:ml-0 cursor-pointer hover:opacity-80'>Privacy Policy</p>
                    </div>

                </div>

            </div>
        </div>
    )
}
