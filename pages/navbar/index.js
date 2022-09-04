import React, { useEffect, useState } from 'react'
import axios from 'axios'

import totem from '../../images/totem.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import fox from "../../images/foxR.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from 'react-redux'
import { useMoralis } from 'react-moralis'
import { logout } from '../../redux/authSlice'
import AccountModal from './AccountModal'
import defaultProfilePicture from "../images/../../images/Bg.png"

export default function NavBar() {
<<<<<<< HEAD
  const { isInitialized, isAuthenticated, authenticate, logout: moralisLogout, account, Moralis, user, refetchUserData } = useMoralis();
=======
  const { isAuthenticated, authenticate, logout: moralisLogout, account, Moralis, user } = useMoralis();
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
  const [isAccountSectionVisible, setAccountSectionVisiblity] = useState(false)
  const onToggleAccount = () => setAccountSectionVisiblity(state => !state)
  const router = useRouter();
  const token = useSelector(function (state) {
    return state.token;
  });
  const emailOrWallet = useSelector(function (state) {
    return state.emailOrWallet;
  });
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const handleChange = event => {
    setSearch(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length > 0) {
      router.push(`/search/${search}`)
    }
  };
  function check() {
    if (result != "") {
      return result;
    }
    else {
      return emailOrWallet;
    }
  }
  const [wallet2, setWallet2] = useState("");
  const currentUser = Moralis.User.current();
  const [result, setResult] = useState("");
  const [profileInfo, setProfileInfo] = useState()
  useEffect(() => {
<<<<<<< HEAD
    const closeDropdown = e => {
      setAccountSectionVisiblity(false)
    }
    document.body.addEventListener('click', closeDropdown)
=======
    const closeDropdown = e =>{
      setAccountSectionVisiblity(false)
    }
    document.body.addEventListener('click', closeDropdown)

>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
    const fetchUserData = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/myProfile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (data) {
        setProfileInfo(data.data.data)
      }
    }
    if (token) {
      fetchUserData()
    }
  }, [token])
  useEffect(function () {
    if (currentUser) {
      setWallet2(currentUser.get("ethAddress"));
    }
    if (wallet2) {
      const trimmedWallet = wallet2.substring(0, 4)
      setResult(trimmedWallet);
    }
  }, [currentUser, wallet2]);
  function checkWallet() {
    if (result != "") {
      return result;
    }
  }
  const onLogout = async () => {
    if (user && user.get('accounts')[0]) {
      await moralisLogout();
      router.push('/');
    } else {
      dispatch(logout());
      router.push('/');
    }
    setResult("")
    setProfileInfo()
    onToggleAccount()
  }
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <nav style={{ color: "#919CC1", background: "#0D0F23" }} className='relative'>
        <div style={{ color: "#919CC1" }} className="max-w-7xl mx-auto px-2 lg:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">

              <button onClick={function () {
                document.getElementById("mobile-menu").classList.toggle("hidden");
              }} type="button" className="mt-8 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>

                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
              <div className="flex items-center">
                <div className="block lg:hidden h-8 w-auto cursor-pointer">
                  <a target="_blank" href="https://totem-universe.io/"><Image src={totem}></Image></a>
                </div>
                <div className="hidden lg:block h-8 w-auto cursor-pointer">
                  <a target="_blank" href="https://totem-universe.io/"><Image src={totem}></Image></a>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="flex space-x-4 items-center mt-8">
                  <div style={{ border: "1px solid  #2C3166" }} className=' hover:opacity-80 rounded-full ml-5 cursor-pointer  py-1 px-2'>
                    <Link href='/#lastdrops' className='m-1'>Last Drops</Link>
                  </div>
                  {/* <div style={{ border: "1px solid  #2C3166" }} className=' w-32 rounded-full ml-5 cursor-pointer  py-1 px-2'>
                    <Link href='/dashboard' className='m-1'>Dashboard</Link>
                  </div> */}
                  <div onClick={function () {
                    router.push("/brands");
                  }} style={{ border: "1px solid  #2C3166" }} className=' hover:opacity-80 rounded-full cursor-pointer  py-1 px-2'>
                    <a href='#' className='m-1'>Brands</a>
                  </div>
                  <div onClick={function () {
                    router.push("/categories");
                  }} style={{ border: "1px solid  #2C3166" }} className='rounded-full cursor-pointer  py-1 px-2'>
                    <a className='m-1'>Thematics</a>
                  </div>
                  <div>
                    <div style={{ background: "#161A42" }} className='rounded-full w-72 h-10 flex items-center ml-2 '>
                      <form onSubmit={handleSubmit} className="flex items-center">
                        <input placeholder='Search by brand, collection...'
                          onChange={handleChange}
                          value={search}
                          style={{ background: "#161A42", border: "none" }} className='rounded-full p-3 w-60 h-10'></input>
                        <button>
                          <svg className="h-8 w-8 text-white ml-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="11" cy="11" r="8" />  <line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">

              <div className="lg:ml-3 relative">
                <div className='flex items-center'>
<<<<<<< HEAD
                  {(token || (user && user.get('accounts') && user.get('accounts')[0])) &&
                    <div onClick={() => {
                      onToggleAccount()
                    }} className='cursor-pointer hover:opacity-80 hidden lg:block mr-3 '> <p className=''>
                        {user && user.get('accounts')[0] ? check() : emailOrWallet}
                      </p></div>
                  }
                  {(!token && !user) &&
=======
                  {(token || account) &&
                    <div onClick={() => {
                      onToggleAccount()
                    }} className='cursor-pointer hover:opacity-80 hidden lg:block mr-3 '> <p className=''>
                        {account ? check() : emailOrWallet}
                      </p></div>
                  }
                  {(!token && !account) &&
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                    <div onClick={function () {
                      router.push("/login1");
                    }} className='  hover:opacity-80 cursor-pointer hidden lg:block  mr-3 '>
                      <p>login / sign up</p>
                    </div>
                  }
                  <button type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <div onClick={(e) => {
                      e.stopPropagation()
<<<<<<< HEAD
                      if (!profileInfo && !user) {
=======
                      if (!profileInfo && !account) {
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                        router.push("/login1");
                        return;
                      }
                      onToggleAccount()
                    }}>
                      {account || profileInfo ? (
                        <div className='rounded-full overflow-hidden h-8 w-8'>
                          <Image
                            height={32}
                            width={32}
                            src={profileInfo?.profilepicture || defaultProfilePicture}
                            alt='profile picture'
                          />
                        </div>
                      ) : <AccountCircleIcon fontSize='large' />}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AccountModal isVisible={isAccountSectionVisible} onLogout={onLogout} />

        <div className="hidden lg:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-center">
            <div style={{ border: "1px solid  #2C3166" }} className='rounded-full w-24 flex items-center justify-center'>
              <Link href='/#lastdrops' className='m-1'>Last Drops</Link>
            </div>
            <div style={{ border: "1px solid  #2C3166" }} className='rounded-full w-24 flex items-center justify-center '>
              <a onClick={function () {
                router.push("/brands");
              }} className='m-1'>Brands</a>
            </div>
            <div onClick={function () {
              router.push("/categories");
            }} style={{ border: "1px solid  #2C3166" }} className='rounded-full w-24 flex items-center justify-center '>
              <a className='m-1'>Categories</a>
            </div>

            <div style={{ background: "#161A42" }} className='rounded-full w-72 h-10 flex items-center '>
              <form onSubmit={handleSubmit} className="flex items-center">
                <input placeholder='Search by brand, collection...'
                  onChange={handleChange}
                  value={search}
                  style={{ background: "#161A42", border: "none" }} className='rounded-full p-3 w-60 h-10'></input>
                <button>
                  <svg className="h-8 w-8 text-white ml-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="11" cy="11" r="8" />  <line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                </button>
              </form>
            </div>
            {token
              ?
              <div onClick={function () {
                dispatch(logout());
                router.push('/');
              }} className=' cursor-pointer lg:hidden  lg:mr-3 '> <p className=''>Log Out</p></div>
              :
              <div onClick={function () {
                router.push("/login1");
              }} className=' cursor-pointer lg:hidden  lg:mr-3 '>
                <p className=''>login / sign up</p>
              </div>
            }
          </div>
        </div>
<<<<<<< HEAD
      </nav >
    </div >
=======
      </nav>
    </div>
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
  )
}
