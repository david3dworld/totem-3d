import axios from 'axios';
import { BASE_URL_ORIGIN } from '../constants/api'

export const getBrand = async (brandId, cb) => {
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const data = await axios.get(`${BASE_URL_ORIGIN}/brand/${brandId}`, config)
    cb(null, data)
  } catch(e) {
    cb(e, null)
  }
} 

export const getBrands = async (cb) => {
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const data = await axios.get(`${BASE_URL_ORIGIN}/brand`, config)
    cb(null, data)
  } catch(e) {
    cb(e, null)
  }
} 