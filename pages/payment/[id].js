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
const CONTRACT_ADDRESS = "0x3D9F895C786E2bBe7785763566ABe6db3c2F546c"
export default function payment1() {
    const [product, setProduct] = useState({});
    const router = useRouter()
    const { Moralis, account } = useMoralis();
    const [success, setSuccess] = useState(false)
    const [txId, setTxId] = useState("")
    const token = useSelector(function (state) {
        return state.token;
    });
    useEffect(() => {
        if (!router.isReady) return;
        axios.get(`https://shop.totem-universe.io/product/${router.query.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(function (data) {
            setProduct(data.data)
        }).catch(function (error) {
            console.log(error);
        })
    }, [router.isReady])

    const [paymentMehtod, setPaymentMehtod] = useState(false);
    const showPaymentMehtod = () => {
        setPaymentMehtod(!paymentMehtod)
        if (token || account) {
            setPaymentMehtod(!paymentMehtod)
        } else {
            router.push('/login1')
        }
    }

    const approvePayment = async () => {

        const approve_request = {
            chain: "rinkeby",
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
            setPaymentMehtod(false)
            // NotificationManager.success("Collection Success!")
        } catch (err) {
            if (err && err.message && err.message.includes('insufficient funds')) {
                NotificationManager.error('Insufficient wallet balance')
            } else {
                NotificationManager.error('Something went wrong!')
            }
        }
    }

    return (
        <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex w-full flex-col items-center'>
            <div className='max-w-7xl w-full'>

                <Navbar></Navbar>
                {!success ?
                    <div className='flex flex-col items-center'>
                        <div style={{ background: "#161A42", borderRadius: '16px' }} className='mt-24 p-4 flex w-10/12 lg:flex-row flex-col'>
                            <div style={{ borderRadius: '20px' }} className='bg-white max-w-sm h-full '>
                                <div className='pl-3 pt-3'>
                                    {/* <Image width={92} height={27} src={popeyeBlue}></Image> */}
                                </div>
                                <div>
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
                            </div>

                            <div className='text-white lg:ml-8'>
                                <div className='w-40'>
                                    <p className='text-2xl lg:mt-0 mt-5'>{product?.name}</p>
                                </div>
                                <div style={{ fontFamily: "Poppins" }} className='flex items-center mt-5'>
                                    <p className='text-base'>Price</p>
                                    <p className='text-3xl ml-6' style={{ color: "#0EA8D6" }}>${product?.priceUsd}</p>
                                    <div className='text-lg flex items-center mt-2 ml-4'>
                                        <p>{product?.priceMatic}</p>
                                        <div className='ml-2'>
                                            <Image width={18} height={16} src={polygon1}></Image>
                                        </div>
                                    </div>
                                </div>
                                <p className='mt-5'>{product?.productNo}/{product?.maxCap}</p>
                                <p style={{ color: "#E0E3FF", fontFamily: "Poppins" }} className='mt-5'>{product?.series}</p>
                                <div className={paymentMehtod ? 'overlay' : 'hidden'} onClick={() => setPaymentMehtod(false)}></div>
                                <div className={paymentMehtod ? 'select bg-blue-600 w-72 fixed m-auto text-center z-10 py-10 rounded-md' : 'hidden'}>
                                    <div className='mb-5 text-lg font-bold'>Select payment</div>
                                    <Link href={"/card/" + router.query.id}>
                                        <a className=' cursor-pointer hover:opacity-80' style={{ borderRadius: '10px', background: "#0EA8D6", width: '150px', height: "32px", color: "#161A42", marginBottom: '20px', paddingTop: '5px', display: 'inline-block' }}>Pay with Credit Card</a>
                                    </Link><br />
                                    {
                                        account &&
                                        <button onClick={() => { onCollect() }} style={{ borderRadius: '10px', background: "#0EA8D6", width: '150px', height: "32px", color: "#161A42" }}
                                        >Pay with MATIC</button>
                                    }

                                </div>
                                <div className=' cursor-pointer hover:opacity-80 mt-3 flex justify-center items-center' style={{ borderRadius: '10px', background: "#0EA8D6", width: '161px', height: "32px" }}
                                    onClick={showPaymentMehtod}>
                                    <p className='  font-bold text-base' style={{ color: "#161A42" }}>COLLECT NOW</p>
                                </div>
                            </div>

                        </div>
                    </div> :
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h1 className='text-4xl text-center' style={{ marginBottom: 20, marginTop: 100 }}>Mint request was submitted.</h1>
                        <a target="_blank" href={`https://rinkeby.etherscan.io/tx/${txId}`} style={{ fontFamily: "Poppins", textAlign: 'center' }} className='ml-3'>{txId}</a>
                        <Link href='/dashboard'><a className='mt-3 flex justify-center items-center  hover:opacity-80' style={{ borderRadius: '10px', background: "#0EA8D6", height: "32px", color: "#161A42", width: 200 }}>Go to my Dashboard</a></Link>
                        <Link href='/brands'><a className='mt-3 flex justify-center items-center hover:opacity-80' style={{ borderRadius: '10px', background: "#0EA8D6", height: "32px", color: "#161A42", width: 200 }}>Buy more</a></Link>
                    </div>}
                <div className='mt-10'>
                    <div className='h-6'></div>
                </div>
                <Footer></Footer>


            </div>
        </div>
    )
}
