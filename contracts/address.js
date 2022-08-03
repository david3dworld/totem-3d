import { network } from utils/network

const contractAddressMapper = {
    mainnet: '',
    rinkeby: '0x92a7864F5108B8EA73059E1728cd5635CF89c708',
    hardhat: '',
    ganache: '',
  }
  
  const address = contractAddressMapper[network]
  
  export default address