import axios from 'axios'
import React, { useState } from 'react'

const ResendEmail = (props) => {
  const { onPressResend } = props
  const [email, setEmail] = useState()
  const onPressRequest = async () => {
    if(!email) return
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/email/resend-verification/${email}`)
    if(data.success) {
      onPressResend()
    }
  }
  const onChangeText = (event) => {
    setEmail(event.target.value)
  }
  return (
    <div className='bg-white py-2 pl-8 pr-24 w-[450px] rounded-xl relative'
      style={{ fontFamily: "Chakra Petch" }}>
      <form className='text-black' onSubmit={onPressRequest}>
        <div className='text-3xl'>
          Let&apos;s try again!
        </div>
        <p className='text-base w-64 mt-4'>
          Enter the email address you registered with
        </p>
        <input
          type='email'
          onChange={onChangeText}
          inputMode='email'
          className='border h-8 w-52 rounded-2xl mt-2 pl-4 border-darkBg' placeholder='Your email'
        />
        <button type='submit' className='bg-darkBg py-2 px-4 mt-4 mb-6 text-white rounded-2xl'>
          SEND REQUEST
        </button>
      </form>
    </div>
  )
}

export default ResendEmail
