import axios from 'axios';

export const getProfile = (cb)=>{
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/myProfile`,config).then(function(data){
    cb(null, data)
  }).catch(function(error){
    cb(error, null)
  })
}



