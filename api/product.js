import axios from 'axios';
import { BASE_URL, BASE_URL_ORIGIN } from '../constants/api'

// https://shop.totem-universe.io/payments/myPurhcasesByProduct



export const getPurchasedProducts = (cb)=>{
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  axios.get(`${BASE_URL_ORIGIN}/payments/myPurhcasesByProduct`,config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}

export const getProductsByBrandId = async (brandId,cb) => {
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  axios.get(`${BASE_URL_ORIGIN}/product?brandId=${brandId}&onSale=true`,config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}

export const getProductsByCollectionIds = async (ids,cb) => {
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  console.log("actions in ids----on gpb->", ids)
  axios.get(`${BASE_URL_ORIGIN}/product?collectionIds=${ids}`,config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}


export const getProducts = async (page,cb) => {
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  axios.get(`${BASE_URL_ORIGIN}/product?page=${page}&limit=5`,config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}

export const getProduct = async (id, cb) => {
  console.log("id in getproduct--->", id)
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  axios.get(`${BASE_URL_ORIGIN}/product/${id}`,config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}

export const getAllProducts = async (cb) => {
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  axios.get(`${BASE_URL_ORIGIN}/product`,config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}

export const deleteProduct = async (id, cb) => {
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  axios.delete(`${BASE_URL}/product/${id}`,config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}

export const createProduct = async (data, cb) => {
  console.log('data in create api--->', data)
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  axios.post(`${BASE_URL}/product`, data, config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}

export const updateProduct = async (data, cb) => {
  console.log('data in update api--->', data)
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  axios.patch(`${BASE_URL}/product/${data._id}`, data, config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}

export const uploadImage = async (file, cb) => {

  let formData = new FormData();
  formData.append("file", file);

  console.log('data in update api--->', file)
  const token = localStorage.getItem("access_token")
  const config = {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${token}` }
  };
  axios.post(`https://shop.totem-universe.io/file/upload`, formData, config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}


