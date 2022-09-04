import React, { useState} from 'react'

import blutoImage from '../images/bluto_00286.png'
import Image from 'next/image'
import ResendEmail from './ResendEmail'

const RegisterAlmostDone = () => {
  const [isResending, setResending] = useState(false)
  const onPressResend = () => {
    setResending(false)
  }
  const onShowResend = () => {
    setResending(true)
  }
  if(isResending) {
    return <ResendEmail onPressResend={onPressResend} />
  }
  return (
    <div className='bg-white py-8 pl-8 pr-24 w-[450px] rounded-xl relative'
      style={{ fontFamily: "Chakra Petch" }}>
      <div className='text-black'>
        <div className='text-3xl'>
          Almost done,
        </div>
        <p className='text-base'>
          You have received a confirmation email, please click
          on the link to activate your account.
        </p>
      </div>
      <div className='mt-14 mb-10'>
        <button className='underline' onClick={onShowResend}>
          I did not get the mail
        </button>
      </div>
      <div className='absolute bottom-[-140px] right-[-95px]'>
        <Image height={300} width={300} src={blutoImage} />
      </div>
    </div>
  )
}

export default RegisterAlmostDone
