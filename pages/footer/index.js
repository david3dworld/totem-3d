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
        <div style={{ fontFamily: "Poppins" }} className='mt-10 text-sm lg:mb-0 mb-5 px-4 lg:px-0'>
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
            <div className='flex flex-col lg:flex-row overflow-hidden content-between'>
                <div className='lg:w-8/12 w-full flex items-start flex-col lg:flex-row justify-between'>
                    <div className=''>
                        <p style={{ fontFamily: "Chakra Petch" }} className='text-xl text-white lg:w-96'>Collect… Combine… Enhance …</p>
                    </div>
                    <div className='flex w-full lg:w-1/3 justify-between mr-0 lg:mr-12'>
                        <div className='lg:ml-12 mt-5 lg:mt-2'>
                                <ul className='list-disc'>
                                    <li className='cursor-pointer hover:opacity-80'><Link href='/#lastdrops'>Last Drops</Link></li>
                                    <li className='cursor-pointer hover:opacity-80'><Link href={"/brands"}>Brands</Link></li>
                                    <li className='cursor-pointer'><Link href={"/categories"}>Thematics</Link></li>
                                </ul>
                            </div>
                            <div className='lg:mx-5 mt-5 lg:mt-2'>
                                <ul className=' list-disc'>
                                    <li className='cursor-pointer hover:opacity-80'><Link href={"/FAQ"}>FaQs</Link></li>
                                    <li className='cursor-pointer hover:opacity-80'><Link href={"/contact"}>Contact us</Link></li>
                                    <li className='cursor-pointer hover:opacity-80'><Link href={"/licensors"}>Licensors</Link></li>
                                    <li className='cursor-pointer hover:opacity-80'><Link href={"/help"}>Help</Link></li>
                                </ul>
                            </div>
                    </div>
                </div>

                <div className=' lg:w-4/12 relative bottom-2'>
                    <div className='flex items-center mt-3 lg:justify-end'>
                        <div className='m-1 cursor-pointer hover:opacity-80'>
                            <a target="_blank" href='https://www.facebook.com/TOTEMUNIVERSE'><Image src={facebook}></Image></a>
                        </div>
                        <div className='m-1 cursor-pointer hover:opacity-80'>
                            <a target="_blank" href='https://twitter.com/totem_universe'><Image src={twitter}></Image></a>
                        </div>
                        <div className='m-1 cursor-pointer hover:opacity-80'>
                            <a target="_blank" href='https://discord.gg/totem-universe'><Image src={discord}></Image></a>
                        </div>
                        <div className='m-1 cursor-pointer hover:opacity-80'>
                            <a target="_blank" href='https://www.instagram.com/totem.universe'><Image src={instagram}></Image></a>
                        </div>
                        <div className='m-1 cursor-pointer ml-5 '>
                            <a target="_blank" href='https://polygon.technology/'><Image src={polygon}></Image></a>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex items-center flex-col lg:flex-row overflow-hidden mt-4 justify-between'>
                <div className='lg:w-4/12 w-full flex flex-col lg:flex-row relative'>
                    <p className='mb-5 copyright'>© Copyright TOTEM 2022- All trademarks, logos and brand names are the property of their respective owners. All company, product and service names used in this website are for identification purposes only.</p>
                </div>
                <div className='lg:w-4/12 relative'>
                    <div className='flex flex-col lg:flex-row m-auto text-right justify-between items-center'>
                        <a className='cursor-pointer hover:opacity-80'><Link href={"/general-condition-use"}>Terms of Service</Link></a>
                        <a className='cursor-pointer hover:opacity-80'><Link href={"/general-condition-sale"}>Terms and conditions</Link></a>
                        <a className='cursor-pointer hover:opacity-80'><Link href={"/privacy-policy"}>Privacy Policy</Link></a>
                    </div>

                </div>

            </div>
        </div>
    )
}
