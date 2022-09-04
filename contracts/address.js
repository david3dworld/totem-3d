import { network } from "../utils/network"

const contractAddressMapper = {
    mainnet: '0xC212DD12cd6680797662019488d98aBb0BC65D6C',
    rinkeby: '0x92a7864F5108B8EA73059E1728cd5635CF89c708',
    mumbai: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    hardhat: '',
    ganache: '',
  }
  
  const address = contractAddressMapper[network]
  
  export default address