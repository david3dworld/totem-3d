import React, { useEffect, useState } from 'react'
import Navbar from "./navbar/index"
import Footer from './footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import axios from 'axios'

export default function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const router = useRouter();

    return (
        <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Poppins" }} className='text-sm flex flex-col items-center'>
            <div className='max-w-7xl'>
                <Navbar></Navbar>
                <div className='mt-20 flex justify-center items-center'>
                    <div style={{ borderRadius: '26px', width: "525px" }} className='bg-white px-12 py-2 relative'>
                        <p className='text-lg' style={{ color: "#161A42", fontFamily: "Chakra Petch" }}>Forgot password</p>
                        <div className='flex flex-col items-center'>
                            <div style={{ border: "1px solid #2C3166", borderRadius: "100px", color: "#919CC1" }} className='w-full h-10 mt-4 '>
                                <input onChange={function (e) {
                                    setEmail(e.target.value);
                                }} type="email"
                                    name='email'
                                    style={{ borderRadius: "100px" }} className='w-full h-full p-2' placeholder='Your email'></input>
                            </div>
                            <div className='flex items-center'>
                                <ToastContainer />
                                <div onClick={function () {
                                    setLoading(true)
                                    axios.get(`https://shop.totem-universe.io/auth/email/forgot-password/${email}`, {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }).then(function (data) {
                                        console.log(data);
                                        setLoading(false)
                                        if (data.data.success) {
                                            toast.success("Password reset email sent, Please check your email.");
                                        }
                                        else if (data.data.data.message == 'LOGIN.USER_NOT_FOUND') {
                                            toast.error("User not found");
                                        }
                                        else if (data.data.data.message == 'RESET_PASSWORD.EMAIL_SENT_RECENTLY') {
                                            toast.error("Password reset email has been sent recently");
                                        }
                                    }).catch(function (error) {
                                        setLoading(false)
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
                                }} style={{ borderRadius: '100px', background: "#161A42" }} className='w-28 ml-4 cursor-pointer hover:opacity-80 text-white mt-4 py-2 text-center'>
                                    <button disabled={loading} className="relative">
                                        {loading && <div className="ld ld-ring ld-spin text-white"></div>}
                                        {!loading && 'Send email'}
                                    </button>
                                </div>
                            </div>

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
