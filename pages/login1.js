import React, { useEffect, useState } from 'react'
import Navbar from "./navbar/index"
import fox from "../images/fox.png"
import Image from 'next/image'
import Footer from './footer'
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { register, login, signin, authToken, saveId, saveEmailOrWallet } from '../redux/authSlice'
import validator from 'validator'
import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'
import axios from 'axios'
import GoogleLogin from 'react-google-login';
import Link from 'next/link';
import RegisterAlmostDone from '../components/RegisterAlmostDone'

export default function Login() {
    const { signup, login, isAuthenticated, isloggedin: moralisLoggedIn, account, authenticate, Moralis } = useMoralis();
    const [email, setEmail] = useState();
    const [isVerifyingEmail, setVerifyingEmail]= useState(false)
    const [password, setPassword] = useState();
    const [cPassword, setCPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [cPasswordClass, setCPasswordClass] = useState('form-control');
    const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
    const [isEmailVerifying, setEmailVerifying] = useState(false)
    const dispatch = useDispatch();
    const [emailError, setEmailError] = useState('')
    const isloggedin = useSelector(function (state) {
        return state.isloggedin;
    })
    const list = useSelector(function (state) {
        return state.list;
    })
    const router = useRouter();
    const token = useSelector(function (state) {
        return state.token;
    });
    const currentUser = Moralis.User.current();
    console.log("isAuthenticated===========", isAuthenticated)
    console.log("moralisLoggedInxxxxx--->", moralisLoggedIn)
    useEffect(function () {
        // console.log("token,------>", token)
        // console.log("currentUser,------>", currentUser)
        // if (token){
        //     router.push("/");
        // }
        // if (currentUser){
        //     router.push("/");
        // }
        if (account) {
            if (router && router.asPath && router.asPath.split('returnUrl=') && router.asPath.split('returnUrl=')[1]) {
                router.push(router.asPath.split('returnUrl=')[1]);
            } else {
                router.push("/");
            }
        }
    }, [currentUser, token]);
    useEffect(() => {
        if (isCPasswordDirty) {
            if (password === cPassword) {
                setShowErrorMessage(false);
                setCPasswordClass('form-control is-valid')
            } else {
                setShowErrorMessage(true)
                setCPasswordClass('form-control is-invalid')
            }
        }
    }, [password, cPassword])
    const responseGoogle = (response) => {
        console.log(response);
    }

    const loginUser = () => {
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/email/login`, {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data) {
            console.log(data);
            if (data.data.success) {
                localStorage.setItem("access_token", data.data.data.token.access_token)
                dispatch(authToken(data.data.data.token.access_token))
                dispatch(saveEmailOrWallet(email));
                dispatch(saveId(data.data.data.user._id))
                dispatch(signin());
                if (router && router.asPath && router.asPath.split('returnUrl=') && router.asPath.split('returnUrl=')[1]) {
                    router.push(router.asPath.split('returnUrl=')[1]);
                } else {
                    router.push("/");
                }
            }
            else {
                toast.error("Email or password is wrong!");
            }
        }).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        })
    }
    const registerUser = async () => {
        if (!email || !password) {
            toast.error("email or password needs to be filled");
        }
        else if (password.length < 8) {
            toast.error("password needs to be 8 character or more")
        }
        else {
            if (validator.isEmail(email)) {
                try {
                    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/email/register`, {
                        email: email,
                        password: password
                    })
                    if (data.success) {
                        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/email/register`, {
                        email: email,
                        password: password
                    })
                        toast.success("Registered");
                        setEmailVerifying(true)
                        setVerifyingEmail(true)
                    } else {
                        console.log('data', data)
                        toast.error("Error1");
                    }
                } catch(e) {
                    console.log('ERROR', e.message)
                    toast.error("Error");
                }
            } else {
                toast.error('Enter valid Email!');
            }
        }
    }
    const handleCPassword = (e) => {
        setCPassword(e.target.value);
        setIsCPasswordDirty(true);
    }
    return (
        <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Poppins" }} className='text-sm flex w-full flex-col items-center'>
            <div className='max-w-7xl w-full' >

                <Navbar></Navbar>

                <div className='mt-20 flex justify-center items-center'>
                <ToastContainer />
                    {!isVerifyingEmail ? (
                        <div style={{ borderRadius: '26px' }} className='bg-white px-12 py-3 relative max-w-xl w-full'>
                        <p className='text-lg font-semibold' style={{ color: "#161A42", fontFamily: "Chakra Petch" }}>LOG IN</p>
                        <div className='flex flex-col lg:flex-row items-center'>
                            <form className='lg:w-1/2 lg:pr-5'>
                                <div style={{ border: "1px solid #2C3166", borderRadius: "100px", color: "#919CC1" }} className='w-full h-10 mt-4 '>
                                    <input onChange={function (e) {
                                        setEmail(e.target.value);
                                    }} name="email" type="email" style={{ borderRadius: "100px" }} className='w-full h-full py-2 px-4' placeholder='Your email'></input>
                                </div>
                                <div style={{ border: "1px solid #2C3166", borderRadius: "100px", color: "#919CC1" }} className='w-full h-10 mt-4 '>
                                    <input onChange={function (e) {
                                        setPassword(e.target.value);
                                    }} style={{ borderRadius: "100px" }} className='w-full h-full py-2 px-4' type="password" placeholder='Password'></input>
                                </div>
                                <div className='flex items-center'>
                                    <div onClick={() => loginUser()} style={{ borderRadius: '100px', background: "#161A42" }} className='cursor-pointer hover:opacity-80 text-white mt-4 py-1 px-4'>
                                        <p>LOGIN</p>
                                    </div>
                                </div>
                                <div className=' text-left w-full mt-3'>
                                    <Link href="/forget-password" style={{ color: "#161A42", opacity: "0.36" }}><a className='underline'>Forget password</a></Link>
                                </div>
                            </form>

                            <div className='lg:w-1/2 lg:border-l' style={{ borderColor: 'rgb(213 215 229)' }}>
                                <div className='flex flex-col items-center'>
                                    {/* for desktop */}
                                    <div onClick={function () {
                                        authenticate();
                                    }} style={{ borderRadius: '100px', background: "#161A42" }} className='hidden lg:block cursor-pointer hover:opacity-80 text-white mt-4 py-1 px-4'>
                                        <p>Or connect your wallet</p>
                                    </div>
                                    {/* for mobile */}
                                    <a href={`https://metamask.app.link/dapp/${process.env.NEXT_PUBLIC_website_url}`}
                                    style={{ borderRadius: '100px', background: "#161A42" }}
                                    className='lg:hidden cursor-pointer hover:opacity-80 text-white mt-4 py-1 px-4'>
                                        <p>Or connect your wallet</p>
                                    </a>
                                    <div className='mt-4 cursor-pointer' onClick={authenticate}>
                                        <Image width={91} height={91} src={fox}></Image>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='w-full mt-4 mb-6 opacity-20' style={{ border: '1px solid #2E357B' }}>
                        </div>
                        <div className='lg:w-full '>

                            <p className='text-lg font-semibold' style={{ color: "#161A42", fontFamily: "Chakra Petch" }}>NO ACCOUNT YET, LET'S SIGN UP</p>
                            <div className='flex flex-col lg:flex-row'>
                                <div className='lg:w-1/2'>
                                    <div style={{ border: "1px solid #2C3166", borderRadius: "100px", color: "#919CC1" }} className='w-full h-10 mt-4 '>
                                        <input onChange={function (e) {
                                            setEmail(e.target.value);
                                        }} name="email" type="email" style={{ borderRadius: "100px" }} className='w-full h-full py-2 px-4' placeholder='Your email' required></input>
                                    </div>
                                    <div style={{ border: "1px solid #2C3166", borderRadius: "100px", color: "#919CC1" }} className='w-full h-10 mt-4 '>
                                        <input onChange={function (e) {
                                            setPassword(e.target.value);
                                        }} style={{ borderRadius: "100px" }} className='w-full h-full py-2 px-4' type="password" placeholder='Choose a password' required></input>
                                    </div>
                                    <div style={{ border: "1px solid #2C3166", borderRadius: "100px", color: "#919CC1" }} className='w-full h-10 mt-4 '>
                                        <input onChange={handleCPassword} style={{ borderRadius: "100px" }} className='w-full h-full py-2 px-4' type="password" placeholder='Retype your password'></input>
                                    </div>
                                    {showErrorMessage && isCPasswordDirty ? <div className='text-red-500'> Passwords did not match </div> : ''}
                                </div>
                                <div className='lg:w-1/2'>
                                    <div className='flex items-center m-auto h-full'>
                                        <div onClick={() => registerUser()} className='cursor-pointer hover:opacity-80 text-white my-5 lg:my-auto m-auto '>
                                            <button disabled={showErrorMessage || !cPassword || !password} className=" rounded-3xl py-1 px-4 bg-dark-blue disabled:bg-blue-800 ">SIGN UP</button>
                                        </div>
                                        <p>{emailError}</p>
                                    </div>
                                </div>

                            </div>

                            <div className=' text-left w-full mt-3'>
                                <p style={{ color: "#161A42", opacity: "0.36" }} className=''>By using TOTEM you agree to the <span onClick={function () {
                                    router.push("/general-condition-use");
                                }} className=' cursor-pointer underline'>terms of service.</span></p>
                            </div>
                            <div className='mt-3 mb-0 flex items-center justify-center lg:flex-row flex-col'>
                                {/* <div className='flex flex-col items-center'>
                <div style={{borderRadius: '100px', background:"#161A42" }} className='cursor-pointer hover:opacity-80 text-white mt-4 py-1 px-4'>
                    <p>Lets do it with</p>
                </div>
                <div className='mt-4 cursor-pointer'>
                    <Image width={91} height={91}  src={google}></Image>
                </div>
            </div>
            <div className='lg:h-20 my-5 lg:my-0 lg:mx-10 opacity-20 h-0 w-full lg:w-0' style={{border: '1px solid #2E357B' }}>
            </div> */}

                            </div>
                        </div>

                        <div onClick={function () {
                            router.push("/");
                        }} className='absolute right-0 top-0 mr-2 mt-1 text-black opacity-20 cursor-pointer hover:opacity-80'>
                            <CloseIcon fontSize='large' />
                        </div>
                    </div>
                    ): <RegisterAlmostDone />}
                </div>

                <div className='h-40'>

                </div>

                <Footer></Footer>

            </div>
        </div>
    )
}
