/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
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
import CONTRACT_ADDRESS from '../../contracts/address'


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
    const [errorCard, setErrorCard] = useState(null);
    const [errorCvv, setErrorCvv] = useState(false);
    const [errorDate, setErrorDate] = useState(false);
    const [errorMonth, setErrorMonth] = useState(false);
    const [errorYear, setErrorYear] = useState(false);

    const router = useRouter()
    const token = useSelector(function (state) {
        return state.token;
    });
    const userId = useSelector(function (state) {
        return state.id;
    })
    useEffect(() => {
        if (!router.isReady) return;
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`, {
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

        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${router.query.id}`, {
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
            "contactAddress": CONTRACT_ADDRESS,
            "charge": {
                "currency": "usd",
                "totalAmount": product.priceUsd
            },
            "remarks": "good idea!"
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, data, {
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
        let stripeToken = `${process.env.NEXT_PUBLIC_stripeToken}`
        let cardNumber = cardNo;
        let cvc = cvv;
        let exp_month = expMonth;
        let exp_year = expYear;
        await axios.post(`https://api.stripe.com/v1/sources?type=card&card[number]=${cardNumber}&card[cvc]=${cvc}&card[exp_month]=${exp_month}&card[exp_year]=${exp_year}&owner[address][postal_code]=00000&amount=${Math.round(product.priceUsd.toFixed(2) * 100)}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${stripeToken}`
            }
        }).then(function (data) {
            console.log(data.data)
            src = data.data.id
        }).catch(function (error) {
            if (error?.response?.data?.error?.code == "invalid_cvc") {
                toast.error("CVC is not valid");
            } else if (error?.response?.data?.error?.code == "parameter_invalid_integer") {
                toast.error("Invalid integer, amount");
            } else {
                toast.error("Card details is not valid");
            }
            console.log(error);
        })
        // get source with card info / amount
        let checkoutData = {
            "source": src,
            "amount": product.priceUsd,
            "currency": "USD",
            "productId": product._id,
            "address": CONTRACT_ADDRESS
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/checkout/${orderId}`, checkoutData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(function (data) {
            console.log(data)
            setSuccess(true)
            router.push('/payment-success');
        }).catch(function (error) {
            console.log(error);
        })
        setProcessing(false)

    }
    const handleNumChange = e => {
        let cardRegex = new RegExp('^(3[47][0-9]{13}|(6541|6556)[0-9]{12}|389[0-9]{11}|3(?:0[0-5]|[68][0-9])[0-9]{11}|65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})|63[7-9][0-9]{13}|(?:2131|1800|35\d{3})\d{11}|9[0-9]{15}|(6304|6706|6709|6771)[0-9]{12,15}|(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}|(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))|(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}|(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}|(62[0-9]{14,17})|4[0-9]{12}(?:[0-9]{3})?|(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}))$');
        setCardNo(e.target.value.slice(0, 16));
        if (e.target.value.length < 16) {
            setErrorCard('less_than_16')
        } else if (cardRegex.test(e.target.value.slice(0, 16))) {
            setErrorCard(null)
        } else {
            setErrorCard('invalid')
        }
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
    const validateMonth = val => {
        if (val.length < 2) {
            setErrorDate(true);
            setError(true);
        } else {
            setErrorDate(false);
            setError(false);
        }
        if (val.length >= 2 && (val < 1 || val > 12)) {
            setErrorMonth(true);
            setError(true);
        } else {
            setErrorMonth(false);
            setError(false);
        }
    };
    const validateYear = val => {
        if (val.length < 2) {
            setErrorDate(true);
            setError(true);
        } else {
            setErrorDate(false);
            setError(false);
        }
        if (val.length >= 2 && val < 22) {
            setErrorYear(true);
            setError(true);
        } else {
            setErrorYear(false);
            setError(false);
        }
    };

    return (
        <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex flex-col items-center'>
            <div className='max-w-7xl'>
                <ToastContainer />
                <Navbar></Navbar>
                <div className='flex flex-col items-center'>
                    {!success && <div className='mt-24 w-full lg:w-8/12'>
                        <button className='text-primary text-lg mb-4' onClick={router.back}>
                            Go back
                        </button>
                        <div style={{ background: "#161A42", borderRadius: '16px' }} className=' p-4 flex lg:flex-row flex-col'>
                            <div className='max-w-md w-full flex flex-col m-auto justify-center'>
                                <form onSubmit={handleSubmit}>
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
                                    <div>
                                        {errorCard == 'less_than_16' && <p className='text-red-700 mt-2 mb-4'>Card Number should be 16 digits</p>}
                                        {errorCard == 'invalid' && <p className='text-red-700 mt-2 mb-4'>Card is not valid</p>}
                                    </div>
                                    <div className='flex'>
                                        <div>
                                            <p style={{ color: "#0EA8D6" }} className='text-lg'>EXP DATE</p>
                                            <div className='flex'>
                                                <input style={{ border: '1px solid #E0E3FF', fontFamily: "Poppins", background: "#161A42", borderRadius: "10px", width: "45px" }}
                                                    className='text-lg px-2 py-1 my-3' placeholder='03'
                                                    maxLength={2} minLength={2}
                                                    min={1} max={12}
                                                    name='month'
                                                    onChange={function (e) {
                                                        validateMonth(e.target.value)
                                                        setExpMonth(e.target.value);
                                                    }}
                                                    value={expMonth}></input>

                                                <input style={{ border: '1px solid #E0E3FF', fontFamily: "Poppins", background: "#161A42", borderRadius: "10px", width: "45px", color: "#727698" }}
                                                    className='text-lg px-2 py-1 my-3 ml-2' placeholder='22'
                                                    maxLength={2} minLength={2}
                                                    min={22}
                                                    name='year'
                                                    onChange={function (e) {
                                                        validateYear(e.target.value)
                                                        setExpYear(e.target.value);
                                                    }}
                                                    value={expYear}></input>
                                            </div>
                                        </div>
                                        <div className='ml-12'>
                                            <p style={{ color: "#0EA8D6" }} className='text-lg'>CVV</p>

                                            <input style={{ border: '1px solid #E0E3FF', fontFamily: "Poppins", background: "#161A42", borderRadius: "10px", width: "55px" }}
                                                className={'text-lg px-2 py-1 my-3 '} maxLength={4} minLength={3} placeholder='123'
                                                type="password"
                                                name='cvv'
                                                onChange={function (e) {
                                                    setCvv(e.target.value);
                                                }}
                                                value={cvv}></input>
                                        </div>
                                    </div>
                                    {errorCvv && <p className='text-red-700'>CVV should be at least 3 digits</p>}
                                    {errorMonth && <p className='text-red-700'>Month should be between 01 and 12</p>}
                                    {errorYear && <p className='text-red-700'>Year should be greater than 22</p>}
                                    {errorDate && <p className='text-red-700'>EXP Month / Year should be 2 digits</p>}
                                    <div className=' mt-3 flex justify-center items-center  hover:opacity-80' style={{ borderRadius: '10px', background: "#0EA8D6", width: '99px', height: "32px", marginLeft: 'auto' }}>
                                        <button className='relative font-bold text-base' style={{ color: "#161A42" }}
                                            disabled={error}>
                                            {!processing && 'BUY NOW'}
                                            {processing && <div className="ld ld-ring ld-spin text-white"></div>}
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>}
                </div>

                <div className='mt-10'>
                    <div className='h-6'></div>
                </div>
                <Footer></Footer>


            </div>
        </div>
    )
}
