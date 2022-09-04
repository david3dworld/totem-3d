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

import starRed from "../images/Image 2.png"
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
        <div className='max-w-6xl'>
            <Navbar></Navbar>

            <div className='mt-20 mx-8 flex flex-col lg:flex-row'>
                <div>
                  <div className='text-white w-full'>
                    <p className='text-3xl'>Contact</p>
                    <div className='mt-3 mb-5 lg:w-[500px]'>
                      <p style={{ fontFamily : "Poppins" }}>A question about the digital collection, a remark to make about our figurines? Want to suggest a brand,? do not hesitate to contact us</p>
                    </div>
                    <div className='flex justify-center'>
                    <div style={{ minHeight: 624, width: "100%", position: "relative" }}>
                    <SingleModelView isHasBackground={false} padding={{
                      paddingBottom: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                      paddingTop: 0
                    }} isHasControl={false} modelUrl={'/Stormtrooper_Red.glb'}
                    isFitZoom/>
                    </div>
                  </div>
                  </div>
                </div>
                <form 
                  ref={formRef}
                  onSubmit={onSubmit}
                  style={{ background : "#161A42",borderRadius: '16px' }}
                  className='flex flex-col items-center lg:w-[450px] my-auto w-full py-2 ml-auto'
                >
                    <p className='text-white text-lg m-5'>CONTACT FORM</p>
                    <select name='civility' className='w-4/5 p-2 py-3 border-r-8 border-transparent'>
                        <option value="">Civility</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                      </select>
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
