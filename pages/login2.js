import React from 'react'
import Navbar from "./navbar/index"
import google from "../images/google2x.png"
import fox from "../images/fox.png"
import Image from 'next/image'
import Footer from './footer'
import visa from "../images/visaBlue.png"
import mastercard from "../images/mastercardBlue.png"
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/router'
export default function login2() {
    const router = useRouter();
  return (
    <div style={{ backgroundColor : "#0D0F23",color : "#919CC1",fontFamily : "Chakra Petch" }} className='text-sm flex flex-col items-center'>
    <div className='max-w-7xl'>
        
        <Navbar></Navbar>

    <div className='mt-20 flex justify-center items-center'>
        <div style={{ borderRadius: '26px',width:"525px",color : "#161A42" }} className='relative bg-white px-12 py-4'>
            <p className='text-xl mr-2' style={{ color : "#0EA8D6" }}>BE READY TO COLLECT</p>
            <div className='flex items-center lg:flex-row flex-col relative mt-4'>
                <p style={{ fontFamily : "Poppins" }} className=' text-base'>Enter your payment info</p>
                <div className=' flex items-center lg:absolute right-0 lg:mt-0 mt-2'>
                    <div className='mr-3 flex items-center'>
                    <Image src={visa}></Image>
                    </div>
                    <Image src={mastercard}></Image>
                </div>
            </div>
            <p className='text-base mt-4'>NAME ON CARD</p>
            <input style={{ borderRadius: '10px',border:'1px solid #8287B1',fontFamily : "Poppins" }} className='w-full py-1 px-2 mt-2' placeholder='ATAWATA MAURICE'></input>
            <p className='text-base mt-4'>CARD NUMBER</p>
            <input type="number" style={{ borderRadius: '10px',border:'1px solid #8287B1',fontFamily : "Poppins" }} className='w-full py-1 px-2 mt-2' placeholder='4990 7656 543 3445'></input>
            <div className='flex mt-4'>
                <div className=''>
                    <p className='text-base'>EXP. DATE</p>
                    <div className='flex items-center mt-2'>
                        <input className='px-2 py-1 placeholder-gray-900' placeholder='03' style={{ fontFamily : "Poppins",borderRadius: '10px',border: '1px solid #8287B1',width:"45px",color : "#0D0F23" }}></input>
                        <input className='px-2 py-1 ml-2 placeholder-gray-900' placeholder='22' style={{ fontFamily : "Poppins",borderRadius: '10px',border: '1px solid #8287B1',width:"45px",color : "#0D0F23" }}></input>
                    </div>
                </div>
                <div className='ml-10' >
                <p className='text-base'>CVV</p>
                <input className='mt-2 px-2 py-1 placeholder-gray-900' placeholder='333' style={{ fontFamily : "Poppins",borderRadius: '10px',border: '1px solid #8287B1',width:"45px",color : "#0D0F23" }}></input>
                </div>
            </div>
            <div className='mt-7 opacity-20' style={{ border: '1px solid #2E357B' }}>
            </div>
            <div className='flex items-center justify-center mt-6 mb-1'>
                <div className=' hover:opacity-80 cursor-pointer mr-4 flex justify-center items-center' style={{ color:"#161A42",background:"#0EA8D6",borderRadius: '10px',width:"78px",height:"32px" }}>
                    <p className='font-bold'>SAVE</p>
                </div>
                <div className=' hover:opacity-80 cursor-pointer ml-4 flex justify-center items-center' style={{border: '1px solid #8287B1',borderRadius: '10px',width:"78px",height:"32px" }}>
                    <p className=''>SKIP</p>
                </div>
            </div>
            <div onClick={function(){
                router.push("/");
            }}  className=' absolute right-0 top-0 mr-2 mt-1 text-black opacity-20 cursor-pointer hover:opacity-80'>
                <CloseIcon fontSize='large' />
            </div>
        </div>
    </div>

    <div className='h-40'>

    </div>

    <Footer></Footer>

    </div>
    </div>
  )
}
