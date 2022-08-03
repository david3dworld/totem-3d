import { ethers } from 'ethers'
import { keccak256 } from 'ethers/lib/utils'
import { MerkleTree } from 'merkletreejs'

const wallet = () => {
  const formatWalletAddress = (address) => {
    const first4Char = address.substring(0, 5)
    const last4Char = address.substring(address.length - 4)
    return first4Char + '...' + last4Char
  }

  const getProof = (whitelist, address) => {
    const leaf = whitelist.map((addr) => keccak256(addr))
    const merkleTree = new MerkleTree(leaf, keccak256, { sortPairs: true })
    const proof = keccak256(address)
    return merkleTree.getHexProof(proof)
  }

  return {
    formatWalletAddress,
    getProof,
  }
}

export default wallet