import axios from 'axios';

// https://shop.totem-universe.io/payments/myPurhcasesByProduct



export const getPurchasedProducts = (cb)=>{
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/myPurhcasesByProduct`,config).then(function(data){
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
  axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product?brandId=${brandId}&onSale=true`,config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}

export const getProductsByCategoryId = async (categoryId,cb) => {
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product?categoryId=${categoryId}&onSale=true`,config).then(function(data){
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
  axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product?collectionIds=${ids}`,config).then(function(data){
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
  axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product?page=${page}&limit=5`,config).then(function(data){
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
  axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`,config).then(function(data){
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
  axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product`,config).then(function(data){
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
  axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/product/${id}`,config).then(function(data){
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
  axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/product`, data, config).then(function(data){
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
  axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/product/${data._id}`, data, config).then(function(data){
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
  axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/upload`, formData, config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}


