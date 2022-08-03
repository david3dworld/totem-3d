import React from 'react'
import Navbar from "./navbar/index"
import popeyeCollection2x from "../images/popeyeCollection2x.png"
import popeyeBlue from "../images/popeyeBlue2x.png"
import Image from 'next/image'
import polygon1 from "../images/polygon2x.png"
import visa from "../images/visa.png"
import mastercard from "../images/mastercard.png"
import Footer from './footer'

export default function payment2() {
  return (
    <div style={{ backgroundColor : "#0D0F23",color : "#919CC1",fontFamily : "Chakra Petch" }} className='text-sm flex flex-col items-center'>
    <div className='w-4/5'>

    <Navbar></Navbar>
    <div className='flex flex-col items-center'>
    <div style={{ background :"#161A42",borderRadius: '16px' }} className='mt-24 p-4 flex w-10/12 lg:flex-row flex-col'>
        <div style={{borderRadius: '20px' }} className='bg-white w-full h-full '>
            <div className='pl-3 pt-3'>
            <Image width={92} height={27} src={popeyeBlue}></Image>
            </div>
            <div>
                <Image src={popeyeCollection2x}></Image>
            </div>
        </div>

        <div className='text-white lg:ml-8'>
            <div className='w-40'>
            <p className='text-2xl lg:mt-0 mt-5'>Popeye the Sailor Man</p>
            </div>
            <div style={{ fontFamily : "Poppins" }} className='flex items-center mt-5'>
                <p className='text-base'>Price</p>
                <p className='text-3xl ml-6' style={{ color : "#0EA8D6" }}>$49</p>
            </div>
            <p style={{ color : "#E0E3FF" }} className='mt-1'>#00768/10k</p>
            <p className='mt-5'>COMMON</p>
            <p style={{ color:"#E0E3FF" }} className='mt-5'>Serie 1</p>
        </div>
        <div style={{ border:"1px solid #2E357B" }} className='lg:mx-5 my-5 lg:my-0 h-0 lg:h-80'>
        </div>

        <div className='ml-0 mt-1 w-full'>
            <p className='text-lg ' style={{ color :"#0EA8D6" }}>SELECT YOUR CREDIT CARD</p>
            <div className='flex items-center mt-7 '>
                <input placeholder='****3445' className=' py-1 px-2' style={{fontFamily : "Poppins", background:"#161A42",borderRadius: '10px',border: '1px solid #E0E3FF' }} type="password"></input>
                <div className='flex items-center ml-4'>
                    <Image width={41} height={32} src={visa}></Image>
                </div>
            </div>
            <div className='flex items-center justify-center mt-6 cursor-pointer hover:opacity-80' style={{ borderRadius: '10px',background:"#0EA8D6",width:"99px",height:"32px",color : "#161A42"}}>
                <p className='text-base font-bold'>BUY NOW</p>
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
