import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from "../navbar/index"
import Footer from '../footer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductItem from '../../components/ProductItem'

export default function Home() {
  const router = useRouter();
  const [lastDrop2, setLastDrop2] = useState([])
  const [brands, setBrands] = useState([])
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [loadingBrand, setLoadingBrand] = useState(true)
  useEffect(() => {

    if (!router.isReady) return;
    setLoadingProduct(true)
    setLoadingBrand(true)
    setLastDrop2([])
    setBrands([])
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product?q=${router.query.param}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      console.log(data.data);
      setLoadingProduct(false)
      setLastDrop2(data.data.result)
    }).catch(function (error) {
      console.log(error.request);
    })
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brand?q=${router.query.param}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      setLoadingBrand(false)
      setBrands(data.data)
    }).catch(function (error) {
      console.log(error.request);
    })
  }, [router.isReady, router])
  const checkURLisValid = (url) => {
    return url && url.includes('http') && url;
  }
  return (
    <div style={{ fontFamily: "Poppins", backgroundColor: "#0D0F23", color: "#919CC1" }} className='text-sm flex flex-col items-center'>
      <div className='max-w-7xl'>

        <Navbar></Navbar>

        <div className='mt-10 text-white'>
          <p style={{ fontFamily: "Chakra Petch" }} className='text-3xl '>Product results for {router.query.param}</p>
        </div>
        {!loadingProduct && lastDrop2.length == 0 && <h1 className='text-center text-2xl py-10'>No result found</h1>}
        <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center lg:flex-row flex-col'>
          {loadingProduct &&
            <div className='w-full'>
              <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'} width={'150px'} />
            </div>
          }
        </div>
        <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center lg:flex-row flex-col lg:grid grid-cols-5 gap-5'>
          {lastDrop2?.map(function (data, index) {
            return (
              <ProductItem
                id={data._id}
                key={index}
                imageUrl={data.imageUrl}
                thematics={data.thematics}
                name={data.name}
                productNo={data.productNo}
                maxCap={data.maxCap}
                mintedCount={data.mintedCount}
                scarcity={data.scaracity}
                priceUsd={data.priceUsd}
                priceMatic={data.priceMatic}
                series={data.series}
              />
            )
          })}
        </div>
        <div className='mt-20 text-white'>
          <p style={{ fontFamily: "Chakra Petch" }} className='text-3xl '>Brand results for {router.query.param}</p>
        </div>
        {!loadingBrand && brands.length == 0 && <h1 className='text-center text-2xl py-10'>No result found</h1>}
        <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center lg:flex-row flex-col'>
          {loadingBrand &&
            <div className='w-full'>
              <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'} width={'150px'} />
            </div>
          }
        </div>
        <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center lg:flex-row flex-col lg:grid grid-cols-5 gap-5'>

          {brands?.map(function (data, index) {
            return (
              <Link href={`/collection/${data._id}`} key={index}>
                <a>
                  <div key={index} onClick={function () { router.push(`/collection/${data._id}`); }} className='bg-jeep w-[200px] pb-8 rounded-xl overflow-hidden mt-5 px-2 flex items-start flex-col cursor-pointer'>
                    <div className='w-full h-full'>
                      {checkURLisValid(data.logoUrl) && <div className='h-16 flex justify-center'>
                        <Image
                          alt={data.name}
                          src={data.logoUrl}
                          width="95%"
                          height="95%"
                          objectFit="contain" />
                      </div>}
                    </div>
                    <div className='w-full'>
                      {checkURLisValid(data.imageUrl) && <div className='w-full h-48'>
                        <img src={data.imageUrl} className="w-full" />
                      </div>}
                    </div>
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
        <Footer></Footer>
      </div>
    </div>
  )
}
