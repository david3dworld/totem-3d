import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/index"
import Image from 'next/image'
import visa from "../../images/visa.png"
import mastercard from "../../images/mastercard.png"
import Footer from '../footer'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
export default function payment1() {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [profile, setProfile] = useState({});
    // const [name, setName] = useState('');
    const [cardNo, setCardNo] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [errorCvv, setErrorCvv] = useState(false);
    const [errorDate, setErrorDate] = useState(false);

    const router = useRouter()
    const token = useSelector(function (state) {
        return state.token;
    });
    const userId = useSelector(function (state) {
        return state.id;
    })
    useEffect(() => {
        if (!router.isReady) return;
        axios.get(`https://shop.totem-universe.io/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(function (data) {
                if (data.data) {
                    console.log(data.data.data.data);
                    setProfile(data.data.data.data)
                }
            })

        axios.get(`https://shop.totem-universe.io/product/${router.query.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(function (data) {
            console.log(data.data)
            setProduct(data.data)
        }).catch(function (error) {
            console.log(error);
        })
    }, [router.isReady])


    const handleSubmit = async (ev) => {
        setProcessing(true)
        let src = '';
        let orderId = '';
        ev.preventDefault();
        // create order
        let data = {
            "orderNo": "",
            "date": (new Date()).toISOString(),
            "consignee": {
                "name": profile.name,
                "phone": profile.phone
            },
            "contactAddress": "0x0f22F0f1C70b0277dEE7F0FF1ac480CB594Ca450",
            "charge": {
                "currency": "usd",
                "totalAmount": product.priceUsd
            },
            "remarks": "good idea!"
        }
        await axios.post(`https://shop.totem-universe.io/orders`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(function (data) {
            console.log(data.data)
            orderId = data.data._id
        }).catch(function (error) {
            console.log(error);
        })
        // get source with card info / amount
        let stripeToken = "pk_test_51KqCp8GWKu2zOnGkquaQ4gzCIGrDMrruO4VezSS3rNqU6UFbUdbCxgeqaJkvjnTmgBK3T6f3v3FUMMBXlsngKhc800RpgEWUUV"
        let cardNumber = cardNo;
        let cvc = cvv;
        let exp_month = expMonth;
        let exp_year = expYear;
        await axios.post(`https://api.stripe.com/v1/sources?type=card&card[number]=${cardNumber}&card[cvc]=${cvc}&card[exp_month]=${exp_month}&card[exp_year]=${exp_year}&owner[address][postal_code]=00000&amount=${product.priceUsd}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${stripeToken}`
            }
        }).then(function (data) {
            console.log(data.data)
            src = data.data.id
        }).catch(function (error) {
            toast.error("Card details is not valid");
            console.log(error);
        })
        // get source with card info / amount
        let checkoutData = {
            "source": src,
            "amount": product.priceUsd,
            "currency": "USD",
            "productId": product._id,
            "address": "0x0f22F0f1C70b0277dEE7F0FF1ac480CB594Ca450"
        }
        await axios.post(`https://shop.totem-universe.io/payments/checkout/${orderId}`, checkoutData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(function (data) {
            console.log(data)
            setSuccess(true)
        }).catch(function (error) {
            console.log(error);
        })
        setProcessing(false)

    }
    const handleNumChange = e => {
        setCardNo(e.target.value.slice(0, 16));
    };
    const validateCvv = val => {
        if (val.length < 3) {
            setErrorCvv(true);
            setError(true);
        } else {
            setErrorCvv(false);
            setError(false);
        }
    };
    const validateDate = val => {
        if (val.length < 2) {
            setErrorDate(true);
            setError(true);
        } else {
            setErrorDate(false);
            setError(false);
        }
    };
    return (
        <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex flex-col items-center'>
            <div className='w-4/5'>
                <ToastContainer />
                <Navbar></Navbar>
                <div className='flex flex-col items-center'>
                    <div style={{ background: "#161A42", borderRadius: '16px' }} className='mt-24 p-4 flex w-10/12 lg:flex-row flex-col'>
                        <div className='max-w-md w-full flex flex-col m-auto justify-center'>
                            {!success && <form onSubmit={handleSubmit}>
                                <div style={{ color: "#0EA8D6" }} className=' flex justify-center'>
                                    <p className='text-lg'>PAYMENT BY CREDIT CARD</p>
                                    <div className='ml-1'>
                                        <Image width={41} height={32} src={visa}></Image>
                                    </div>
                                    <div className='ml-1'>
                                        <Image width={41} height={32} src={mastercard}></Image>
                                    </div>
                                </div>

                                {/* <p style={{ color: "#0EA8D6" }} className='text-lg mt-3'>NAME ON CARD</p>
                                <input style={{ border: '1px solid #E0E3FF', fontFamily: "Poppins", background: "#161A42", borderRadius: "10px", color: "#727698" }}
                                    className='text-lg px-2 py-1 my-2' placeholder='ATAWATA MAURICE'
                                    onChange={function (e) {
                                        setName(e.target.value);
                                    }}
                                    value={name}
                                ></input> */}
                                <p style={{ color: "#0EA8D6" }} className='text-lg'>CARD NUMBER</p>
                                <input
                                 type="number"
                                    maxLength={16}
                                    minLength={16}
                                    style={{ border: '1px solid #E0E3FF', fontFamily: "Poppins", background: "#161A42", borderRadius: "10px", color: "#727698" }}
                                    className='text-lg px-2 py-1 my-2 ' placeholder='4990 7656 543 3445'
                                    onChange={handleNumChange}
                                    value={cardNo}></input>
                                <div className='flex'>
                                    <div>
                                        <p style={{ color: "#0EA8D6" }} className='text-lg'>EXP DATE</p>
                                        <div className='flex'>
                                            <input style={{ border: '1px solid #E0E3FF', fontFamily: "Poppins", background: "#161A42", borderRadius: "10px", width: "45px" }}
                                                className='text-lg px-2 py-1 my-3' placeholder='03'
                                                maxLength={2} minLength={2}
                                                onChange={function (e) {
                                                    validateDate(e.target.value)
                                                    setExpMonth(e.target.value);
                                                }}
                                                value={expMonth}></input>

                                            <input style={{ border: '1px solid #E0E3FF', fontFamily: "Poppins", background: "#161A42", borderRadius: "10px", width: "45px", color: "#727698" }}
                                                className='text-lg px-2 py-1 my-3 ml-2' placeholder='22'
                                                maxLength={2} minLength={2}
                                                onChange={function (e) {
                                                    validateDate(e.target.value)
                                                    setExpYear(e.target.value);
                                                }}
                                                value={expYear}></input>
                                        </div>
                                    </div>
                                    <div className='ml-12'>
                                        <p style={{ color: "#0EA8D6" }} className='text-lg'>CVV</p>

                                        <input style={{ border: '1px solid #E0E3FF', fontFamily: "Poppins", background: "#161A42", borderRadius: "10px", width: "55px" }}
                                            className={'text-lg px-2 py-1 my-3 '} maxLength={4} minLength={3} placeholder='123'
                                            onChange={function (e) {
                                                validateCvv(e.target.value)
                                                setCvv(e.target.value);
                                            }}
                                            value={cvv}></input>
                                    </div>
                                </div>
                                {errorCvv && <p className='text-red-700'>CVV should be at least 3 digits</p>}
                                {errorDate && <p className='text-red-700'>EXP Month / Year should be 2 digits</p>}
                                <div className=' mt-3 flex justify-center items-center  hover:opacity-80' style={{ borderRadius: '10px', background: "#0EA8D6", width: '99px', height: "32px", marginLeft: 'auto' }}>
                                    <button className='relative font-bold text-base' style={{ color: "#161A42" }}
                                        disabled={error}>
                                        {!processing && 'BUY NOW'}
                                        {processing && <div className="ld ld-ring ld-spin text-white"></div>}
                                    </button>
                                </div>
                            </form>}
                            {success && <div className='text-center'>
                                <h1 className='text-4xl text-center'>Payment was successful</h1>
                                <Link href='/dashboard'><a className='mt-3 flex justify-center items-center px-4 hover:opacity-80' style={{ borderRadius: '10px', background: "#0EA8D6", height: "32px", marginLeft: 'auto', color: "#161A42" }}>Go to my Dashboard</a></Link>
                                <Link href='/brands'><a className='mt-3 flex justify-center items-center px-4 hover:opacity-80' style={{ borderRadius: '10px', background: "#0EA8D6", height: "32px", marginLeft: 'auto', color: "#161A42" }}>Buy more</a></Link>
                            </div>}
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
