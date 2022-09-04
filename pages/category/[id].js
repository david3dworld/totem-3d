import React, { useEffect, useState, useRef } from 'react'
import Navbar from "../navbar/index"
import Footer from '../footer'
import Router, { useRouter } from 'next/router'
import ProductItem from '../../components/ProductItem'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import emailjs from '@emailjs/browser'
import Link from 'next/link';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
  CircularProgress
} from '@mui/material'
export default function Categories() {

  const formRef = useRef()
  const [isLoading, setLoading] = useState(false)
  const [thematics, setThematics] = useState([])
  const [toggleAccepted, setAccepted] = useState()
  const [isModalOpen, setModalVisiblity] = useState(false)
  const onShowModal = () => {
    setModalVisiblity(true)
  }
  const onHideModal = () => {
    setModalVisiblity(false)
  }
  const onToggleAuthorization = () => setAccepted(isAccepted => !isAccepted)
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await emailjs.sendForm(
      process.env.EMAIL_JS_SERVER,
      process.env.EMAIL_JS_CONTACT_TEMPLATE,
      formRef.current,
      process.env.EMAIL_JS_PUBLIC_KEY
    )
    formRef.current.reset()
    onShowModal()
    setLoading(false)
  }


  const [lastDrop, setLastDrop] = useState([])
  const [loadingProduct, setLoadingProduct] = useState(true)

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setLoadingProduct(true)
    setLastDrop([])
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/thematic`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      setLoadingProduct(false)
      setThematics(data.data.result)
    }).catch(function (error) {
      console.log(error.request);
    })
    const thematicId = router.query.id
    const thematic = thematicId.charAt(0).toUpperCase() + thematicId.slice(1);
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product?thematics=${thematic}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      setLoadingProduct(false)
      setLastDrop(data.data.result)
    }).catch(function (error) {
      console.log(error.request);
    })
  }, [router.isReady, router])

  return (
    <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex w-full flex-col items-center'>
      <div className='max-w-7xl w-full'>
        <Navbar></Navbar>
        <ToastContainer />
        <div className='mt-20 text-white'>
          <p style={{ font: "normal normal Chakra Petch" }} className='text-4xl text-capitalize'>{router.query.id}</p>
        </div>
        <div className='mt-16'>
          <div className='flex flex-col items-center mt-5'>
            {/* desktop loading */}
            {loadingProduct && <div className='w-full hidden lg:block'>
              <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'} width={'150px'} />
            </div>}
            {/* mobile loading */}
            {loadingProduct && <div className='w-full lg:hidden'>
              <Skeleton containerClassName='flex justify-between flex-col items-center' className='loading-bar' inline={true} count={2} height={'170px'} width={'150px'} />
            </div>}
          </div>
          {lastDrop.length == 0 && !loadingProduct && <div className=''>
            <p className='text-sm w-full text-white'>OUPS !<br /> No collection is currently available for this thematic. Sign up to be notified of the next drop related to come.</p>
            <div className='flex justify-center'>
              <form
                ref={formRef}
                onSubmit={onSubmit}
                style={{ background: "#161A42", borderRadius: '16px' }}
                className='flex flex-col items-center lg:m-16 lg:w-96 w-full pt-5 px-7'
              >
                <input name='firstname' placeholder='First Name' className='w-full p-2 mt-2 py-3'></input>
                <input name='lastname' placeholder='Last Name' className='w-full p-2 mt-2 py-3'></input>
                <input name='email' type="email" placeholder='Email' className='w-full p-2 mt-2 py-3'></input>
                <div className='flex items-center justify-start w-full mt-4'>
                  <div className="flex">
                    <div>
                      <input type="checkbox" onClick={onToggleAuthorization}></input>
                    </div>
                    <div className='ml-2'>
                      <p style={{ color: "#696C71", fontFamily: "Poppins" }}>I authorize TOTEM DIGITAL to notify me when a selection of figurines will be available for this thematic</p>
                    </div>
                  </div>
<<<<<<< HEAD
                </div>
                {!isLoading ? (
                  <button
                    disabled={!toggleAccepted}
                    type="submit"
                    style={{ width: "161px", height: "40px", background: "#0EA8D6", color: "#161A42", borderRadius: '10px' }}
                    className=" hover:opacity-80 cursor-pointer mt-8 flex justify-center items-center mb-5"
                  >
                    <p className=' text-lg font-bold'>SEND</p>
                  </button>
                ) : (
                  <div className='mt-8 mb-4'>
                    <CircularProgress color='success' />
                  </div>
                )}
              </form>
            </div>
            <div className='mt-20 text-white'>
              <p style={{ font: "normal normal Chakra Petch" }} className='text-4xl'>Other Thematics</p>
            </div>
            <div className='flex items-center lg:grid lg:grid-cols-6 gap-5 mt-8 flex-col lg:flex-row'>
              {thematics.map(function (data, index) {
                return (
                  <div key={index} style={{ width: "162px", height: "335px", background: "#161A42", color: "#E0E3FF" }} className='flex flex-col'>
                    <div className='m-2'>
                      <img src={data.imageUrl} />
                    </div>
                    <div className='flex justify-center'>
                      <div style={{ background: "#161A42", border: "2px solid #2E357B", width: "34px", height: "34px" }} className='relative flex justify-center items-center rounded-full bottom-7'>
                        <img src={data.iconUrl} />
                      </div>
                    </div>
                    <div className='relative bottom-7'>
                      <div className=''>
                        <p className=' text-2xl text-center'>{data.name}</p>
                      </div>
                      <div style={{ border: '1px solid #2E357B' }} className='mt-3 mb-3'>
                      </div>
                      <div className='cursor-pointer text-center flex justify-center items-center text-md w-full'>
                        <Link href={'/category/' + (data.name).toLowerCase()}><a>DISCOVER THE COLLECTIONS</a></Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>}
          <div className='mt-5 px-2 lg:px-8 flex w-full flex-wrap justify-around'>
            {lastDrop.map(function (data, index) {
              const {
                imageUrl,
                name,
                thematics,
                scaracity,
                series,
                priceUsd,
                priceMatic,
                productNo,
                maxCap,
                mintedCount,
                _id,
                is_comming_soon,
                comming_soon_image_url
              } = data
              return (
                <div className='lg:w-1/5 w-1/2 mb-5 px-2' key={index}>
                  <ProductItem
                    isComingSoon={is_comming_soon}
                    comingSoonImageUrl={comming_soon_image_url}
                    key={index}
                    imageUrl={imageUrl}
                    name={name}
                    thematics={thematics}
                    scarcity={scaracity}
                    series={series}
                    priceUsd={priceUsd}
                    priceMatic={priceMatic}
                    productNo={productNo}
                    maxCap={maxCap}
                    mintedCount={mintedCount}
                    id={_id}
                  />
=======
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                </div>
                {!isLoading ? (
                  <button
                    disabled={!toggleAccepted}
                    type="submit"
                    style={{ width: "161px", height: "40px", background: "#0EA8D6", color: "#161A42", borderRadius: '10px' }}
                    className=" hover:opacity-80 cursor-pointer mt-8 flex justify-center items-center mb-5"
                  >
                    <p className=' text-lg font-bold'>SEND</p>
                  </button>
                ) : (
                  <div className='mt-8 mb-4'>
                    <CircularProgress color='success' />
                  </div>
                )}
              </form>
            </div>
            <div className='mt-20 text-white'>
              <p style={{ font: "normal normal Chakra Petch" }} className='text-4xl'>Other Thematics</p>
            </div>
            <div className='flex items-center lg:grid lg:grid-cols-6 gap-5 mt-8 flex-col lg:flex-row'>
              {thematics.map(function (data, index) {
                return (
                  <div key={index} style={{ width: "162px", height: "335px", background: "#161A42", color: "#E0E3FF" }} className='flex flex-col'>
                    <div className='m-2'>
                      <img src={data.imageUrl}/>
                    </div>
                    <div className='flex justify-center'>
                      <div style={{ background: "#161A42", border: "2px solid #2E357B", width: "34px", height: "34px" }} className='relative flex justify-center items-center rounded-full bottom-7'>
                        <img src={data.iconUrl}/>
                      </div>
                    </div>
                    <div className='relative bottom-7'>
                      <div className=''>
                        <p className=' text-2xl text-center'>{data.name}</p>
                      </div>
                      <div style={{ border: '1px solid #2E357B' }} className='mt-3 mb-3'>
                      </div>
                      <div className='cursor-pointer text-center flex justify-center items-center text-md w-full'>
                        <Link href={'/category/' + (data.name).toLowerCase()}><a>DISCOVER THE COLLECTIONS</a></Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>}
          <div className='flex flex-col items-center lg:grid grid-cols-5 mt-5 gap-x-5 gap-y-12'>
            {lastDrop.map(function (data, index) {
              const {
                imageUrl,
                name,
                thematics,
                scaracity,
                series,
                priceUsd,
                priceMatic,
                productNo,
                maxCap,
                mintedCount,
                _id,
              } = data
              return (
                <ProductItem
                  key={index}
                  imageUrl={imageUrl}
                  name={name}
                  thematics={thematics}
                  scarcity={scaracity}
                  series={series}
                  priceUsd={priceUsd}
                  priceMatic={priceMatic}
                  productNo={productNo}
                  maxCap={maxCap}
                  mintedCount={mintedCount}
                  id={_id}
                />
              )
            })}
          </div>



        </div>

        <div className='mt-20'>

        </div>

        <Footer></Footer>

      </div>
      <Dialog open={isModalOpen}>
        <DialogTitle>
          Contact form
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank you for submitting!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onHideModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
