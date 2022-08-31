import axios from 'axios';


export const getCategory = async (categoryId, cb) => {
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/${categoryId}`, config)
    cb(null, data)
  } catch(e) {
    cb(e, null)
  }
} 

export const getCategories = async (cb) => {
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`, config)
    cb(null, data)
  } catch(e) {
    cb(e, null)
  }
} 