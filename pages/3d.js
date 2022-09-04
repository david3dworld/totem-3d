import React from 'react'
import Navbar from "./navbar/index"
import bg from "../images/Bg.png"
import Image from 'next/image'
import Footer from './footer'
import discord from "../images/discord.png"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import SingleModelView from './components/singleModelView';
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

export default function ThreeD() {
  const { authenticate, isAuthenticated, isInitialized, account, chainId, Moralis, logout } = useMoralis();
  const [profileInfo, setProfileInfo] = useState([])

  const items = [1, 2, 3, 4, 5]

  const token = useSelector(function (state) {
    return state.token;
  })
  useEffect(() => {
    if (!token && !account) {
      toast.error("You should login/signup first");
      router.push('/login1')
    }
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/myProfile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(function (data) {
          if (data.data) {
            setProfileInfo(data.data.data.data)
          }
        })
    }
  }, [])
  return (
    <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex flex-col items-center max-w-7xl'>
      <div className='max-w-7xl w-full'>

        <Navbar></Navbar>
        <ToastContainer />
        <div style={{ background: '#161A42 ', borderRadius: '16px;' }} className='lg:h-16 w-full mt-16 flex items-center lg:flex-row flex-col'>
          <div>
            {profileInfo.profilepicture && <Image className='rounded-full' width={81} height={81} src={profileInfo.profilepicture} alt="" />}
            {!profileInfo.profilepicture && <Image width={81} height={81} src={bg} />}
          </div>
          <div className='m-4'>
            <p className='text-2xl text-white'>MY DASHBOARD</p>
          </div>
          <div style={{ border: "2px solid #2E357B" }} className='lg:h-10 w-4/5 lg:w-0'></div>
        </div>

        <div className='mt-16'>
        </div>

        <Carousel>
          {
            items && items.map((i, index) => {
              return <div key={index} className='flex justify-center items-center'>
                <div style={{ width: 681, height: 625, borderRadius: '26px', position: 'relative' }} className='bg-white'>
                  <SingleModelView zoom={130} radius={'26px'} modelUrl={'/popeye.glb'} />
                </div>
              </div>
            })
          }
        </Carousel>

        <div className='flex justify-center'>
          <div className='flex items-center lg:flex-row flex-col text-white' style={{ maxWidth: "681px" }}>
            <div className='w-32'>
              <p className='text-xl' style={{overflowWrap: 'anywhere'}}>Popeye the Sailor Man</p>
            </div>
            <div style={{ border: "1px solid #E0E3FF" }} className='lg:mx-8 my-4 lg:my-0 h-0 w-4/5 lg:w-0 lg:h-8'>
            </div>
            <div className=''>
              <p style={{ fontFamily: "Poppins" }}>#00768/10k</p>
            </div>
            <div style={{ border: "1px solid #E0E3FF" }} className='lg:mx-8 my-4 lg:my-0 h-0 w-4/5 lg:w-0 lg:h-8'>
            </div>
            <p>Serie 1</p>
            <div style={{ border: "1px solid #E0E3FF" }} className='lg:mx-8 my-4 lg:my-0 h-0 w-4/5 lg:w-0 lg:h-8'>
            </div>
            <p className=' font-bold'>COMMON</p>
            <div style={{ border: "1px solid #E0E3FF" }} className='lg:mx-8 my-4 lg:my-0 h-0 w-4/5 lg:w-0 lg:h-8'>
            </div>
            {/* <div style={{ color : "#0EA8D6" }} className="flex items-center w-40">
            <p className='text-base'>Transfer to</p>
            <div className=' ml-3'>
                <Image src={transfer}></Image>
            </div>
        </div> */}
          </div>
        </div>

        <div className='flex justify-center lg:grid-cols-3 lg:grid mt-10'>
          <div></div>
          <div className=' flex items-center justify-center'>
            <div style={{ background: "#0EA8D6", borderRadius: '10px' }} className=' lg:w-56 py-1 px-2 flex justify-center items-center hover:opacity-80 cursor-pointer'>
              <Link href={'/dashboard'}><a className=' font-bold lg:text-sm text-xs ' style={{ color: "#161A42" }}>BACK TO MY COLLECTION</a></Link>
            </div>
          </div>
          <div style={{ color: "#0EA8D6" }} className='flex items-center lg:ml-0 ml-5  '>
            <Image src={discord}></Image>
            <p className='w-44 ml-2'>Share with your community on our discord</p>
          </div>
        </div>

        <br></br>
        <Footer></Footer>

      </div>
    </div>
  )
}
