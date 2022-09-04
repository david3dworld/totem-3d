import React, { useRef, useState } from 'react'
import Image from 'next/image'
import emailjs from '@emailjs/browser'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
  CircularProgress
} from '@mui/material'

import Navbar from "./navbar/index"
import popeyeAsset from '../images/popeye-form-asset.png'
import Footer from './footer'
import SingleModelView from './components/singleModelView'


export default function Licensors() {
  const formRef = useRef()
  const [isLoading, setLoading] = useState(false)
  const [isModalOpen, setModalVisiblity] = useState(false)
  const onShowModal = () => {
    setModalVisiblity(true)
  }
  const onHideModal = () => {
    setModalVisiblity(false)
  }
  const [toggleAccepted, setAccepted] = useState()
  const onToggleAuthorization = () => setAccepted(isAccepted => !isAccepted)
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await emailjs.sendForm(
      process.env.EMAIL_JS_SERVER,
      process.env.EMAIL_JS_LICENSOR_TEMPLATE,
      formRef.current,
      process.env.EMAIL_JS_PUBLIC_KEY
    )
    formRef.current.reset()
    onShowModal()
    setLoading(false)
  }
  return (
    <>
    <div style={{ backgroundColor : "#0D0F23",color : "#919CC1",fontFamily:"Chakra Petch" }} className='text-sm flex flex-col items-center'>
      <div className='max-w-7xl'>
          <Navbar />
          <div className='mt-20 mx-8 flex flex-col lg:flex-row'>
              <div className='text-white'>
                <p className='text-3xl'>Licensors</p>
                <div className='mt-3 mb-5 lg:w-[500px]'>
                <p style={{ fontFamily : "Poppins" }} className='lg:w-96'>Join the digital collectible revolution! Are you a licensor or brand? Join Popeye, Stormtrooper, and other iconic licenses by taking your brand digital with TOTEM Universe. Register now, and we will get back to you swiftly.</p>
                </div>
                <div className='flex lg:justify-end justify-center'>
                <div style={{ minHeight: 624, width: "100%", position: "relative" }}>
                <SingleModelView isHasBackground={false} padding={{
                      paddingBottom: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                      paddingTop: 0
                    }} isHasControl={false} modelUrl={'/popeye.glb'}
                    isFitZoom/>
                    </div>
                </div>
              </div>
                <form 
                  ref={formRef}
                  onSubmit={onSubmit}
                  style={{ background : "#161A42",borderRadius: '16px' }}
                  className='flex flex-col items-center lg:w-[450px] my-auto w-full py-2 ml-auto'
                >
                    <p className='text-white text-lg m-5'>INFORMATION REQUEST</p>
                    <select name='civility' className='w-4/5 p-2 py-3 border-r-8 border-transparent'>
                      <option value="">Civility</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                    </select>
                    <input name='firstname' placeholder='First Name' className='w-4/5 p-2 mt-2 py-3'></input>
                    <input name='lastname' placeholder='Last Name' className='w-4/5 p-2 mt-2 py-3'></input>
                    <input name='email' type="email" placeholder='Email' className='w-4/5 p-2 mt-2 py-3'></input>
                    <input name='phone' type="phone" placeholder='Phone' className='w-4/5 p-2 mt-2 py-3'></input>
                    <input name='company' placeholder='Company' className='w-4/5 p-2 mt-2 py-3'></input>
                    <input name='representedbrands' placeholder='Represented brands' className='w-4/5 p-2 mt-2 py-3'></input>
                    <div className='flex items-center justify-start w-4/5 mt-4'>
                    <div className="flex items-start">
                      <div>
                      <input type="checkbox" id='auth' onClick={onToggleAuthorization}></input>
                      </div>
                        <label htmlFor='auth'  style={{ color : "#696C71",fontFamily:"Poppins" }} className='ml-2'>I authorize TOTEM DIGITAL to use this information to contact me</label>
                      </div>
                    </div> 
                  {!isLoading ? (
                    <button
                      disabled={!toggleAccepted}
                      type="submit"
                      style={{ width:"161px",height : "40px", background:"#0EA8D6",color : "#161A42", borderRadius: '10px'}}
                      className="hover:opacity-80 cursor-pointer mt-8 flex justify-center items-center mb-5">
                      <p className=' text-lg font-bold'>SEND</p>
                    </button> 
                  ) : (
                    <div className='mt-8 mb-4'>
                      <CircularProgress color='success'/>
                    </div>
                  )}
                </form>
          </div>
          <div className='mt-20'>
            <Footer></Footer>
          </div>
        </div>
      </div>
      <Dialog open={isModalOpen}>
        <DialogTitle>
          Licensors form
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
    </>
  )
}
