import React, { useEffect, useState } from 'react'
import Navbar from "./navbar/index"
import { useMoralis } from 'react-moralis'
import bg from "../images/Bg.png"
import Image from 'next/image'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Footer from './footer';
import axios from 'axios';
import { saveProfile, editt } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Router, useRouter } from 'next/router';
import { uploadImage } from '../api/product'
import {NotificationManager} from 'react-notifications'

export default function MyProfile() {
    const { isAuthenticated, provider, isWeb3Enabled,account } = useMoralis()
    const [img, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [twitter, setTwitter] = useState("");
    const [insta, setInsta] = useState("");
    
    const profile = useSelector(function (state) {
        return state.profile;
    })
    console.log(profile)

    const edit = useSelector(function (state) {
        return state.edit;
    })

    const dispatch = useDispatch();
    const token = useSelector(function (state) {
        return state.token;
    })
    const userId = useSelector(function (state) {
        return state.id;
    })
    
    const [profileInfo, setProfileInfo] = useState([])
    const router = useRouter();
    useEffect(() => {
        if(!token && !account){
            router.push('/login1')
        }
        axios.get(`https://shop.totem-universe.io/users/myProfile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(function (data) {
                if (data.data) {
                    console.log(data.data.data.data);
                    setProfileInfo(data.data.data.data)
                    setFirstName(data.data.data.data.name)
                    setName(data.data.data.data.surname)
                    setUsername(data.data.data.data.username)
                    setBio(data.data.data.data.bio)
                    setTwitter(data.data.data.data.twitter)
                    setInsta(data.data.data.data.instagram)
                }
            })
            // axios.get(`https://shop.totem-universe.io/users/${userId}`, {
            //     headers: {
            //         'Authorization': `Bearer ${token}`
            //     }
            // })
            //     .then(function (data) {
            //         if (data.data) {
            //             console.log(data.data.data.data);
            //             setProfileInfo(data.data.data.data)
            //             setFirstName(data.data.data.data.name)
            //             setName(data.data.data.data.surname)
            //             setUsername(data.data.data.data.username)
            //             setBio(data.data.data.data.bio)
            //             setTwitter(data.data.data.data.twitter)
            //             setInsta(data.data.data.data.instagram)
            //         }
            // })
    }, [])
    
    let finalImage = bg 
    if(imagePreview){
        finalImage = imagePreview
    }else{
        finalImage = profileInfo?.profilepicture
    }
    return (
        <div className='text-sm flex flex-col w-full items-center' style={{ fontFamily: "Chakra Petch", backgroundColor: "#0D0F23", color: "#919CC1" }}>
            <div className='max-w-7xl w-full'>
                <Navbar></Navbar>

                <div style={{ background: '#161A42 ', borderRadius: '16px' }} className='w-full mt-8 flex items-center lg:flex-row flex-col'>
                    <div className='m-4'>
                        {account ? <p className='text-2xl text-white'>NO PROFILE</p>: <p className='text-2xl text-white'>MY PROFILE</p> }
                    </div>
                </div>
                {
                    !account &&
                
                <div className='flex w-full justify-center items-center mt-10'>
                    <div className='flex lg:flex-row flex-col lg:w-2/3 w-full items-center lg:items-start'>
                        <div className='m-10 flex lg:justify-start items-center justify-center items-center flex-col relative'>
                            <img className=' rounded-full' width={110} height={110} src={finalImage} alt=""/>
                            <input onChange={function (e) {
                                const files = e.target.files[0];
                                setImage(files);
                                setImagePreview(URL.createObjectURL(files));
                                console.log(img);
                            }} className='bg-none absolute mt-28 w-14 opacity-0 cursor-pointer' type="file"></input>
                            <p className='text-white mt-2 cursor-pointer hover:text-gray-300' style={{ font: 'normal normal medium 17px/17px Chakra Petch ' }}>Set Avatar</p>
                        </div>
                        <div style={{ width: "340px" }} className='lg:p-3 max-w-full' >
                            {/* {!edit && */}
                                <div>
                                    <p className='text-white'>First name</p>
                                    <input onChange={function (e) {
                                        setFirstName(e.target.value);
                                    }} 
                                    value={firstName} placeholder='MICHAEL' style={{ fontFamily: "Poppins", border: '1px solid #2C3166', background: "#0D0F23", borderRadius: "100px" }} className="mt-1 w-full p-1"></input>
                                    <p className='text-white'>Name</p>
                                    <input onChange={function (e) {
                                        setName(e.target.value);
                                    }} 
                                    value={name} placeholder='MICHAEL' style={{ fontFamily: "Poppins", border: '1px solid #2C3166', background: "#0D0F23", borderRadius: "100px" }} className="mt-1 w-full p-1"></input>
                                    <p className='text-white'>Username</p>
                                    <input onChange={function (e) {
                                        setUsername(e.target.value);
                                    }} 
                                    value={username} placeholder='TOTEM ADDICT' style={{ fontFamily: "Poppins", border: '1px solid #2C3166', background: "#0D0F23", borderRadius: "100px" }} className="mt-1 w-full p-1"></input>
                                    <p className='text-white'>Bio</p>
                                    <div style={{ fontFamily: "Poppins" }}>
                                        <textarea onChange={function (e) {
                                            setBio(e.target.value);
                                        }} 
                                        value={bio} rows={10} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" style={{ border: '1px solid #2C3166', background: "#0D0F23", borderRadius: "10px", padding: "5px" }} className="mt-1 w-full H-60"></textarea>
                                    </div>
                                    <div style={{ border: '1px solid #2E357B' }} className="w-full mt-8 mb-8">
                                    </div>
                                    <p className='text-white text-xl'>Social Accounts</p>
                                    <p className='text-white mt-5 text-md' placeholder='@username'>Twitter @username</p>
                                    <div style={{ borderRadius: '100px', border: '1px solid #2C3166', height: "32px" }} className='flex items-center '>
                                        <TwitterIcon className='ml-2'></TwitterIcon>
                                        <input onChange={function (e) {
                                            setTwitter(e.target.value);
                                        }} 
                                        value={twitter} style={{ background: "#0D0F23", fontFamily: "Poppins" }} className="ml-2" placeholder='@username'></input>
                                    </div>
                                    <p className='text-white mt-5 text-md' placeholder='@username'>Instagram @username</p>
                                    <div style={{ borderRadius: '100px', border: '1px solid #2C3166', height: "32px" }} className='flex items-center '>
                                        <InstagramIcon className='ml-2'></InstagramIcon>
                                        <input onChange={function (e) {
                                            setInsta(e.target.value);
                                        }} 
                                        value={insta} style={{ background: "#0D0F23", fontFamily: "Poppins" }} className="ml-2" placeholder='@username'></input>
                                    </div>
                                </div>
                            {/* } */}

                            {/* {edit &&
                                <div>
                                    <p className='text-white'>First name</p>
                                    <p className=' text-lg' >{profile.firstName}</p>
                                    <p className='text-white'>Name</p>
                                    <p className=' text-lg'>{profile.name}</p>
                                    <p className='text-white'>Username</p>
                                    <p className=' text-lg'>{profile.username}</p>
                                    <p className='text-white'>Bio</p>
                                    <div>
                                        <p className=' text-lg'>{profile.bio}</p>
                                    </div>
                                    <div style={{ border: '1px solid #2E357B' }} className="w-full mt-8 mb-8">
                                    </div>
                                    <p className='text-white text-xl'>Social Accounts</p>
                                    <p className='text-white mt-5 text-md' placeholder='@username'>Twitter @username</p>
                                    <p className=' text-lg'>{profile.twitter}</p>
                                    <p className='text-white mt-5 text-md' placeholder='@username'>Instagram @username</p>
                                    <p className=' text-lg'>{profile.instagram}</p>
                                </div>
                            } */}

                            <div className='flex items-center justify-center mt-10'>
                                 <div onClick={function () {
                                    const data = new FormData();
                                    console.log(token);

                                    data.append("surname", 'firstName');
                                    data.append("name", 'name');
                                    //data.append("bio",bio);
                                    //data.append("username",username);
                                    //data.append("twitter",twitter);
                                    //data.append("instagram",insta);
                                    data.append("profilepicture", 'img');
                                    dispatch(saveProfile({
                                        firstName: firstName,
                                        name: name,
                                        bio: bio,
                                        username: username,
                                        twitter: twitter,
                                        instagram: insta,
                                        id: userId
                                    }));
                                    const config = {
                                        headers: { Authorization: `Bearer ${token}` }
                                    };
                                    const bodyParameters = {
                                        key: "value"
                                    };
                                    if(imagePreview){
                                        uploadImage(img,(error, res)=>{
                                            axios.post("https://shop.totem-universe.io/users/myProfile/update", {
                                                // "_id": userId,
                                                surname: firstName,
                                                name: name,
                                                bio: bio,
                                                username: username,
                                                twitter: twitter,
                                                instagram: insta,
                                                profilepicture: "https://shop.totem-universe.io/file/" + res.data.filename
                                            
                                            }, config).then(function (data) {
                                                NotificationManager.success("Profile is updated successfully!")
                                                console.log(data);
                                            }).catch(function (error) {
                                                console.log(error);
                                            })        
                                        })
                                    }else{
                                        axios.post("https://shop.totem-universe.io/users/myProfile/update", {
                                                surname: firstName,
                                                name: name,
                                                bio: bio,
                                                username: username,
                                                twitter: twitter,
                                                instagram: insta,
                                                // profilepicture: "https://shop.totem-universe.io/file/" + res.data.filename
                                            }, config).then(function (data) {
                                                NotificationManager.success("Profile is updated successfully!")
                                                console.log(data);
                                            }).catch(function (error) {
                                                console.log(error);
                                            })
                                    }
                                    
                                }} className='hover:opacity-80 cursor-pointer text-center flex items-center justify-center' style={{ background: "#0EA8D6", color: "#161A42", borderRadius: "12px", width: "115px", height: "29px", font: "normal normal bold 14px/17px Chakra Petch" }}>
                                    <p>SAVE PROFILE</p>
                                </div>
                                {/* } */}

                                {/* {edit && <div onClick={function () {
                                    const data = new FormData();

                                    data.append("surname", 'firstName');
                                    data.append("name", 'name');
                                    //data.append("bio",bio);
                                    //data.append("username",username);
                                    //data.append("twitter",twitter);
                                    //data.append("instagram",insta);
                                    data.append("profilepicture", 'img');

                                    // setFirstName("");
                                    // setName("");
                                    // setUsername("");
                                    // setBio("");
                                    // setTwitter("");
                                    // setInsta("");
                                    dispatch(editt());
                                }} className='hover:opacity-80 cursor-pointer text-center flex items-center justify-center' style={{ background: "#0EA8D6", color: "#161A42", borderRadius: "12px", width: "115px", height: "29px", font: "normal normal bold 14px/17px Chakra Petch" }}>
                                    <p>Edit</p>
                                </div>} */}

                            </div>
                        </div>
                    </div>
                </div>
                }
                <div className="mt-32">
                </div>
                <Footer ></Footer>
            </div>
        </div>
    )
}
