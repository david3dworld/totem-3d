import { toast } from 'react-toastify'

// export const network = process.env.ETH_USED_NETWORK || 'rinkeby'
export const network = process.env.NEXT_PUBLIC_network

export const networkIdMapper = {
  mainnet: 1,
  mumbai: 80001,
  rinkeby: 4,
  hardhat: 31337, // default hardhat localhost
  ganache: 1337, // default gananche localhost
}

export const networkId = networkIdMapper[network]

export const showNetworkToast = (netId) => {
  const networkName = Object.keys(networkIdMapper).find(
    (key) => networkIdMapper[key] === netId
  )
  toast.info(`Please change your ETH network to ${networkName}`)
}

export const getNetworkName = (chainId) => {
  const network = {
    // ethereum mainnet
    '0x1': 'mainnet',
    mainnet: 'mainnet',
    eth: 'mainnet',
    // goerli
    '0x5': 'goerli',
    goerli: 'goerli',
    // rinkeby will be deprecated
    '0x4': 'rinkeby',
    rinkeby: 'rinkeby',
    '0x80001': 'mumbai',
    mumbai: 'mumbai',
  }

  return network[chainId]
}

export default network