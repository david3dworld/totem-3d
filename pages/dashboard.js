import React, { useState, useEffect } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import Navbar from "./navbar/index"
import bg from "../images/Bg.png"
import Image from 'next/image'
import { Icon } from '@iconify/react';
import { NotificationManager } from 'react-notifications'
import TotemAbi from '../contracts/TotemABI.json'
import Footer from './footer'
import discordIcon from '../images/discord-icon.svg'
import { useRouter } from 'next/router'
import polygon1 from "../images/polygon-matic-logo.png"
import styled from 'styled-components'
import { getPurchasedProducts, getProducts, getProductsByCollectionIds } from '../api/product'
import { getBrands } from '../api/brand'
import { getProfile } from '../api/user'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SingleModelView from './components/singleModelView/index'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Link from 'next/link';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
import CONTRACT_ADDRESS from '../contracts/address'
import music from "../images/Icon awesome-music.svg"
import movies from "../images/Icon material-local-movies.svg"
import games from "../images/Icon metro-gamepad.svg"
import sport from "../images/Icon awesome-football-ball.svg"
import comics from "../images/Icon awesome-book-open.svg"
import art from "../images/Icon map-art-gallery.svg"
<<<<<<< HEAD
=======

>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
const categoryIcon = {
  music,
  movies,
  games,
  sport,
  comics,
  art
}
<<<<<<< HEAD
=======
=======
>>>>>>> origin
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    backgroundColor: '#161a42',
    transform: 'translate(-50%, -50%)',
  },
};
<<<<<<< HEAD

export default function Dashboard() {

  const { authenticate, isAuthenticated, isInitialized, account, chainId, Moralis, user, logout } = useMoralis();
=======
<<<<<<< HEAD

=======
const CONTRACT_ADDRESS = "0x5629b4d18c0B93377F5f28e544929a42ec004724"
>>>>>>> origin
export default function dashboard() {

  const { authenticate, isAuthenticated, isInitialized, account, chainId, Moralis, logout } = useMoralis();
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
  const Web3Api = useMoralisWeb3Api();
  const [nfts, setNfts] = useState([])
  const [toAddress, setToAddress] = useState("")
  const [handling, setHandling] = useState(false)
  const [filteredNfts, setFilteredNfts] = useState([])
  const [brandFilteredNfts, setBrandFilteredNfts] = useState([])
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [selectedNft, setSelectedNft] = useState(null)
  const [brands, setBrands] = useState([])
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(-1)
  const [shouldShowAll, setShouldShowAll] = useState(true)
  const [trandBrandId, setTrandBrandId] = useState("")
  const [loading, setLoading] = useState(true)


  const flattenNFTs = (data) => {
    const tempProducts = []
    data.forEach(element => {
      const tempObj = element.product
      if (tempObj) {
        const clonedObj = JSON.parse(JSON.stringify(tempObj))
        clonedObj.mintId = element.mintId
        tempProducts.push(clonedObj)
      }
    });
    return tempProducts
  }
  const token = useSelector(function (state) {
    return state.token;
  })
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState([])
  useEffect(() => {
    getBrands((error, res) => {
<<<<<<< HEAD
      if (res && res.data) {
=======
      if(res && res.data){
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
        setBrands(res.data)
      }
    })
  }, [])



  useEffect(() => {

<<<<<<< HEAD
    if (isInitialized && !token && !user) {
=======
    if (!token && !account) {
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
      toast.error("You should login/signup first");
      router.push('/login1')
    }

    if (token) {
      getProfile((error, res) => {
        setProfileInfo(res.data.data.data)
      })
    }
    const fetchData = async () => {
<<<<<<< HEAD
      console.log('account', user.get('accounts')[0], user);
      const userEthNFTs = await Web3Api.account.getNFTs({ chain: "polygon", limit: 99, address: user.get('accounts')[0], token_addresses: ["0xC212DD12cd6680797662019488d98aBb0BC65D6C"] })
      console.log('userEthNFTs', userEthNFTs);
=======
      const userEthNFTs = await Web3Api.account.getNFTs({ chain: "mumbai", address: account })
<<<<<<< HEAD
=======
      console.log("userEthNfts------->", userEthNFTs)
>>>>>>> origin
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
      setNfts([...userEthNFTs.result])
      return userEthNFTs;
    }
<<<<<<< HEAD


    if (user && user.get('accounts')[0]) {
      const result = fetchData()
=======


    if (account) {
<<<<<<< HEAD
      const result = fetchData()
=======
      const result =  fetchData()

>>>>>>> origin
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
    } else {
      getPurchasedProducts((error, res) => {
        if (res && res.data) {
          const result = flattenNFTs(res.data)
          setLoading(false)
          setFilteredNfts(result)
        }

      })
    }
<<<<<<< HEAD
  }, [isAuthenticated, isInitialized])
=======
  }, [])
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464

  useEffect(() => {
    const filtered = nfts.filter((element) => {
      return element && element.token_address.toUpperCase() === CONTRACT_ADDRESS.toUpperCase()
    })
    console.log("filtered--xx-->", filtered)
    const ids = filtered.map((nft) => nft.token_id)
    const amountList = filtered.map((nft) => Number(nft.amount))
    getProductsByCollectionIds(ids.join(","), (error, res) => {
<<<<<<< HEAD
      if (user && user.get('accounts')[0]) {
=======
      if(account){
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
        setLoading(false)
      }
      const tempList = []
      for (let i = 0; i < res?.data.result.length; i++) {
        const tempItem = res.data.result[0]
        tempItem.amount = amountList[i]
        for (let j = 0; j < amountList[i]; j++) {
          tempList.push(tempItem)
        }
      }

<<<<<<< HEAD
      setFilteredNfts(tempList)
    })
=======
<<<<<<< HEAD
      setFilteredNfts(tempList)
    })
=======
      })
      const ids = filtered.map((nft) => nft.token_id)
      console.log('ids', ids);
      getProductsByCollectionIds(ids.join(","), (error, res) => {
        setFilteredNfts(res.data.result)
      })
    }
>>>>>>> origin
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
  }, [nfts])

  useEffect(() => {
    const productsMap = {}
    filteredNfts.map((nft, index) => {
      console.log(productsMap)
      if (nft?.brandId) {
        if (productsMap[nft.brandId] || productsMap[nft.brandId] == 0) {
          productsMap[nft.brandId] = productsMap[nft.brandId] + 1
        } else {
          productsMap[nft.brandId] = 0
        }
      }

    })



    let recordLength = 0
    let selectedBrandId = null
    Object.keys(productsMap).map((brandId) => {
      productsMap[brandId].length > recordLength
      selectedBrandId = brandId
      recordLength = productsMap[brandId].length
    })
    setTrandBrandId(selectedBrandId)
  }, [filteredNfts])


  useEffect(() => {
    const selectedBrand = brands[selectedBrandIndex]
<<<<<<< HEAD
    const tempList = !shouldShowAll ? filteredNfts.filter((nft) => nft && nft.brandId && nft.brandId === selectedBrand._id) : filteredNfts
    tempList.sort((x, y) => {
      return new Date(x.createdAt) < new Date(y.createdAt) ? 1 : -1
    })
=======
    const tempList = filteredNfts.filter((nft) => nft && nft.brandId && nft.brandId === selectedBrand._id)
<<<<<<< HEAD
    tempList.sort((x, y) => {
      return new Date(x.createdAt) < new Date(y.createdAt) ? 1 : -1
    })
=======
>>>>>>> origin
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
    setBrandFilteredNfts(tempList)
  }, [filteredNfts, selectedBrandIndex])


  const confirmTransfer = async () => {
    if (handling) {
      return
    }
    setHandling(true)
    const finalParams = {
      from: user.get('accounts')[0],
      to: toAddress,
      id: selectedNft.collectionId,
      amount: 1,
      data: 0
    }
    let options = {
      contractAddress: CONTRACT_ADDRESS,
      functionName: "safeTransferFrom",
      abi: TotemAbi,
      params: finalParams
    };

    const message = await Moralis.executeFunction(options);
    setHandling(false)
    setShowTransferModal(false)
    NotificationManager.success("Transferred successfully!")
  }
  const calcTotalPrice = (data) => {
    if (data.length === 0) {
      return '0'
    } else {
      let total = data.filter(item => item).reduce(function (accumulator, curValue) {
        return accumulator + curValue.priceUsd
      }, 0)
      return total;
    }
  }
  const calcTotalPriceMatic = (data) => {
    if (data.length === 0) {
      return '0'
    }
    else {
      let total = data.filter(item => item).reduce(function (accumulator, curValue) {
        return accumulator + curValue.priceMatic
      }, 0)
      return total;
    }

  }

  const trandBrand = brands.find((brand) => brand._id === trandBrandId)
  return (
    <div>
      <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm w-full flex flex-col items-center'>
        <div className='max-w-7xl w-full'>

          <Navbar></Navbar>
          <ToastContainer />
          <div style={{ background: '#161A42 ', borderRadius: '16px' }} className='lg:h-16 w-full mt-16 flex items-center lg:flex-row flex-col'>
            <div>
              {profileInfo.profilepicture && <Image className='rounded-full' width={81} height={81} src={profileInfo.profilepicture} alt="" />}
              {!profileInfo.profilepicture && <Image width={81} height={81} src={bg} />}
            </div>
            <div className='m-4'>
              <p style={{ fontFamily: "Poppins" }} className='text-2xl text-white text-muted'>MY DASHBOARD</p>
            </div>
            <div style={{ border: "2px solid #2E357B" }} className='lg:h-10 w-4/5 lg:w-0'>
            </div>
          </div>

          <div className='flex justify-end'>
            <div className='w-full px-5 lg:px-14 mt-10'>
              <div className='flex text-base items-start lg:flex-row flex-col'>
                <div className='text-md'>
                  <p className='text-white text-lg'>My collection value</p>
                  <div style={{ color: "#0EA8D6", fontFamily: "Poppins" }} className='flex items-center'>
                    {loading && <p className='text-md relative p-3'>
                      <div className="ld ld-ring ld-spin text-white"></div>
                    </p>}
                    {!loading && <p className='text-md'>{parseFloat(calcTotalPriceMatic(filteredNfts)).toFixed(8)}</p>}
                    <Icon icon="mdi:ethereum" />
                  </div>
                  <div style={{ color: "#0EA8D6", fontFamily: "Poppins" }} className='flex items-center'>
                    {loading && <p className='text-md relative p-3'>
                      <div className="ld ld-ring ld-spin text-white"></div>
                    </p>}
                    {!loading && <p className='text-md'>{calcTotalPrice(filteredNfts)} $</p>}
                  </div>
                </div>

                <div className='lg:ml-20 mt-5 lg:mt-0'>
                  <p className='text-white text-lg'>Owned NFTs</p>
                  {loading && <p className='text-md relative p-3'>
                    <div className="ld ld-ring ld-spin text-white"></div>
                  </p>}
                  {!loading && <p style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>{filteredNfts.length}</p>}
                </div>

                <div className='lg:ml-32 mt-5 lg:mt-0'>
                  <p className='text-white text-lg'>Favorite brand</p>
                  {loading && <p className='text-md relative p-3'>
                    <div className="ld ld-ring ld-spin text-white"></div>
                  </p>}
                  {
                    !loading && trandBrand &&
                    <Image width={90} height={30} src={trandBrand.logoUrl}></Image>
                  }
                </div>

                <div style={{ color: "#0EA8D6" }} className='lg:ml-48 mt-5 lg:mt-0 flex items-center'>
                  <Image src={discordIcon} />
                  <a target="_blank" href="https://discord.com/" style={{ fontFamily: "Poppins" }} className='w-[160px] ml-3 text-sm' rel="noreferrer">
                    Meet your community on our discord
                  </a>
                </div>

              </div>


              <div>
                <p style={{ fontFamily: "Poppins" }} className='text-2xl mt-10 text-muted'>MY GALLERY</p>
              </div>
              <div className='flex items-center mt-12'>
                {brands == 0 && <div className='w-full'>
                  <Skeleton containerClassName='flex justify-between' className='loading-bar' inline={true} count={4} height={'70px'} width={'150px'} />
                </div>}
              </div>
              <div style={{ fontFamily: "Poppins" }} className='no-scrollbar mt-7 flex lg:flex-row flex-col overflow-x-scroll'>
                <BrandContainer onClick={() => {
                  setShouldShowAll(true)
                  setSelectedBrandIndex(-1)
                }}

                  selected={shouldShowAll}>
                  All
                </BrandContainer>
                {
                  brands.map((brand, index) => {
                    return (
                      <BrandContainer key={index} onClick={() => {
                        if (shouldShowAll) {

                          setShouldShowAll(false)
                        }
                        setSelectedBrandIndex(index)
                      }} selected={selectedBrandIndex === index}>
                        <p>{brand.name}</p>
                      </BrandContainer>
                    )
                  })
                }
              </div>
<<<<<<< HEAD
              <div className='flex flex-col lg:flex-row items-center mt-10 flex-wrap'>
=======
<<<<<<< HEAD
              <div className='flex flex-col lg:flex-row items-center mt-10 flex-wrap'>
                {!loading && brandFilteredNfts.length == 0 && <span className='text-2xl text-white font-bold'>No result</span>}
                {brandFilteredNfts.map(function (data, index) {
                  return (
                    <div key={index} style={{ background: "#161A42", width: "200px", height: "456px" }} className='mx-3 mt-0 mb-5 w-full lg:w-max rounded-lg'>
                      <div style={{ borderRadius: '8px', height: "230px", width: '100%' }} className=' bg-white'>
                        <div style={{ borderRadius: '8px', width: '100%', height: "100%" }} className=' flex justify-center items-center'>
                          <div className='h-60' style={{ position: "relative", width: '100%', height: "100%" }}>
                            {(!data?.image3D || data?.image3D.toLowerCase().includes("undefined")) && data?.imageUrl && <Image width={200} height={230} src={data?.imageUrl}></Image>}
                            {data?.image3D && !data?.image3D.toLowerCase().includes("undefined") && <SingleModelView
                              modelUrl={data.image3D}
                              radius='8px'
                              zoom={0}
                              isFitZoom={true}
                              padding={{
                                paddingTop: 0,
                                paddingLeft: 0,
                                paddingBottom: 0,
                                paddingRight: 0
                              }}
                              isHasControl={false} />}
=======
              <div className='flex flex-col lg:flex-row items-center mt-10'>
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                {!loading && brandFilteredNfts.length == 0 && <span className='text-2xl text-white font-bold'>No result</span>}
                {brandFilteredNfts.map(function (data, index) {
                  return (
                    <div key={index} style={{ background: "#161A42", width: "200px", height: "456px" }} className='mx-3 mt-0 mb-5 w-full lg:w-max rounded-lg'>
                      <div style={{ borderRadius: '8px', height: "230px", width: '100%' }} className=' bg-white'>
                        <div style={{ borderRadius: '8px', width: '100%', height: "100%" }} className=' flex justify-center items-center'>
                          <div className='h-60' style={{ position: "relative", width: '100%', height: "100%" }}>
                            {(!data?.image3D || data?.image3D.toLowerCase().includes("undefined")) && data?.imageUrl && <Image width={200} height={230} src={data?.imageUrl}></Image>}
<<<<<<< HEAD
                            {data?.image3D && !data?.image3D.toLowerCase().includes("undefined") && <SingleModelView
                              modelUrl={data.image3D}
                              radius='8px'
                              zoom={0}
                              isFitZoom={true}
                              padding={{
                                paddingTop: 0,
                                paddingLeft: 0,
                                paddingBottom: 0,
                                paddingRight: 0
                              }}
                              isHasControl={false} />}
=======
                            {data?.image3D && !data?.image3D.toLowerCase().includes("undefined") && <SingleModelView 
                            modelUrl={data.image3D} 
                            radius='8px' 
                            zoom={0}
                            isFitZoom={true}
                            padding={{
                              paddingTop: 0,
                              paddingLeft: 0,
                              paddingBottom: 0,
                              paddingRight: 0
                            }}
                            isHasControl={false}/>}
>>>>>>> origin
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-end'>
                        <div style={{ background: "#161A42", border: "2px solid #2E357B", width: "34px", height: "34px" }} className='relative flex justify-center items-center rounded-full bottom-7'>
                          <Image src={categoryIcon[data?.thematics.toLowerCase()]}></Image>
                        </div>
                      </div>
                      <div className='p-3 relative bottom-7'>
                        <p className='text-lg text-white text-left line-clamp-2 h-14'>{data.name}</p>

                        <div className='relative flex items-center mt-3'>
                          <p className='text-white'>{data?.scaracity}</p>
                          <p className='absolute right-0 text-white'>{data?.series}</p>
                        </div>

                        <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                        </div>
                        <div style={{ fontFamily: "Poppins" }} className='flex items-center relative mt-4'>
                          <p style={{ color: "#0EA8D6" }} className='text-white text-2xl'>{data.priceUsd}$</p>
                          <p style={{ color: "#0EA8D6" }} className='ml-1 text-xs '>{parseFloat(data.priceMatic).toFixed(2)}</p>
                          <Image src={polygon1}></Image>
                          {/* {
                            account ? <p className='absolute right-0 text-[10px]'>{index + 1}/{data?.maxCap}</p> :
                              <p className='absolute right-0 text-[10px]'>{data?.mintId}/{data?.maxCap}</p>
                          } */}
                          <p className='absolute right-0 text-[10px]'>{index + 1}/{data?.maxCap}</p>
                        </div>

                        <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                        </div>
                        <div className='flex'>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                          <Link href={`/3d/${data._id}`}>
                            <div className='w-1/2 flex items-center justify-center py-2 cursor-pointer hover:bg-blue-900'>
                              <p className='text-white  text-sm font-bold'>VIEW</p>
                            </div>
<<<<<<< HEAD
=======
                          </Link>
                          <div style={{ borderLeft: '1px solid #2E357B' }}
                            className='w-1/2 flex items-center justify-center py-2' >
                            <p className='text-gray-400 cursor-no-drop text-sm font-bold'>SELL</p>
                          </div>
=======
                        <Link href={`/3d/${data._id}`}>
                          <div className='w-1/2 flex items-center justify-center py-2 cursor-pointer hover:bg-blue-900'>
                            <p className='text-white  text-sm font-bold'>VIEW</p>
                          </div>
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                          </Link>
                          <div style={{ borderLeft: '1px solid #2E357B' }}
                            className='w-1/2 flex items-center justify-center py-2' >
                            <p className='text-gray-400 cursor-no-drop text-sm font-bold'>SELL</p>
                          </div>
>>>>>>> origin
                          {/* } */}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>

          <div className='flex justify-center items-center'>
            <div onClick={function () {
              router.push("/brands");
            }} style={{ background: "#0EA8D6", borderRadius: '10px' }} className='cursor-pointer hover:opacity-80 mt-10 h-10 flex justify-center items-center'>
              <p style={{ color: "#161A42" }} className="font-bold text-base lg:text-xl w-full px-5">COMPLETE YOUR COLLECTION</p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <Footer className=""></Footer>

        </div>
      </div>
      {
        showTransferModal &&
        <Modal
          isOpen
          onAfterOpen={() => { }}
          onRequestClose={() => { }}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Title>Transfer To</Title>
          <TransferInput onChange={(e) => { setToAddress(e.target.value) }} value={toAddress} />
          <ButtonLine>
            <ConfirmButton onClick={() => { confirmTransfer() }}>Confirm</ConfirmButton>
            <div style={{ width: 30 }}></div>
            <CloseButton onClick={() => { setShowTransferModal(false) }}>Close</CloseButton>
          </ButtonLine>
        </Modal>
      }

    </div>
  )
}

const ButtonLine = styled.div`
  display: flex;
  // width: 300px;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
`
const TransferInput = styled.input`
  outline: none;
  padding: 5px 10px;
  border: 1px solid #aaa;
  width:400px;
`
const CloseButton = styled.div`
  margin: 0 auto;
  width: 100px;
  height:28px;
  // background-color: green;
  margin-top: 20px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

`
const ConfirmButton = styled.div`
  margin: 0 auto;
  width: 100px;
  height:28px;
  // background-color: green;
  margin-top: 20px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

`
const BrandContainer = styled.div`
  border: 1px solid #2C3166;
  cursor:pointer;
  padding:0 10px;
  height:36px;
  border-radius: 18px;
  display:flex;
  align-items: center;
  justify-content:center;
  margin-right: 10px;
  background-color:${({ selected }) => selected ? 'green' : 'transparent'};
`