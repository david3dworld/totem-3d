import React from 'react'
import Link from 'next/link'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'

const AccountSection = (props) => {
  const { isVisible, onLogout } = props;
  const { account, user } = useMoralis()
  const router  = useRouter()
  if(!isVisible) return null
  const onPressLogout = (e) => {
    e.preventDefault()
    onLogout()
  }
  return (
    <div className='flex flex-1 flex-col text-red absolute right-0 bg-white mx-8 z-20 px-4 py-2 rounded overflow-hidden mt-2'>
      <Link href='/dashboard'>
        <div className='py-2 cursor-pointer'>
          My dashboard
        </div>
      </Link>
      {!user && (
        <Link href='/profile'>
          <div className='py-2 cursor-pointer'>
            My profile
          </div>
        </Link>
      )}
      <button className='py-2 cursor-pointer text-start' onClick={onPressLogout}>Logout</button>
    </div>
  )
}

export default AccountSection
