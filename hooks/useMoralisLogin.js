import { useState, useEffect, useCallback } from 'react'
import { useMoralis } from 'react-moralis'

const useMoralisLogin = () => {
  const { isAuthenticated, provider, isWeb3Enabled } = useMoralis()
  const [isLogin, setIsLogin] = useState(false)

  const fetchLoginState = useCallback(() => {
    setIsLogin(isAuthenticated && provider && isWeb3Enabled)
  }, [isAuthenticated, provider, isWeb3Enabled])

  useEffect(() => {
    fetchLoginState()
  }, [isAuthenticated, provider, isWeb3Enabled])

  return {
    isLogin,
    fetchLoginState,
  }
}

export default useMoralisLogin