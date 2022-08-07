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

import starRed from "../images/starRed.png"
import Navbar from "./navbar/index"
import Footer from './footer'
import SingleModelView from './components/singleModelView'

export default function Contact() {
  const formRef = useRef()
  const [isLoading, setLoading] = useState(false)
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
  return (
    <>
      <div style={{ backgroundColor : "#0D0F23",color : "#919CC1",fontFamily : "Chakra Petch" }} className='text-sm flex flex-col items-center'>
        <div className='max-w-7xl'>
            <Navbar></Navbar>

            <div className='mt-20 flex flex-col lg:flex-row'>
                <div className='text-white w-full'>
                  <p className='text-3xl'>Contact</p>
                  <div className='mt-3'>
                  <p style={{ fontFamily : "Poppins" }}>A question about the digital collection, a remark to make about our figurines? Want to suggest a brand,? do not hesitate to contact us</p>
                  </div>
                  <div className='flex justify-center'>
                    <div style={{ minHeight: 624, width: "100%", position: "relative" }}>
                    <SingleModelView isHasBackground={false}  zoom={120} isHasControl={false} modelUrl={'/Stormtrooper_Red.glb'}/>
                    </div>
                  </div>
                </div>

                <div className='w-full flex justify-end'>
                  <form 
                    ref={formRef}
                    onSubmit={onSubmit}
                    style={{ background : "#161A42",borderRadius: '16px' }}
                    className='flex flex-col items-center lg:m-16 lg:w-96 w-full'
                  >
                      <p className='text-white text-lg m-5'>CONTACT FORM</p>
                      <input name='civility' placeholder='Civility' className='w-4/5 p-2 py-3'></input>
                      <input name='firstname' placeholder='First Name' className='w-4/5 p-2 mt-2 py-3'></input>
                      <input name='lastname' placeholder='Last Name' className='w-4/5 p-2 mt-2 py-3'></input>
                      <input name='email' type="email" placeholder='Email' className='w-4/5 p-2 mt-2 py-3'></input>
                      <input name='phone' type="phone" placeholder='Phone' className='w-4/5 p-2 mt-2 py-3'></input>
                      <textarea name='message' placeholder='Message' className='w-4/5 p-2 mt-2 py-3 h-24'></textarea>
                      <div className='flex items-center justify-start w-4/5 mt-4'>
                      <div className="flex">
                        <div>
                          <input type="checkbox" onClick={onToggleAuthorization}></input>
                        </div>
                        <div className='ml-2'>
                          <p style={{ color : "#696C71" ,fontFamily : "Poppins"}}>I authorize TOTEM DIGITAL to use this information to contact me</p>
                        </div>
                        </div>
                      </div> 
                      {!isLoading ? (
                        <button
                          disabled={!toggleAccepted}
                          type="submit"
                          style={{ width:"161px",height : "40px",background:"#0EA8D6",color : "#161A42",borderRadius: '10px'}}
                          className=" hover:opacity-80 cursor-pointer mt-8 flex justify-center items-center mb-5"
                        >
                          <p className=' text-lg font-bold'>SEND</p>
                        </button> 
                      ) : (
                        <div className='mt-8 mb-4'>
                          <CircularProgress color='success'/>
                        </div>
                      )}
                    </form>
                </div>
            </div>
            <div className='mt-20'>
              <Footer></Footer>
            </div>
          </div>
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
    </>
  )
}
