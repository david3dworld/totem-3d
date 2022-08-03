import React, { useEffect, useState } from 'react'
import Navbar from "./navbar/index"
import google from "../images/google2x.png"
import fox from "../images/fox.png"
import Image from 'next/image'
import Footer from './footer'
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector ,useDispatch} from 'react-redux'
import { register,login, signin, authToken, saveId, saveEmailOrWallet} from '../redux/authSlice'
import validator from 'validator'
import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'
import axios from 'axios'
import GoogleLogin from 'react-google-login';
import Link from 'next/link';

export default function login1() {
    const {signup,login,isAuthenticated,isloggedin:moralisLoggedIn, account, authenticate,Moralis} = useMoralis();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const dispatch = useDispatch();
    const [emailError, setEmailError] = useState('')
    const isloggedin = useSelector(function(state){
        return state.isloggedin;
    })
    const list = useSelector(function(state){
        return state.list;
    })
    const router = useRouter();
    const token = useSelector(function(state){
        return state.token;
    });
    const currentUser = Moralis.User.current();
    console.log("isAuthenticated===========", isAuthenticated)
    console.log("moralisLoggedInxxxxx--->",  moralisLoggedIn)
    useEffect(function(){
        // console.log("token,------>", token)
        // console.log("currentUser,------>", currentUser)
        // if (token){
        //     router.push("/");
        // }
        // if (currentUser){
        //     router.push("/");
        // }
        if(account){
            router.push("/");
        }
    },[currentUser,token]);
    const responseGoogle = (response) => {
        console.log(response);
      }
  return (
    <div style={{ backgroundColor : "#0D0F23",color : "#919CC1" ,fontFamily : "Poppins"}} className='text-sm flex flex-col items-center'>
    <div className='w-4/5 '>
        
        <Navbar></Navbar>

    <div className='mt-20 flex justify-center items-center'>
        <div style={{ borderRadius: '26px',width:"525px" }} className='bg-white px-12 py-2 relative'>
            <p className='text-lg' style={{ color : "#161A42",fontFamily : "Chakra Petch" }}>LOG IN / SIGN UP</p>
            <div className='flex flex-col items-center'>
            <div style={{ border:"1px solid #2C3166",borderRadius:"100px",color : "#919CC1" }} className='w-full h-10 mt-4 '>
                <input onChange={function(e){
                    setEmail(e.target.value);
                }} type="email" style={{borderRadius:"100px" }} className='w-full h-full p-2' placeholder='Your email'></input>
            </div>
            <div style={{ border:"1px solid #2C3166",borderRadius:"100px",color : "#919CC1" }} className='w-full h-10 mt-4 '>
                <input onChange={function(e){
                    setPassword(e.target.value);
                }} style={{borderRadius:"100px" }} className='w-full h-full p-2' type="password" placeholder='Password'></input>
            </div>
            <div className='flex items-center'>
            <div onClick={function(){
                if (!email || !password ){
                    toast.error("email or password needs to be filled");
                }
                else if (password.length < 8){
                    toast.error("password needs to be 8 character or more")
                }
                else {
                    if (validator.isEmail(email)) {
                        axios.post("https://shop.totem-universe.io/auth/email/register",{
                            email : email,
                            password : password
                        },{
                            headers: {
                            'Content-Type': 'application/json'
                            }
                        }).then(function(data){
                            console.log(data);
                            toast.success("Registered");
                            router.push("/");
                        }).catch(function(error){
                            toast.error("Error");
                        })
                      } else {
                        toast.error('Enter valid Email!');
                      }
                }
            }} style={{borderRadius: '100px', background:"#161A42" }} className=' mr-4 cursor-pointer hover:opacity-80 text-white mt-4 py-1 px-4'>
                <p>SIGN UP</p>
            </div>
            <ToastContainer />
            <p>{emailError}</p>
            <div onClick={function(){
                axios.post("https://shop.totem-universe.io/auth/email/login",{
                    email : email,
                    password : password
                },{
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }).then(function(data){
                    console.log(data);
                    if (data.data.success){
                        localStorage.setItem("access_token",data.data.data.token.access_token)
                        dispatch(authToken(data.data.data.token.access_token))
                        dispatch(saveEmailOrWallet(email));
                        dispatch(saveId(data.data.data.user._id))
                        dispatch(signin());
                        router.push("/");
                    }
                    else {
                        toast.error("Email or password is wrong!");
                    }
                }).catch(function(error){
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
            }} style={{borderRadius: '100px', background:"#161A42" }} className=' ml-4 cursor-pointer hover:opacity-80 text-white mt-4 py-1 px-4'>
                <p>LOGIN</p>
            </div>
            </div>
            <div className=' text-left w-full mt-3'>
            <Link href="/forget-password" style={{ color : "#161A42" ,opacity:"0.36"}} className=''>Forget password</Link>
            </div>
            <div className=' text-left w-full mt-3'>
            <p style={{ color : "#161A42" ,opacity:"0.36"}} className=''>By using TOTEM you agree to the <span onClick={function(){
                router.push("/general-condition-use");
            }} className=' cursor-pointer underline'>terms of service.</span></p>
            </div>
            <div className='w-full mt-6 opacity-20' style={{border: '1px solid #2E357B' }}>
            </div>

            <div className='mt-6 mb-10 flex items-center justify-center lg:flex-row flex-col'>
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
            <div className='flex flex-col items-center'>
            <div onClick={function(){
                authenticate();
            }} style={{borderRadius: '100px', background:"#161A42" }} className='cursor-pointer hover:opacity-80 text-white mt-4 py-1 px-4'>
                <p>Or connect your wallet</p>
            </div>
            <div className='mt-4 cursor-pointer'>
                <Image width={91} height={91} src={fox}></Image>
            </div>
            </div>
            </div>

            </div>
            <div onClick={function(){
                router.push("/");
            }} className='absolute right-0 top-0 mr-2 mt-1 text-black opacity-20 cursor-pointer hover:opacity-80'>
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
