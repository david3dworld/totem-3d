import React, { useEffect, useState } from 'react'
import Navbar from "../../../navbar/index"
import Footer from '../../../footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'
import axios from 'axios'
import Link from 'next/link';

export default function ResetPassword() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cPassword, setCPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [cPasswordClass, setCPasswordClass] = useState('form-control');
    const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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
    }, [cPassword])

    const handleCPassword = (e) => {
        setCPassword(e.target.value);
        setIsCPasswordDirty(true);
    }
    return (
        <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Poppins" }} className='text-sm flex flex-col items-center'>
            <div className='max-w-7xl'>
                <Navbar></Navbar>
                <div className='mt-20 flex justify-center items-center'>
                    <div style={{ borderRadius: '26px', width: "525px" }} className='bg-white px-12 py-2 relative'>
                        <p className='text-lg' style={{ color: "#161A42", fontFamily: "Chakra Petch" }}>Reset password</p>
                        <div className='flex flex-col items-center'>
                            <div style={{ border: "1px solid #2C3166", borderRadius: "100px", color: "#919CC1" }} className='w-full h-10 mt-4 '>
                                <input onChange={function (e) {
                                    setEmail(e.target.value);
                                }} type="email" style={{ borderRadius: "100px" }} className='w-full h-full p-2' placeholder='Your email'></input>
                            </div>
                            <div style={{ border: "1px solid #2C3166", borderRadius: "100px", color: "#919CC1" }} className='w-full h-10 mt-4 '>
                                <input onChange={function (e) {
                                    setPassword(e.target.value);
                                }} type="password" style={{ borderRadius: "100px" }} className='w-full h-full p-2' placeholder='Your new password'></input>
                            </div>

                            <div style={{ border: "1px solid #2C3166", borderRadius: "100px", color: "#919CC1" }} className='w-full h-10 mt-4 '>
                                <input onChange={handleCPassword}
                                    type="password" style={{ borderRadius: "100px" }} className='w-full h-full p-2' placeholder='Confirm new password'></input>
                            </div>
                            {showErrorMessage && isCPasswordDirty ? <div className='text-red-500'> Passwords did not match </div> : ''}

                            <div className='flex items-center'>
                                <ToastContainer />
                                <button onClick={function () {
                                    setLoading(true)
                                    axios.post(`https://shop.totem-universe.io/auth/email/reset-password/`, {
                                        "email": email,
                                        "newPassword": password,
                                        "newPasswordToken": router.query.val,
                                        "currentPassword": ""
                                    }, {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }).then(function (data) {
                                        console.log(data);
                                        setLoading(false)

                                        if (data.data.success) {
                                            toast.success("Password changes successfully");
                                            router.push('/')
                                        }
                                        else {
                                            toast.error("Changing password is not successfull, please try again later");
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
                                }} style={{ borderRadius: '100px', background: "#161A42" }}
                                    disabled={isCPasswordDirty}
                                    className='w-36 ml-4 cursor-pointer hover:opacity-80 text-white mt-4 py-1 px-4 relative h-7'>
                                    {loading && <div className="ld ld-ring ld-spin text-white"></div>}
                                    {!loading && 'Reset password'}
                                </button>
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
