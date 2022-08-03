import { useCallback } from 'react'

import {
  useMoralisWeb3Api,
  useMoralis,
  useMoralisWeb3ApiCall,
} from 'react-moralis'

import CONTRACT_ADDRESS from 'contracts/address'
import CONTRACT from 'contracts/totem.json'

const useFetchTotemData = () => {
  const { account, chainId } = useMoralis()
  const { native } = useMoralisWeb3Api()

  const fetchTotemData = useCallback(
    (totemId) => {
      const options = {
        chain: chainId,
        address: CONTRACT_ADDRESS,
        function_name: 'getTotemInfo',
        abi: CONTRACT.abi,
        params: { totemId },
      }
    },
    [chainId]
  )

  return { fetchTotemData }
}

export default useFetchTotemData