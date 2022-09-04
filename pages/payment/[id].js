import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/index"
import Image from 'next/image'
import polygon1 from "../../images/polygon2x.png"
import { useSelector } from 'react-redux'
import Footer from '../footer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import TotemAbi from '../../contracts/TotemABI.json'
import USDT_CONFIG from '../../contracts/USDT.json'
import { useMoralis } from 'react-moralis'
import { NotificationManager } from 'react-notifications'
import iconCc from "../../images/icon-cc.svg"
import iconMetamask from "../../images/icon-metamask.svg"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CONTRACT_ADDRESS from '../../contracts/address'
export default function Payment1() {

    const [product, setProduct] = useState({});
    const router = useRouter()
    const { Moralis, account, user, isAuthenticated, isInitialized } = useMoralis();
    const [success, setSuccess] = useState(false)
    const [txId, setTxId] = useState("")
    const [shouldRemembeer, onSetShouldRemember] = useState(false)
    const [selectedPaymentMethod, setPaymentMethod] = useState('pay_with_cc')
    const onToggleShouldRemember = () => onSetShouldRemember(prev => !prev)
    const token = useSelector(function (state) {
        return state.token;
    });
    if (token) {
        router.push(`/card/${router.query.id}`)
    }
    const userEmail = useSelector(state => state.emailOrWallet);
    useEffect(() => {
        if (!router.isReady) return;
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${router.query.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(function (data) {
            setProduct(data.data)
        }).catch(function (error) {
            console.log(error);
        })
<<<<<<< HEAD
        if (user) {
=======
        if (account) {
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
            setPaymentMethod('pay_with_matic')
        }
        if (token) {
            setPaymentMethod('pay_with_cc')
        }
    }, [router.isReady])

    const [paymentMehtod, setPaymentMehtod] = useState(false);
    const showPaymentMehtod = () => {
        setPaymentMehtod(!paymentMehtod)
        if (token || user) {
            setPaymentMehtod(!paymentMehtod)
            setPaymentMethod
        } else {
            router.push('/login1')
        }
    }

    const approvePayment = async () => {

        const approve_request = {
            chain: "mumbai",
            contractAddress: USDT_CONFIG.address,
            functionName: "approve",
            abi: USDT_CONFIG.abi,
            // abi: mint721ABI.abi,
            params: {
                spender: CONTRACT_ADDRESS,
                amount: 99999999999
            },
        }
        console.log('approve_request', approve_request);
        try {
            const result = await Moralis.executeFunction(approve_request)
            // setIsFullLoading(false);
            console.log("")
        } catch (e) {
            console.log('eeeeeeeeeeeee', e)
            // setIsFullLoading(false);
            return false;
        }
    }
    const onCollect = async () => {
        const web3 = await Moralis.enableWeb3();
        console.log(isAuthenticated, isInitialized)
        try {
            const data = product
            const price = data.priceMatic
            const finalParams = {
                id: data.collectionId,
                items: 1
            }

            let options = {
                contractAddress: CONTRACT_ADDRESS,
                functionName: "mint",
                abi: TotemAbi,
                msgValue: Moralis.Units.ETH(price),
                // msgValue: 0.02,
                params: finalParams
            };
            const message = await Moralis.executeFunction(options);
            console.log("message on payment--->", message)
            setTxId(message.hash)
            setSuccess(true)
            router.push('/payment-success');
            setPaymentMehtod(false)
            // NotificationManager.success("Collection Success!")
        } catch (err) {
            if (err && err.message && err.message.includes('insufficient funds')) {
                NotificationManager.error('Insufficient wallet balance')
            } else if (err && err.data && err.data.message && err.data.message.includes('insufficient funds')) {
                NotificationManager.error('Insufficient wallet balance')
            } else {
                NotificationManager.error('Something went wrong!')
                console.log(err)
            }
        }
    }
    const onClickCc = () => {
        setPaymentMethod('pay_with_cc')
    }
    const onClickMatic = () => {
        setPaymentMethod('pay_with_matic')
    }
    const onPressBuyNow = () => {
        if (selectedPaymentMethod === 'pay_with_matic' && userEmail) {
            toast.error('Invalid payment method')
            return
        }
        if (selectedPaymentMethod === 'pay_with_cc' && user) {
            toast.error('Invalid payment method')
            return
        }
        if (!token && !user) {
            router.push(`/login1?returnUrl=/payment/${router.query.id}`)
        } else {
            if (user && selectedPaymentMethod === 'pay_with_matic') {
                onCollect()
            } else {
                router.push(`/card/${router.query.id}`)
            }
        }
    }
<<<<<<< HEAD
=======
    const onClickCc = () => {
        setPaymentMethod('pay_with_cc')
    }
    const onClickMatic = () => {
        setPaymentMethod('pay_with_matic')
    }
    const onPressBuyNow = () => {
        if (selectedPaymentMethod === 'pay_with_matic' && userEmail) {
            toast.error('Invalid payment method')
            return
        }
        if (selectedPaymentMethod === 'pay_with_cc' && account) {
            toast.error('Invalid payment method')
            return
        }
        if (!token && !account) {
            router.push(`/login1?returnUrl=/payment/${router.query.id}`)
        } else {
            if (account && selectedPaymentMethod === 'pay_with_matic') {
                onCollect()
            } else {
                router.push(`/card/${router.query.id}`)
            }
        }
    }
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
    return (
        <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex w-full flex-col items-center'>
            <div className='max-w-7xl w-full'>
                <ToastContainer />
                <Navbar></Navbar>
                {!success && <div className='flex flex-col items-center'>
                    <div style={{ background: "#161A42", borderRadius: '16px' }} className='mt-24 p-4 w-10/12 flex flex-col lg:flex-row items-center'>
                        <div className='flex lg:flex-row flex-col border-b border-border lg:border-r lg:border-b-0 pr-4'>
                            <div style={{ borderRadius: '20px' }} className='bg-white max-w-sm h-full overflow-hidden border-rounded'>
                                <div className='pl-3 pt-3'>
                                    {/* <Image width={92} height={27} src={popeyeBlue}></Image> */}
                                </div>
                                {product?.imageUrl &&
                                    <div className='h-96 w-72 relative'>
                                        <Image
                                            src={product?.imageUrl}
                                            layout='fill'
                                            objectFit='contain'
                                        />
                                    </div>
                                }
                            </div>
                            <div className='text-white lg:ml-8'>
                                <div className='w-40'>
                                    <p className='text-2xl lg:mt-0 mt-5'>{product?.name}</p>
                                </div>
                                <div style={{ fontFamily: "Poppins" }} className='flex items-center mt-5'>
                                    <p className='text-base'>Price</p>
                                    <div className='flex flex-col lg:flex-row'>
                                        <p className='text-3xl ml-6 text-primary'>${product?.priceUsd}</p>
                                        <div className='text-lg flex items-center mt-2 ml-4'>
                                            <p className='text-primary'>{parseFloat(product?.priceMatic).toFixed(2)}</p>
                                            <div className='ml-2'>
                                                <Image width={18} height={16} src={polygon1}></Image>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className='mt-5 text-sm'>#{product.mintedCount}/{product.maxCap}</p>
                                <p className='mt-5 font-bold' style={{ fontFamily: "Chakra Petch" }}>{product.scaracity}</p>
                                <p style={{ color: "#E0E3FF", fontFamily: "Poppins" }} className='mt-5'>{product?.series}</p>
                                <div className={paymentMehtod ? 'overlay' : 'hidden'} onClick={() => setPaymentMehtod(false)}></div>
                                <div className={paymentMehtod ? 'select bg-blue-600 w-72 fixed m-auto text-center z-10 py-10 rounded-md' : 'hidden'}>
                                    <div className='mb-5 text-lg font-bold'>Select payment</div>
                                    <Link href={"/card/" + router.query.id}>
                                        <a className=' cursor-pointer hover:opacity-80' style={{ borderRadius: '10px', background: "#0EA8D6", width: '150px', height: "32px", color: "#161A42", marginBottom: '20px', paddingTop: '5px', display: 'inline-block' }}>Pay with Credit Card</a>
                                    </Link><br />
                                    {
                                        user &&
                                        <button onClick={() => { onCollect() }} style={{ borderRadius: '10px', background: "#0EA8D6", width: '150px', height: "32px", color: "#161A42" }}
                                        >Pay with MATIC</button>
                                    }

                                </div>
                            </div>
                        </div>

                        <div className='lg:pl-12 flex flex-1 flex-col h-full mt-4 lg:mt-0' >
                            <form>
<<<<<<< HEAD
                                {userEmail && !user && (
=======
                                {userEmail && !account && (
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                                    <div className='flex'>
                                        <div className='border-2 rounded-full mt-2 h-4 w-4 border-accent flex items-center justify-center'>
                                            <input type='radio' defaultChecked id='radio-cc' name='method' onClick={onClickCc} className='cursor-pointer appearance-none h-2 w-2 rounded-full h-full w-full bg-transparent checked:bg-accent checked:border-accent' />
                                        </div>
                                        <label htmlFor='radio-cc' className='text-start lg:w-72 cursor-pointer lg:text-lg text-center text-primary ml-4 mr-4 lg:mr-8 '>BUY WITH CREDIT CARD (US$)</label>
                                        <Image src={iconCc} alt='icon-cc' />
                                    </div>
                                )}
<<<<<<< HEAD
                                {user && (
=======
                                {account && (
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                                    <div className='flex mt-12'>
                                        <div className='border-2 rounded-full mt-2 h-4 w-4 border-accent flex items-center justify-center'>
                                            <input type='radio' defaultChecked id='radio-metamask' onClick={onClickMatic} name='method' className='cursor-pointer appearance-none h-2 w-2 rounded-full h-full w-full bg-transparent checked:bg-accent checked:border-accent' />
                                        </div>
                                        <label htmlFor='radio-metamask' className='lg:w-72 text-start cursor-pointer lg:text-lg text-center text-primary ml-4 mr-8'>BUY WITH YOUR WALLET (MATIC)</label>
                                        <Image src={iconMetamask} alt='icon-metamask' />
                                    </div>
                                )}

                                {/* <div className='flex align-center mt-12'>
                                        <div className='border-2 rounded-full h-4 w-4 border-accent flex items-center justify-center mt-1'>
                                            <input
                                                type='radio'
                                                id='radio-remember'
                                                onClick={onToggleShouldRemember}
                                                checked={shouldRemembeer}
                                                className='cursor-pointer appearance-none w-2 rounded-full h-full w-full bg-transparent checked:bg-accent checked:border-accent'
                                            />
                                        </div>
                                        <label htmlFor='radio-remember' className='text-accent text-sm ml-4'>Remember me</label>
                                    </div> */}
                            </form>
                            <button className='cursor-pointer hover:opacity-80 mt-12 ml-8 w-28 flex justify-center items-center bg-primary py-2 rounded-xl'
                                onClick={onPressBuyNow}>
                                <p className='  font-bold text-base' style={{ color: "#161A42" }}>BUY NOW</p>
                            </button>
                        </div>
                    </div>
                </div>}
                {/* <a target="_blank" href={`https://mumbai.polygonscan.com/tx/${txId}`} style={{ fontFamily: "Poppins", textAlign: 'center' }} className='ml-3'>{txId}</a> */}

                <div className='mt-10'>
                    <div className='h-6'></div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    )
}
